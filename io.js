import { createInterface } from 'readline'

/**
 * Readline interface configured for stdin/stdout.
 */
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

export { rl }
