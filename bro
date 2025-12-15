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
    rl.question('You: ', async (msg) => {
      msg = msg.trim()
      if (msg === '') {
        ask()
        return
      }
      if (msg.toLowerCase() === 'exit') {
        end()
      } else {
        try {
          await call_agent(msg)
        } catch (error) {
          console.error('\nError:', error)
        }
        ask()
      }
    })
  }

  // Start the asking loop
  ask()
}

// Run the application
run()
