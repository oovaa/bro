import { streaming_chain } from './chains'
import 'colors'
import { dontThink, processStream } from './io'

/**
 * Handles non-interactive mode with streaming and error feedback
 * @param {string[]} args
 * @returns {Promise<string>}
 */
export async function handle_args(args) {
  if (!args || args.length < 3) {
    console.error('Usage: bro <question> [-s]\n\nExample: bro "your question" [-s]')
    process.exit(1)
  }
  const question = args.slice(2).join(' ').trim()
  if (!question) {
    console.error('No question provided.')
    process.exit(1)
  }
  let fullResponse = ''
  try {
    const stream = await streaming_chain.stream({
      question,
      history: '',
    })
    if (args.includes('-s')) {
      args.splice(args.indexOf('-s'), 1)
      await dontThink(stream)
    } else {
      await processStream(stream)
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Error:', msg)
    process.exit(1)
  }
  return fullResponse
}
