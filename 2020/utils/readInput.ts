import fs from 'fs'

export function readInput(filePath: string) {
  const lines = fs.readFileSync(filePath, "utf-8").split('\n')

  // handle last line, which might be empty
  const lastLine = lines.pop()
  if (lastLine && lastLine.trim() !== '') {
    lines.push(lastLine)
  }

  return lines
}
