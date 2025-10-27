import { createAgent, HumanMessage, SystemMessage } from 'langchain'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import 'langsmith'
import { MemorySaver } from '@langchain/langgraph'
import {  randomUUIDv7 } from 'bun'

const checkpointer = new MemorySaver()

// Improved: More flexible prompt and easier model config
const q_template = `You are Bro, a friendly and helpful assistant. Your responses will be displayed in a CLI terminal environment.



# Instructions
1. Provide a clear, concise answer to the current question
2. Maintain a professional yet friendly tone
3. Reference conversation history when relevant, but don't dwell on past topics
4. Do not mention that you are an AI
5. Format output for optimal CLI display:
   - Reasonably short paragraphs
   - Avoid special characters and emojis

Response:`


const q_prompt = new PromptTemplate({
  template: q_template,
  inputVariables: ['history', 'question'],
})

// Model config is now easier to change via env or fallback

export const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash',
  temperature: 0,
  maxRetries: 2,
})

export const agent = createAgent({
  model,
  tools: [],
  systemPrompt: q_template, // your custom prompt directly,
  checkpointer,
})

// const messages = {
//   messages: [{ role: 'user', content: 'Im omar' }],
// }

const thread_id = randomUUIDv7()

const config = {
  configurable: { thread_id },
}

// console.log((awa
// it agent.invoke(messages, config)).messages.at(-1)?.content)

// const messages2 = {
//   messages: [{ role: 'user', content: 'tell me about sudan?' }],
// }

// const stream = await agent.stream(messages2, {
//   ...config,
//   streamMode: 'messages', /// important
// })
// // console.log(stream)

// for await (const chunk of stream) {
//   console.log(chunk[0].content)
// }

// next step implemnt tool calling
