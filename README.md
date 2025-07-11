# Bro: Groq & DeepSeek AI Assistant

This CLI tool provides an AI assistant powered by Groq's API and DeepSeek models through the Langchain framework.

![alt](./logo.png)

## Table of Contents

- [Bro: Groq \& DeepSeek AI Assistant](#bro-groq--deepseek-ai-assistant)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Updating](#updating)
  - [Usage](#usage)
    - [Interactive Mode](#interactive-mode)
    - [Non-Interactive Mode](#non-interactive-mode)
  - [Configuration](#configuration)
  - [Troubleshooting](#troubleshooting)
  - [Uninstall](#uninstall)
  - [Contributing](#contributing)
  - [Supported Platforms](#supported-platforms)

## Prerequisites

- Linux or macOS (Windows not officially supported)
- [Bun](https://bun.sh/docs/installation) (required)
- Node.js (recommended for compatibility)
- Supported shells: bash, zsh

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
bro -s "explain AI safety"             # Stream response (no thinking output)
```
- The `-s` flag skips the "thinking" phase and streams only the final answer.

## Configuration

The install script automatically sets up:
- `GROQ_API_KEY` in your shell config
- Symbolic link in `~/.local/bin`
- Required dependencies

## Troubleshooting

- If you see errors about Bun or missing dependencies, ensure Bun is installed and in your PATH.
- If `bro` is not found, make sure `~/.local/bin` is in your PATH and the symbolic link exists.
- For shell issues, only bash and zsh are supported.
- If you need to reset your API key, edit your shell config file and restart your terminal.

## Uninstall
```sh
./uninstall
```

Removes:
- Symbolic link
- Environment variables
- Local dependencies

## Contributing

Pull requests and issues are welcome! Please open an issue for bugs or feature requests.

## Supported Platforms

Tested on Linux and macOS. Windows is not officially supported.
