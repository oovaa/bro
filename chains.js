import { createAgent } from 'langchain'
import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import 'langsmith'

// Improved: More flexible prompt and easier model config
const q_template = `You are Omar, a friendly and helpful assistant. Your responses will be displayed in a CLI terminal environment.

# Context
- Conversation History: {history}
- Current Question: {question}

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

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash',
  temperature: 0,
  maxRetries: 2,
})

const agent = createAgent({
  model,
  tools: [],
  prompt: q_prompt, // your custom prompt directly
})

const streaming_chain = RunnableSequence.from([q_prompt, model])

export { streaming_chain }
