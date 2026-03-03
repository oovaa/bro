#!/usr/bin/env bun
import { rl } from './io.js'
import { handle_args } from './nonInteractive.js'
import { call_agent } from './agent.js'
import { end, setup } from './setup.js'
import { ui } from './ui'

setup()

// check non interactive question and handle it
if (process.argv.length > 2) {
  await handle_args(process.argv)
  end()
}

/**
 * Prompts the user for input and processes the response.
 */
function ask() {
  return new Promise((resolve) => {
    rl.question('You: ', resolve)
  })
}

/**
 * Runs the chat CLI application with streaming
 * @returns {Promise<void>}
 */
async function run() {
  // Start the asking loop
  await rl.question('You:', async (msg) => {
    const trimmedMsg = msg.trim()
    if (trimmedMsg === '') return

    if (trimmedMsg.toLowerCase() === 'exit') end()

    try {
      await call_agent(trimmedMsg)
    } catch (error) {
      console.error(
        ui.error(
          '\nAn error occurred while processing your input. Please try again.',
        ),
      )
    }
    run()
  })
}

// Run the application
run()
