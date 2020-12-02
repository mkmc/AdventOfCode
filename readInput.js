const fs = require('fs')

module.exports = function readInput(file) {
  const lines = fs.readFileSync(file, "utf-8").split('\n')

  // handle last line, which might be empty
  const lastLine = lines.pop()
  if (lastLine.trim() !== '') {
    lines.push(lastLine)
  }

  return lines
}
