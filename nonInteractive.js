import { call_agent } from './agent'
import 'colors'

/**
 * Handles non-interactive mode with streaming and error feedback.
 * @param {string[]} args - Command line arguments.
 * @returns {Promise<void>}
 */
export async function handle_args(args) {
  if (!args || args.length < 3) {
    console.error(
      'Usage: bro <question> [-s]\n\nExample: bro "your question" [-s]'
    )
    process.exit(1)
  }

  const question = args.slice(2).join(' ').trim()
  if (!question) {
    console.error('No question provided.')
    process.exit(1)
  }
  try {
    await call_agent(question)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Error:', msg)
    process.exit(1)
  }
}
