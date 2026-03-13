# Bro Project Architecture

Bro is a CLI assistant powered by Together AI and Groq via LangChain, built with Bun. The codebase is written in TypeScript. This document describes the main components and their interactions.

## Overview

- **Language:** TypeScript (ESNext), Bun runtime
- **AI Models:** Together AI (primary) and Groq (fallback) via LangChain
- **CLI Interface:** Interactive and non-interactive modes
- **Configuration:** Shell environment variables, symbolic link in `~/.local/bin`

## Main Components

### 1. CLI Entrypoint (`bro`)
- Handles user input and command-line arguments
- Supports interactive chat and non-interactive queries
- Manages session history and exit signals

### 2. Streaming & Output (`io.ts`)
- Manages readline interface for CLI
- Handles terminal input/output

### 3. Agent + Model (`agent.ts`, `llm.ts`)
- `agent.ts` configures the LangChain agent with Together AI models, model fallback middleware, tools, and memory checkpointing
- `llm.ts` provides a secondary ChatGroq model configuration
- Primary model: `Qwen/Qwen3.5-397B-A17B` (Together AI) with automatic fallback to `GLM-5` and `Kimi-K2.5`

### 4. Non-Interactive Mode (`nonInteractive.ts`)
- Parses CLI arguments for direct questions
- Handles errors and usage instructions

### 5. Web Search Tool (`tools.ts`)
- Provides a web search tool used by the agent
- Returns an explicit `StructuredTool` type to avoid TypeScript deep inference issues
- Uses Tavily when `TAVILY_API_KEY` is set; otherwise falls back to DuckDuckGo

### 6. UI (`ui.ts`)
- Exports a strongly-typed `UI` interface
- Provides chalk-based color schemes for CLI output (responses, tool calls, errors, warnings, metadata)

### 7. Install/Uninstall Scripts
- `install`: Installs dependencies, creates a `bro` symlink in `~/.local/bin`, and sets shell env vars
- `uninstall`: Removes the symlink and removes related shell env vars

### 8. Update Script
- Pulls latest changes from the repository
- Updates dependencies with Bun

## Data Flow

1. User runs `bro` (interactive) or `bro "question"` (non-interactive)
2. CLI parses input and invokes the appropriate handler
3. Input is sent to the agent (LangChain + Together AI / Groq)
4. The response is streamed to the terminal via colored CLI output
5. Session history is updated for context (via LangGraph MemorySaver)

## Extensibility

- Swap or add models by adjusting configuration in `agent.ts` or `llm.ts`
- Extend CLI flags and options in `bro`
- Customize prompts and output formatting in `agent.ts`
- Adjust color schemes and output styles in `ui.ts`

## Directory Structure

- `bro` — Main CLI entrypoint (shell script calling Bun)
- `io.ts` — CLI I/O and readline interface
- `llm.ts` — Secondary LLM configuration (ChatGroq)
- `agent.ts` — Agent wiring, tools, model fallback, and streaming
- `nonInteractive.ts` — Non-interactive CLI handler
- `tools.ts` — Web search tool (Tavily / DuckDuckGo)
- `ui.ts` — Typed color/style definitions for CLI output
- `tsconfig.json` — TypeScript compiler configuration
- `install`, `uninstall`, `update` — Shell scripts for setup and maintenance
- `docs/` — Documentation

---

For questions or suggestions, open an issue or pull request!
