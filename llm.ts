import { BaseChatModel } from '@langchain/core/language_models/chat_models'
import { ChatGroq } from '@langchain/groq'

/**
 * Configured ChatGroq instance for LLM interactions.
 * Uses 'openai/gpt-oss-120b' model with temperature 0.
 */
export const llm: BaseChatModel = new ChatGroq({
  model: 'openai/gpt-oss-120b', // good
  // model: 'llama-3.1-8b-instant',
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
})


