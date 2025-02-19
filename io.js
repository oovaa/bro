import colors from 'colors'
import { createInterface } from 'readline'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

/**
 * Process streaming response
 * @param {AsyncIterable<any>} stream
 * @returns {Promise<string>}
 */
export async function processStream(stream) {
  let fullResponse = ''
  let msg_color = colors.gray.bold

  for await (const chunk of stream) {
    const content = chunk.content
    if (content == '<think>') continue
    if (content == '</think>') {
      msg_color = colors.blue.bold
      continue
    }
    if (content) {
      process.stdout.write(msg_color(content))
      fullResponse += content
    }
  }
  process.stdout.write('\n')
  return fullResponse
}
/**
 * Process streaming response without displaying thinking output
 * @param {AsyncIterable<any>} stream
 * @returns {Promise<string>}
 */
export async function dontThink(stream) {
  let fullResponse = ''
  let msg_color = colors.blue.bold
  let foundThinkEnd = false
  let isFirstChunk = true // Track if it's the first chunk

  for await (const chunk of stream) {
    const content = chunk.content
    if (content == '</think>') {
      foundThinkEnd = true
      continue
    }
    if (foundThinkEnd && content) {
      // Trim leading spaces/newlines for the first chunk
      const trimmedContent = isFirstChunk ? content.trimStart() : content
      process.stdout.write(msg_color(trimmedContent))
      fullResponse += trimmedContent
      isFirstChunk = false // Mark that the first chunk has been processed
    }
  }
  process.stdout.write('\n') // Add a newline at the end
  return fullResponse
}

export { rl }
