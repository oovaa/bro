import { createInterface, Interface } from 'readline'

/**
 * Readline interface configured for stdin/stdout.
 */
const rl: Interface = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

rl.
export { rl }
