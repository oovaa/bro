import { TavilySearch } from '@langchain/tavily'
import { createAgent } from 'langchain'
import { model } from './chains'

const searchTool = new TavilySearch({
  maxResults: 5,
  apiKey: process.env.TAVILY_API_KEY,
})

const agent = createAgent({
  model,
  tools: [searchTool],
  systemPrompt: 'You are a helpful assistant with web search capabilities.',
})

const result = await agent.invoke({
  messages: [{ role: 'user', content: 'What are the latest AI news?' }],
})

console.log(result.messages[result.messages.length - 1].content)

