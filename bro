#!/usr/bin/env bun

// @ts-check

import { processStream, rl } from './io.js'
import { handle_args } from './nonInteractive.js'
import { streaming_chain_groq } from './chains.js'

/**
 * handle quiting with a success status code
 */
function end() {
  rl.close()
  console.timeEnd('Goodbye!'.gray)
  process.exit(0)
}

// check non interactive question and handle it
if (process.argv.length > 2) {
  console.time('Goodbye!'.gray)
  await handle_args(process.argv)
  end()
}

/**
 * Runs the chat CLI application with streaming
 * @returns {Promise<void>}
 */
async function run() {
  let historyStr = ''
  console.time('Goodbye!'.gray)

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
          const stream = await streaming_chain_groq.stream({
            question: msg,
            history: historyStr,
          })

          const response = await processStream(stream)
          historyStr += `Human: ${msg}\nAI: ${response}\n`
        } catch (error) {
          console.error('\nError:', error.message)
        }
        ask()
      }
    })
  }

  // Start the asking loop
  ask()
}

// Register signal handlers
;['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGTSTP'].forEach((signal) => {
  rl.on(signal, () => {
    console.log()
    end()
  })
})

// Run the application
run()
