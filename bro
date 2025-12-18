#!/usr/bin/env bun
import { rl } from './io.js'
import { handle_args } from './nonInteractive.js'
import { call_agent } from './agent.js'
import { end, setup } from './setup.js'

setup()

// check non interactive question and handle it
if (process.argv.length > 2) {
  await handle_args(process.argv)
  end()
}

/**
 * Runs the chat CLI application with streaming
 * @returns {Promise<void>}
 */
async function run() {
  /**
   * Prompts the user for input and processes the response.
   */
  async function ask() {
    while (true) {
      const msg = await new Promise((resolve) => rl.question('You: ', resolve))
      const trimmedMsg = msg.trim()
      if (trimmedMsg === '') continue
      if (trimmedMsg.toLowerCase() === 'exit') {
        end()
        break
      }
      try {
        await call_agent(trimmedMsg)
      } catch (error) {
        console.error(
          '\nAn error occurred while processing your input. Please try again.'
        )
      }
    }
  }

  // Start the asking loop
  ask()
}

// Run the application
run()
