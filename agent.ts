import {
  createAgent,
  createMiddleware,
  modelFallbackMiddleware,
} from 'langchain'
import { MemorySaver } from '@langchain/langgraph'
import { randomUUIDv7 } from 'bun'
import { web_search_tool } from './tools'
import ora from 'ora'
import { ui } from './ui'

const checkpointer = new MemorySaver()

// Improved: More flexible prompt and easier model config
const system_prompt: string = `You are Bro, a friendly and helpful assistant. Your responses will be displayed in a CLI terminal environment.

# Instructions
1. Provide a clear, concise answer to the current question
2. Maintain a professional yet friendly tone
3. Reference conversation history when relevant, but don't dwell on past topics
4. Do not mention that you are an AI
5. Format output for optimal CLI display:
   - Reasonably short paragraphs
   - Avoid special characters and emojis

Response:`

// let modelUsed: string | 'unknown'

// const modelTracker = createMiddleware({
//   afterModel: async (response: any) => {
//     // Capture model from response metadata (available after LLM call)
//     const lastMessage = response.messages[response.messages.length - 1]
//     console.log(response);

//     modelUsed = lastMessage?.response_metadata?.model || 'unknown'
//     return response
//   },
//   name: 'model tracker',
// })

const fallback = modelFallbackMiddleware(
  'zai-org/GLM-5',
  'together:moonshotai/Kimi-K2.5',
)

export const agent = createAgent({
  model: 'together:Qwen/Qwen3.5-397B-A17B',
  middleware: [fallback],
  tools: [web_search_tool()],
  systemPrompt: system_prompt,
  checkpointer,
})

const thread_id: string = randomUUIDv7()

const config = {
  configurable: { thread_id },
}

/**
 * Calls the agent with a question and streams the response to stdout.
 * Handles tool execution notifications and formats output for CLI.
 *
 * @param question - The user's question.
 * @returns A promise that resolves when the operation is complete.
 */
export const call_agent = async (question: string): Promise<void> => {
  const messages = { messages: [{ role: 'user', content: question }] }

  const ora_spinner = ora({
    text: ui.thinking('Thinking..'),
    isEnabled: process.stdout.isTTY,
  }).start()

  let spinnerStopped: boolean = false

  const stream = await agent.stream(messages, {
    ...config,
    streamMode: 'messages', // Streams messages with content + tool_calls
  })

  // i can find that it is a tool in message.name = tools
  for await (const chunk of stream) {
    // Asserting as a tuple to avoid strict type-checking errors on LangGraph's dynamic stream output
    const [nodeName, message] = chunk as [any, any]

    if (!spinnerStopped && message.name !== 'tools') {
      ora_spinner.stop()
      spinnerStopped = true
    }

    if (message.name === 'tools') {
      await Bun.write(Bun.stdout, ui.tool('calling a tool...🛠️\n'))
    } else {
      await Bun.write(Bun.stdout, ui.answer(nodeName.content))
    }
  }

  // await Bun.write(Bun.stdout, ui.meta(`\n\n🤖 ❯ ${modelUsed}\n`))

  await Bun.write(Bun.stdout, '\n')
}
