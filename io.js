import colors from 'colors'
import { createInterface } from 'readline'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

/**
 * Removes unwanted Markdown formatting and trims whitespace
 * @param {string} text
 * @returns {string}
 */
function cleanOutput(text) {
  return text
    .replace(/[*_`#\-]+/g, '') // Remove markdown formatting
    .replace(/\s+$/g, '') // Remove trailing whitespace
}

/**
 * Process streaming response with color and cleaning
 * @param {AsyncIterable<any>} stream
 * @returns {Promise<string>}
 */
export async function processStream(stream) {
  let fullResponse = ''
  let msg_color = colors.gray.bold

  for await (const chunk of stream) {
    let content = chunk.content
    if (content === '<think>') continue
    if (content === '</think>') {
      msg_color = colors.blue.bold
      continue
    }
    if (content) {
      content = cleanOutput(content)
      process.stdout.write(msg_color(content))
      fullResponse += content
    }
  }
  process.stdout.write('\n')
  return fullResponse
}

/**
 * Process streaming response, skipping <think> phase
 * @param {AsyncIterable<any>} stream
 * @returns {Promise<string>}
 */
export async function dontThink(stream) {
  let fullResponse = ''
  let msg_color = colors.blue.bold
  let foundThinkEnd = false
  let isFirstChunk = true

  for await (const chunk of stream) {
    let content = chunk.content
    if (content === '</think>') {
      foundThinkEnd = true
      continue
    }
    if (foundThinkEnd && content) {
      content = cleanOutput(content)
      const trimmedContent = isFirstChunk ? content.trimStart() : content
      process.stdout.write(msg_color(trimmedContent))
      fullResponse += trimmedContent
      isFirstChunk = false
    }
  }
  process.stdout.write('\n')
  return fullResponse
}

export { rl }
