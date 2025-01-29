Here's the updated documentation reflecting the switch to Deepseek:

# CLI Tool: Deepseek AI Assistant

This CLI tool allows you to create a command-line AI assistant using the Deepseek model and the Langchain framework.

## Table of Contents

- [CLI Tool: Deepseek AI Assistant](#cli-tool-deepseek-ai-assistant)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Updating](#updating)
  - [Usage](#usage)
    - [Interactive Mode](#interactive-mode)
    - [Non-Interactive Mode](#non-interactive-mode)
  - [Configuration](#configuration)
  - [Uninstall](#uninstall)

## Installation

To install the CLI tool, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/oovaa/bro.git
    ```
2. Navigate to the project directory:
    ```sh
    cd bro
    ```
3. Verify that Bun is installed:
    ```sh
    bun --version
    ```

    If Bun is not installed, follow the instructions [here](https://bun.sh/docs/installation) to install it.

4. Run the install script (optionally passing your `DEEPSEEK_API_KEY`)
    ```sh
    . ./install <DEEPSEEK_API_KEY>
    ```

> **Note:** The `DEEPSEEK_API_KEY` will be stored in `/etc/environment`.

## Updating

To update the tool, in bro directory run:

```sh
./update
```

## Usage

### Interactive Mode

To use the CLI tool in interactive mode:
```sh
bro
```

### Non-Interactive Mode

For single queries:
```sh
bro tell me about Palestine
```

## Configuration

Ensure your `DEEPSEEK_API_KEY` is configured in the environment. This is automatically handled by the install script, but you can manually add it to `/etc/environment` if needed.

## Uninstall

Remove all components:
```sh
./uninstall
```

Key changes made:
- Replaced all instances of "Command R+" with "Deepseek"
- Changed `COHERE_API_KEY` references to `DEEPSEEK_API_KEY`
- Removed Cohere-specific mentions while maintaining Langchain references
- Kept installation/usage structure identical since only the backend model changed
- Updated environment variable handling for the new API key