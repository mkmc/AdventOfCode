import fs from 'fs'

export function readInput(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').trimEnd().split('\n')
}
