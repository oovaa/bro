import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatGroq } from '@langchain/groq'
import 'langsmith'
import { wrapSDK } from 'langsmith/wrappers'



const q_template = `You are Omar, a friendly and helpful assistant. Your responses will be displayed in a CLI terminal environment.

# Context
- Conversation History: {history}
- Current Question: {question}

# Instructions
1. Provide a clear, concise answer to the current question
2. Maintain a professional yet friendly tone
3. Reference conversation history when relevant, but don't dwell on past topics
4. do not mention that you are an AI
5. Format output for optimal CLI display:
  - Reasonably short paragraphs
  - Avoid special characters and emojis

Response:`

const q_prompt = new PromptTemplate({
  template: q_template,
  inputVariables: ['history', 'question'],
})

const groq = wrapSDK(
  new ChatGroq({
    model: 'deepseek-r1-distill-llama-70b',
    temperature: 0.3, // Adjust as needed
    streaming: true, // Enable streaming
  })
)

// Streaming chain for real-time output
const streaming_chain = RunnableSequence.from([
  q_prompt,
  groq,
  // Streaming remains active by avoiding immediate parsing
])

export { streaming_chain }
