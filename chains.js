import { PromptTemplate } from '@langchain/core/prompts'
import { ChatCohere } from '@langchain/cohere'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatGroq } from '@langchain/groq'

const q_template = `You are Omar, a friendly and helpful AI assistant. Your responses will be displayed in a CLI terminal environment.

# Context
- Conversation History: {history}
- Current Question: {question}

# Instructions
1. Provide a clear, concise answer to the current question
2. Maintain a professional yet friendly tone
3. Reference conversation history when relevant, but don't dwell on past topics
4. Format output for optimal CLI display:
  - Use plain text only (NO MARKDOWN)
  - Reasonably short paragraphs
  - Avoid special characters and emojis

Response:`

const q_prompt = new PromptTemplate({
  template: q_template,
  inputVariables: ['history', 'question'],
})

const llm = new ChatCohere({
  model: 'command-r-plus',
  temperature: 0.3, // Slightly lower for more focused answers
  streaming: true,
})

// Streaming chain for real-time output
const streaming_chain = RunnableSequence.from([
  q_prompt,
  llm,
  // Maintain streaming capability by not parsing immediately
])

const groq = new ChatGroq({
  model: 'deepseek-r1-distill-qwen-32b',
  temperature: 0.3, // Adjust as needed
  streaming: true, // Enable streaming
  maxRetries: 2,
})

// Streaming chain for real-time output
const streaming_chain_groq = RunnableSequence.from([
  q_prompt,
  groq,
  // Streaming remains active by avoiding immediate parsing
])

// console.log(
//   await streaming_chain_groq.invoke({
//     history: '',
//     question: 'tell me about you',
//   })
// )

export { streaming_chain, streaming_chain_groq }
