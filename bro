#!/usr/bin/env bun

// @ts-check

import { rl } from './io.js'
import { answer_chain } from './commandr.js'
import { handle_args } from './nonInteractive.js'
import { Colorizer } from './conf.js';
import 'colors'

const colorize = new Colorizer()

/**
 * handle quiting with a success status code
 */
function end() {
  rl.close()
  console.timeEnd('Goodbye!'.gray)
  process.exit(0)
}

// check non interactive quetion and handle it
if (process.argv.length > 2) {
  console.time('Goodbye!'.gray)
  let ans = await handle_args(process.argv)
  colorize.colorizeOutput(ans)
  end()
}

/**
 * Runs the chat CLI application to test the bot response.
 *
 * @returns {Promise<void>} A promise that resolves when the chat CLI application is finished.
 */
async function run() {
  let historyStr = ""; // Initialize history as an empty string
  console.time('Goodbye!'.gray)

  async function ask() {
    rl.question('You: ', async (/** @type {string} */ msg) => {
      msg = msg.trim();
      if (msg === '') {
        ask();
        return;
      }
      if (msg.toLocaleLowerCase() === 'exit') {
        end();
      } else {
        try {
          // Append the new message to the history string
          historyStr += `Human: ${msg}\n`;

          const response = await answer_chain.invoke({
            question: msg,
            history: historyStr // Pass the current history string
          });

          // Append the AI's response to the history string
          historyStr += `AI: ${response}\n`;

          colorize.colorizeOutput(response)
        } catch (error) {
          console.error('Error:', error.message);
        }
        ask(); // Call ask() again to wait for the next question
      }
    });
  }

  // Start the asking loop
  ask();
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