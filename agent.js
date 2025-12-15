import { createAgent } from 'langchain'
import { MemorySaver } from '@langchain/langgraph'
import { randomUUIDv7 } from 'bun'
import { llm } from './llm'
import { web_search_tool } from './tools'
import colors from 'colors'

const checkpointer = new MemorySaver()

// Improved: More flexible prompt and easier model config
const system_prompt = `You are Bro, a friendly and helpful assistant. Your responses will be displayed in a CLI terminal environment.



# Instructions
1. Provide a clear, concise answer to the current question
2. Maintain a professional yet friendly tone
3. Reference conversation history when relevant, but don't dwell on past topics
4. Do not mention that you are an AI
5. Format output for optimal CLI display:
   - Reasonably short paragraphs
   - Avoid special characters and emojis

Response:`

export const agent = createAgent({
  model: llm,
  tools: [web_search_tool()],
  systemPrompt: system_prompt, // your custom prompt directly,
  checkpointer,
})

const thread_id = randomUUIDv7()

const config = {
  configurable: { thread_id },
}

// export const call_agent = async (question) => {
//   const messages = {
//     messages: [{ role: 'user', content: question }],
//   }

//   const stream = await agent.stream(messages, {
//     ...config,
//     streamMode: 'messages', /// important
//   })

//   for await (const chunk of stream) {
//     // await Bun.write(Bun.stdout,chunk)
//     console.log(chunk)
//   }
//   await Bun.write(Bun.stdout,'\n')
// }

export const call_agent = async (question) => {
  const messages = { messages: [{ role: 'user', content: question }] }

  const stream = await agent.stream(messages, {
    ...config,
    streamMode: 'messages', // Streams messages with content + tool_calls
  })
  // i can find that it is a tool in message.name = tools
  for await (const chunk of stream) {
    const [nodeName, message] = chunk

    //console.log('node name :', nodeName) // "model", "tools", etc.
    //console.log('message :', message) // AIMessage, ToolMessage, etc.
    if (message.name == 'tools')
      await Bun.write(Bun.stdout, colors.dim.green('calling a tool...\n'))
    else {
      await Bun.write(Bun.stdout, colors.cyan.bold(nodeName.content))
    }
  }
  await Bun.write(Bun.stdout, '\n')
}

// await call_agent('hi my name is omar')
// await call_agent('what is the latest bun versoin')
// await call_agent('what is my name ?')
