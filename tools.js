// import { DuckDuckGoSearch } from '@langchain/community/tools/duckduckgo_search'

// const tool = new DuckDuckGoSearch({ maxResults: 1 })
// await tool.invoke("what is the current weather in sf?")

import { TavilySearch } from '@langchain/tavily'

const tool = new TavilySearch({
  maxResults: 5,
  topic: 'general',
  // includeAnswer: false,
  // includeRawContent: false,
  // includeImages: false,
  // includeImageDescriptions: false,
  // searchDepth: "basic",
  // timeRange: "day",
  // includeDomains: [],
  // excludeDomains: [],
})

console.log(
  await tool.invoke({
    query: 'what is the current weather in SF?',
  })
)
