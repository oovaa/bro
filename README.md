# CLI Tool: Command R+ AI Assistant

This CLI tool allows you to create a command-line AI assistant using the Command R+ model from Cohere and the Langchain framework.

![alt](./logo.png)

## Table of Contents

- [CLI Tool: Command R+ AI Assistant](#cli-tool-command-r-ai-assistant)
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

4. Run the install script (optionally passing your `COHERE_API_KEY`)
    ```sh
    . ./install <COHERE_API_KEY>
    ```

> **Note:** The `COHERE_API_KEY` will be stored in `/etc/environment`.

## Updating

To update the tool, in bro directory run:

```sh
./update
```

## Usage

### Interactive Mode

To use the CLI tool in interactive mode, follow these steps:

1. Open a terminal and navigate to the project directory.
2. Run the CLI tool:
    ```sh
    bro
    ```
3. Follow the on-screen instructions to interact with the AI assistant.

### Non-Interactive Mode

To use the CLI tool in non-interactive mode, follow these steps:

1. Open a terminal and navigate to the project directory.
2. Run the CLI tool with your question:
    ```sh
    bro tell me about Palestine
    ```


## Configuration


Before using the CLI tool, make sure to configure the necessary settings by uploading the `COHERE_API_KEY` to your environment. You can do this manually or pass it to the install script as mentioned in the Installation section.

## Uninstall

To uninstall, just run `./uninstall` and it will take care of everything. It will unset the environment variable and remove it from `/etc/environment`, remove the `node_modules` folder, and remove the `bro` command from your path.