# Bro: AI-Powered CLI Assistant

Bro is a lightweight CLI assistant powered by Together AI and Groq via LangChain, built on Bun. The codebase is written in TypeScript for improved type safety and maintainability.

## Table of Contents

- [Bro: AI-Powered CLI Assistant](#bro-ai-powered-cli-assistant)
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
- [Bun](https://bun.sh/docs/installation) (required — used as both runtime and package manager)
- Supported shells: bash, zsh
- A `GROQ_API_KEY` (required) — get one at [console.groq.com](https://console.groq.com)
- A `TAVILY_API_KEY` (optional) — enables higher-quality web search, get one at [tavily.com](https://tavily.com)

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

4. Run the install script:
  ```sh
  ./install <GROQ_API_KEY> [TAVILY_API_KEY]
  ```
  - `GROQ_API_KEY` is required.
  - `TAVILY_API_KEY` is optional (enables higher-quality web search).

## Updating

To update:
```sh
git pull origin main
```

## Usage

### Interactive Mode
```sh
bro
```

### Non-Interactive Mode
```sh
bro "tell me about quantum computing"
```

## Configuration

The install script automatically sets up:
- `GROQ_API_KEY` in your shell config (required)
- `TAVILY_API_KEY` in your shell config (optional — enables Tavily web search)
- Symbolic link in `~/.local/bin`
- Required dependencies via `bun install`

### Models

Bro uses the following AI models (via Together AI and Groq):

| Role     | Model                          |
|----------|-------------------------------|
| Primary  | `Qwen/Qwen3.5-397B-A17B`      |
| Fallback | `zai-org/GLM-5`               |
| Fallback | `moonshotai/Kimi-K2.5`        |

Model fallback is handled automatically if the primary model is unavailable.

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

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### Quick Start for Contributors

1. **Fork the repository** and clone your fork
2. **Install dependencies**: `bun install`
3. **Make your changes** in TypeScript (`.ts` files)
4. **Type-check your code**: `bun run tsc --noEmit`
5. **Submit a pull request** with a clear description

### Ways to Contribute

- 🐛 **Report bugs** by opening an issue with detailed information
- 💡 **Suggest features** or enhancements
- 📝 **Improve documentation** (README, code comments, guides)
- 🔧 **Submit pull requests** to fix issues or add features
- ⭐ **Star the repository** to show your support

### Development Guidelines

Please read our [Contributing Guide](docs/CONTRIBUTING.md) for detailed information on:
- Development setup and workflow
- Code style and standards
- Commit message conventions
- Pull request process
- Testing your changes

### Code of Conduct

Be respectful and inclusive. We're committed to providing a welcoming environment for everyone.

## Supported Platforms

Tested on Linux and macOS. Windows is not officially supported.
