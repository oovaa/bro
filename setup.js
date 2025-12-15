import { rl } from './io'

/**
 * Sets up the CLI environment, including signal handlers and help flag check.
 */
export function setup() {
  // count from start time
  console.time('Goodbye!'.gray)
  // Register signal handlers
  ;['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGTSTP'].forEach((signal) => {
    rl.on(signal, () => {
      end()
    })
  })

  // help flag
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(
      [
        'bro — Chat CLI',
        '',
        'Usage:',
        '  bro                 Start interactive chat',
        '  bro your question  Ask a single question (non-interactive)',
        '',
        'Options:',
        '  -h, --help      Show this help message',
        '',
        'Examples:',
        '  bro',
        '  bro "What is the capital of France?"',
      ].join('\n')
    )
    process.exit(0)
  }
}

/**
 * handle quiting with a success status code
 */
export function end() {
  console.timeEnd('Goodbye!'.gray)
  rl.close()
  process.exit(0)
}
