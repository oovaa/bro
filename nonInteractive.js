import { streaming_chain } from './chains'
import 'colors'
import { dontThink, processStream } from './io'

/**
 * Handles non-interactive mode with streaming
 * @param {string[]} args
 * @returns {Promise<string>}
 */
export async function handle_args(args) {
  const question = args.slice(2).join(' ')
  let fullResponse = ''

  const stream = await streaming_chain.stream({
    question: question,
    history: '',
  })

  if (args.includes('-s')) {
    args.splice(args.indexOf('-s'), 1)
    await dontThink(stream)
  } else await processStream(stream)
  return fullResponse
}
