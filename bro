#!/usr/bin/env bun
import { rl } from './io.js'
import { handle_args } from './nonInteractive.js'
import { call_agent } from './agent.js'
import { end, setup } from './setup.js'
import { ui } from './ui.js' // Added .js extension for consistency, adjust if needed

// 1. Initialize setup
setup()

// 2. Handle non-interactive mode immediately
if (process.argv.length > 2) {
  await handle_args(process.argv)
  end()
  process.exit(0) // Explicitly exit so it doesn't fall through to run()
}

/**
 * Prompts the user for input and processes the response.
 */
function ask(): Promise<string> {
  return new Promise((resolve) => {
    rl.question('You: ', resolve) // Fixed prompt to look a bit cleaner
  })
}

/**
 * Runs the chat CLI application interactively
 * @returns {Promise<void>}
 */
async function run() {
  // Use a while loop to sequentially await user input
  while (true) {
    process.stdin.resume()
    const msg = await ask()
    const trimmedMsg = msg.trim()

    if (trimmedMsg.toLowerCase() === 'exit') {
      end()
      break // Break the loop to exit gracefully
    }

    if (trimmedMsg === '') {
      continue // Skip empty messages and ask again
    }

    try {
      await call_agent(trimmedMsg)
    } catch (error) {
      console.error(
        ui.error(
          '\nAn error occurred while processing your input. Please try again.',
        ),
      )
    }
  }
}

// 3. Start the interactive application
run()
