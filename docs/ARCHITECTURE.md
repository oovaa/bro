# Bro Project Architecture

Bro is a CLI AI assistant powered by Groq's API and DeepSeek models, built with Bun and Langchain. This document describes the main components and their interactions.

## Overview

- **Language:** JavaScript (ESNext), Bun runtime
- **AI Models:** Groq API, DeepSeek via Langchain
- **CLI Interface:** Interactive and non-interactive modes
- **Configuration:** Shell environment variables, symbolic link in `~/.local/bin`

## Main Components

### 1. CLI Entrypoint (`bro`)
- Handles user input and command-line arguments
- Supports interactive chat and non-interactive queries
- Manages session history and exit signals

### 2. Streaming & Output (`io.js`)
- Manages readline interface for CLI
- Processes and colors streaming AI responses
- Cleans Markdown formatting for terminal display

### 3. AI Chain (`chains.js`)
- Defines prompt template and instructions for the assistant
- Configures Groq/DeepSeek model via Langchain
- Handles streaming responses

### 4. Non-Interactive Mode (`nonInteractive.js`)
- Parses CLI arguments for direct questions
- Supports streaming-only output with `-s` flag
- Handles errors and usage instructions

### 5. Install/Uninstall Scripts
- `install`: Sets up dependencies, symbolic link, and API key in shell config
- `uninstall`: Removes symbolic link, environment variables, and dependencies

### 6. Update Script
- Pulls latest changes from the repository
- Updates dependencies with Bun

## Data Flow

1. User runs `bro` (interactive) or `bro "question" [-s]` (non-interactive)
2. CLI parses input and invokes the appropriate handler
3. Input is sent to the AI chain (Langchain + Groq/DeepSeek)
4. Streaming response is processed and displayed in the terminal
5. Session history is updated for context

## Extensibility

- Add new models or chains in `chains.js`
- Extend CLI flags and options in `bro`
- Customize prompts and output formatting

## Directory Structure

- `bro/` - Main CLI script
- `io.js` - CLI I/O and output processing
- `chains.js` - AI chain and prompt logic
- `nonInteractive.js` - Non-interactive CLI handler
- `install`, `uninstall`, `update` - Shell scripts for setup and maintenance
- `docs/` - Documentation

---

For questions or suggestions, open an issue or pull request!
