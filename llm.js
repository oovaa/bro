import { ChatGroq } from '@langchain/groq'

export const llm = new ChatGroq({
  model: 'openai/gpt-oss-120b', // good
  // model: 'llama-3.1-8b-instant',
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
})
