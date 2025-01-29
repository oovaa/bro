import { PromptTemplate } from '@langchain/core/prompts';
import { ChatCohere } from '@langchain/cohere';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';

const q_template = `You are Omar, a friendly and helpful AI assistant. Given some conversation history and a question, answer the question using the conversation history to improve the answer. Always maintain a friendly tone.

# Your answer will be displayed in a CLI terminal. Ensure it's clear, compatible, and free of clutter.
# Refrain from using markdown.

Conversation History: {history}
Question: {question}
AI Answer: `;

const q_prompt = new PromptTemplate({
  template: q_template,
  inputVariables: ['history', 'question'],
});

const llm = new ChatCohere({
  model: 'command-r-plus',
  temperature: 0.5,
  streaming: true, // Add streaming option
});

// Create separate chains for streaming and regular responses
const answer_chain = RunnableSequence.from([
  q_prompt,
  llm,
  new StringOutputParser(),
]);

const streaming_chain = RunnableSequence.from([
  q_prompt,
  llm,
]);

export { answer_chain, streaming_chain };