# Contributing to Bro

Thank you for your interest in contributing to Bro! We welcome pull requests, bug reports, and feature suggestions from the community.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Code Style and Standards](#code-style-and-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Code of Conduct](#code-of-conduct)

## Getting Started

Before you begin:
- Make sure you have [Bun](https://bun.sh/docs/installation) installed on your system
- Read the [README](../README.md) to understand how the project works
- Check the [ARCHITECTURE](ARCHITECTURE.md) document to understand the codebase structure
- Look through existing [issues](https://github.com/oovaa/bro/issues) and [pull requests](https://github.com/oovaa/bro/pulls) to avoid duplicate work

## Development Setup

1. **Fork and Clone**
   ```sh
   git clone https://github.com/YOUR_USERNAME/bro.git
   cd bro
   ```

2. **Install Dependencies**
   ```sh
   bun install
   ```

3. **Set Up Your API Key**
   ```sh
   export GROQ_API_KEY="your_api_key_here"
   ```

4. **Test the CLI Locally**
   ```sh
   ./bro "test question"
   ```

## How to Contribute

1. **Fork the repository** and clone your fork locally.
2. **Create a new branch** for your feature or fix:
   ```sh
   git checkout -b feature/my-feature
   # or
   git checkout -b fix/my-bugfix
   ```
3. **Make your changes** and ensure your code follows the project's style and conventions.
4. **Test your changes** thoroughly:
   - Test interactive mode: `./bro`
   - Test non-interactive mode: `./bro "test query"`
   - Test streaming mode: `./bro -s "test query"`
5. **Commit your changes** with a clear message (see [Commit Message Guidelines](#commit-message-guidelines))
6. **Push your branch** to your fork:
   ```sh
   git push origin feature/my-feature
   ```
7. **Open a pull request** on GitHub and describe your changes in detail.

## Code Style and Standards

- **JavaScript Standard Style**: Follow modern ES6+ conventions
- **File Organization**: Keep files modular and focused on a single responsibility
- **Comments**: Add comments for complex logic, but prefer self-documenting code
- **Error Handling**: Always handle errors gracefully with meaningful messages
- **Dependencies**: Only add new dependencies if absolutely necessary; justify them in your PR
- **Terminal Output**: Keep CLI output clean and readable; use colors appropriately via the `colors` library

### Key Principles

- **Simplicity**: Keep the code simple and maintainable
- **Performance**: Consider performance, especially for streaming responses
- **User Experience**: CLI interactions should be smooth and intuitive
- **Compatibility**: Ensure changes work on both Linux and macOS

## Commit Message Guidelines

Write clear and descriptive commit messages:

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests when relevant

**Examples:**
```
Add streaming support for non-interactive mode
Fix API key validation in setup script
Update README with new installation steps
Refactor agent.js to improve readability
```

## Pull Request Process

1. **Update Documentation**: If your changes affect user-facing features, update the README
2. **Keep PRs Focused**: One feature or fix per pull request
3. **Write a Clear Description**: Explain what changes you made and why
4. **Link Related Issues**: Reference any related issues using `Fixes #123` or `Closes #123`
5. **Be Responsive**: Address any feedback from maintainers promptly
6. **Wait for Review**: A maintainer will review your PR and may request changes

### PR Checklist

Before submitting your pull request, ensure:
- [ ] Code follows the project's style guidelines
- [ ] Changes have been tested locally
- [ ] Documentation has been updated (if needed)
- [ ] Commit messages are clear and descriptive
- [ ] No unnecessary files or dependencies were added
- [ ] The PR description clearly explains the changes

## Reporting Issues

If you find a bug or have a feature request, please [open an issue](https://github.com/oovaa/bro/issues/new) on GitHub with:

- **Clear Title**: Summarize the issue in a few words
- **Description**: Provide a detailed description of the problem or feature
- **Steps to Reproduce**: For bugs, include step-by-step instructions
- **Expected Behavior**: Describe what you expected to happen
- **Actual Behavior**: Describe what actually happened
- **Environment**: Include your OS, Bun version, and any other relevant details
- **Logs/Screenshots**: Attach any relevant logs or screenshots

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed

## Code of Conduct

Please be respectful and inclusive in all interactions. We are committed to providing a welcoming and harassment-free experience for everyone.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting/derogatory comments
- Publishing others' private information without permission
- Any conduct that would be considered unprofessional

---

## Questions?

If you have questions or need help, feel free to:
- Open an issue with the `question` label
- Check existing documentation in the [docs](../docs) folder
- Review the [ARCHITECTURE](ARCHITECTURE.md) document

Thank you for helping make Bro better! 🚀
