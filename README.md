# CLI Tool: Groq & DeepSeek AI Assistant

This CLI tool provides an AI assistant powered by Groq's API and DeepSeek models through the Langchain framework.

![alt](./logo.png)

## Table of Contents

- [CLI Tool: Groq \& DeepSeek AI Assistant](#cli-tool-groq--deepseek-ai-assistant)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Updating](#updating)
  - [Usage](#usage)
    - [Interactive Mode](#interactive-mode)
    - [Non-Interactive Mode](#non-interactive-mode)
  - [Configuration](#configuration)
  - [Uninstall](#uninstall)

## Installation

To install the CLI tool:

1. Clone the repository:
    ```sh
    git clone https://github.com/oovaa/bro.git
    ```
2. Navigate to the project directory:
    ```sh
    cd bro
    ```
3. Verify Bun is installed:
    ```sh
    bun --version
    ```
    Install Bun from [bun.sh](https://bun.sh/docs/installation) if needed.

4. Run the install script with your Groq API key:
    ```sh
    ./install <GROQ_API_KEY>
    ```

## Updating

To update:
```sh
./update
```

## Usage

### Interactive Mode
```sh
bro
```

### Non-Interactive Mode
```sh
bro "tell me about quantum computing"  # Regular response
bro -s "explain AI safety"             # Stream response without thinking output
```

## Configuration

The install script automatically sets up:
- `GROQ_API_KEY` in your shell config
- Symbolic link in `~/.local/bin`
- Required dependencies

## Uninstall
```sh
./uninstall
```

Removes:
- Symbolic link
- Environment variables
- Local dependencies
