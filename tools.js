import { TavilySearch } from '@langchain/tavily'
import { createAgent } from 'langchain'

export const tavilyTool = new TavilySearch({
  maxResults: 5,
  apiKey: Bun.env.TAVILY_API_KEY,
})

// const input = {
//   messages: [
//     {
//       role: 'user',
//       content: 'what is the latest version of bunjs',
//     },
//   ],
// }

// // Stream ALL events to see tool calls + outputs in real-time
// for await (const event of await agent.stream(input, {
//   streamMode: 'values',
//   recursionLimit: 40,
// })) {
//   const lastMessage = event.messages[event.messages.length - 1]

//   // Print tool calls
//   if (lastMessage.tool_calls?.length) {
//     console.log('🛠️  TOOL CALL:', lastMessage.tool_calls)
//   }

//   // Print tool RESULTS
//   if ('tool' in lastMessage.lc_kwargs && lastMessage.lc_kwargs.tool) {
//     console.log('📄 TOOL OUTPUT:', lastMessage.content)
//   }

//   // Print final agent response
//   if (lastMessage.type === 'ai') {
//     console.log('🤖 AGENT:', lastMessage.content)
//   }
// }
