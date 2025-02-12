import { streaming_chain } from './commandr'
import 'colors'

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

  for await (const chunk of stream) {
    const content = chunk.content
    if (content) {
      // @ts-ignore
      process.stdout.write(content.blue.bold)
      fullResponse += content
    }
  }
  process.stdout.write('\n')
  return fullResponse
}
