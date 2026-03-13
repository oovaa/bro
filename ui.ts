import chalk, { type ChalkInstance } from 'chalk'

export interface UI {
  answer: ChalkInstance
  tool: ChalkInstance
  thinking: ChalkInstance
  meta: ChalkInstance
  warn: ChalkInstance
  error: ChalkInstance
}

export const ui: UI = {
  // Bright, highly readable blue for the main response
  answer: chalk.hex('#03ff89').bold, 
  
  // Soft purple to distinguish background tool execution
  tool: chalk.hex('#bb9af7'), 
  
  // Dim grayish-blue so it visually recedes while processing
  thinking: chalk.hex('#565f89').italic, 
  
  // Crisp cyan for metadata (like the model name)
  meta: chalk.hex('#2ac3de').underline, 
  
  // Vibrant orange for warnings
  warn: chalk.hex('#ff9e64').bold, 
  
  // Soft but distinct red for errors (dropped the underline to keep it clean)
  error: chalk.hex('#f7768e').bold, 
}