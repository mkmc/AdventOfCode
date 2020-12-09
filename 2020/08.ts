import { readInput } from './utils/readInput'

const INPUT = readInput('08.input')

let currentLineNumber = 0
let acc = 0
let visitedLines: Record<string, boolean> = {}

for (let i = 0; i < INPUT.length; i++) {
  const inputCopy = [...INPUT]
  const { cmd, parameter } = parseLine(inputCopy[i])

  if (cmd === 'acc') {
    continue
  } else if (cmd === 'nop') {
    inputCopy[i] = `jmp ${parameter}`
  } else if (cmd === 'jmp') {
    inputCopy[i] = `nop ${parameter}`
  }

  if (executeProgram(inputCopy)) {
    console.log(acc)
    break
  }
}

function executeProgram(program: string[]) {
  currentLineNumber = 0
  acc = 0
  visitedLines = {}

  do {
    visitedLines[currentLineNumber] = true
    const { cmd, parameter } = parseLine(program[currentLineNumber])
    executeCmd(cmd, parameter)
  } while (
    !visitedLines[currentLineNumber] && currentLineNumber < program.length
  )

  return currentLineNumber === program.length
}

function executeCmd(cmd: string, parameter: number) {
  switch(cmd) {
    case 'nop':
      currentLineNumber++
      break
    case 'acc':
      acc += parameter
      currentLineNumber++
      break
    case 'jmp':
      currentLineNumber += parameter
      break
  }
}

function parseLine(line: string) {
  const [cmd, parameterString] = line.split(' ')
  return { cmd, parameter: parseInt(parameterString) }
}
