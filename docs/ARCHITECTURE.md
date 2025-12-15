# Bro Project Architecture

Bro is a CLI assistant powered by Groq via LangChain, built with Bun. This document describes the main components and their interactions.

## Overview

- **Language:** JavaScript (ESNext), Bun runtime
- **AI Models:** Groq API via LangChain
- **CLI Interface:** Interactive and non-interactive modes
- **Configuration:** Shell environment variables, symbolic link in `~/.local/bin`

## Main Components

### 1. CLI Entrypoint (`bro`)
- Handles user input and command-line arguments
- Supports interactive chat and non-interactive queries
- Manages session history and exit signals

### 2. Streaming & Output (`io.js`)
- Manages readline interface for CLI
- Handles terminal input/output

### 3. Agent + Model (`agent.js`, `llm.js`)
- `llm.js` configures the Groq chat model
- `agent.js` wires the model to tools and handles streaming output

### 4. Non-Interactive Mode (`nonInteractive.js`)
- Parses CLI arguments for direct questions
- Handles errors and usage instructions

### 5. Web Search Tool (`tools.js`)
- Provides a web search tool used by the agent
- Uses Tavily when `TAVILY_API_KEY` is set; otherwise falls back to DuckDuckGo

### 6. Install/Uninstall Scripts
- `install`: Installs dependencies, creates a `bro` symlink in `~/.local/bin`, and sets shell env vars
- `uninstall`: Removes the symlink and removes related shell env vars

### 6. Update Script
- Pulls latest changes from the repository
- Updates dependencies with Bun

## Data Flow

1. User runs `bro` (interactive) or `bro "question" [-s]` (non-interactive)
2. CLI parses input and invokes the appropriate handler
3. Input is sent to the agent (LangChain + Groq)
4. The response is streamed to the terminal
5. Session history is updated for context

## Extensibility

- Swap models by adjusting configuration in `llm.js`
- Extend CLI flags and options in `bro`
- Customize prompts and output formatting

## Directory Structure

- `bro` - Main CLI entrypoint
- `io.js` - CLI I/O and output processing
- `llm.js` - LLM configuration
- `agent.js` - Agent wiring, tools, and streaming
- `nonInteractive.js` - Non-interactive CLI handler
- `install`, `uninstall`, `update` - Shell scripts for setup and maintenance
- `docs/` - Documentation

---

For questions or suggestions, open an issue or pull request!
