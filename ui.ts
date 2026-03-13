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
  answer: chalk.hex('#c0caf5').bold,
  tool: chalk.hex('#7dcfff').blueBright,
  thinking: chalk.hex('#434c8e').italic,
  meta: chalk.hex('#CE3B09').underline,
  warn: chalk.hex('#ffae57').bold,
  error: chalk.hex('#ff7a93').bold.underline,
}
