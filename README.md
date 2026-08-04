# Bro: AI-Powered CLI Assistant

[![TypeScript](https://img.shields.io/badge/typescript-5+-blue.svg)](https://typescriptlang.org/)
[![Bun](https://img.shields.io/badge/runtime-bun-orange.svg)](https://bun.sh/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **Bro** — Lightweight CLI assistant powered by **Groq** (primary) via LangChain, built on Bun. The codebase is written in TypeScript for improved type safety and maintainability.

---

## 🎯 Overview

**Bro** is a terminal-based AI assistant that runs locally using **Groq** for fast inference. It features web search capabilities, streaming responses, and a clean CLI interface.

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Runtime** | Bun 1.0+ |
| **Language** | TypeScript 5+ |
| **AI Framework** | LangChain |
| **LLM Provider** | Groq (primary) |
| **Web Search** | Tavily (preferred) / DuckDuckGo (fallback) |
| **UI** | ora (spinners), chalk/colors |
| **Validation** | Zod |

---

## 📁 Project Structure

```
bro/
├── agent.ts          # LangChain agent with tools & streaming
├── llm.ts            # Groq ChatGroq configuration
├── tools.ts          # Web search tools (Tavily + DuckDuckGo)
├── ui.ts             # CLI output formatting
├── nonInteractive.ts # Non-interactive mode handler
├── install           # Install script (sets up API keys, symlink)
├── uninstall         # Uninstall script
├── update            # Update script
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔧 Prerequisites

- Linux or macOS (Windows not officially supported)
- [Bun](https://bun.sh/docs/installation) (required — used as both runtime and package manager)
- Supported shells: bash, zsh
- A `GROQ_API_KEY` (required) — get one at [console.groq.com](https://console.groq.com)
- A `TAVILY_API_KEY` (optional) — enables higher-quality web search, get one at [tavily.com](https://tavily.com)

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/oovaa/bro.git
cd bro

# Verify Bun is installed
bun --version
# Install Bun from https://bun.sh/docs/installation if needed

# Run the install script (interactive, prompts for API keys)
./install
# Or non-interactive:
# ./install <GROQ_API_KEY> [TAVILY_API_KEY]
```

The install script:
- Installs dependencies via `bun install`
- Prompts for `GROQ_API_KEY` (required) and `TAVILY_API_KEY` (optional)
- Creates symlink in `~/.local/bin/bro`
- Adds API keys to your shell config (`.bashrc` or `.zshrc`)

---

## 📖 Usage

### Interactive Mode
```bash
bro
```
Starts an interactive chat session. Type your questions and press Enter. Press `Ctrl+C` to exit.

### Non-Interactive Mode
```bash
bro "tell me about quantum computing"
```
Runs a single query and exits.

---

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Groq API key for LLM inference |
| `TAVILY_API_KEY` | No | Tavily API key for web search (falls back to DuckDuckGo) |

### Models

Bro uses **Groq** with the following models:

| Role | Model | Purpose |
|------|-------|---------|
| Primary | `openai/gpt-oss-120b` | Main LLM for responses |
| Fallback | `llama-3.1-8b-instant` | Backup if primary unavailable |

Model fallback is handled automatically via LangChain's `modelFallbackMiddleware`.

### Web Search

| Provider | When Used |
|----------|-----------|
| **Tavily** | When `TAVILY_API_KEY` is set (higher quality) |
| **DuckDuckGo** | Fallback when Tavily not configured |

---

## 🔄 Updating

```bash
# Pull latest changes
git pull origin main

# Re-run install to update dependencies and symlink
./install
```

---

## 🛠 Development

```bash
# Install dependencies
bun install

# Type-check
bun run tsc --noEmit

# Test locally
./bro "test question"

# Run in interactive mode
./bro
```

---

## 🗑️ Uninstall

```bash
./uninstall
```

Removes:
- Symbolic link (`~/.local/bin/bro`)
- Environment variables from shell config
- Local dependencies

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `bro: command not found` | Ensure `~/.local/bin` is in your PATH, or re-run `./install` |
| `GROQ_API_KEY not set` | Run `./install` again or manually add to `.bashrc`/`.zshrc` |
| Bun not found | Install Bun: `curl -fsSL https://bun.sh/install \| bash` |
| Type errors | Run `bun run tsc --noEmit` to diagnose |

---

## 🤝 Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

Quick start:
1. Fork and clone
2. `bun install`
3. Make changes in TypeScript (`.ts` files)
4. `bun run tsc --noEmit`
5. Test: `./bro "test"`
6. Submit PR

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Omar Abdulrahim**  
GitHub: [@oovaa](https://github.com/oovaa)