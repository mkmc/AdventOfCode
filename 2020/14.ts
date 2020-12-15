import { readInput } from './utils/readInput'

type Binary = '0' | '1'

type Mask = {
  type: 'mask',
  values: {
    position: number,
    value: Binary
  }[]
}

type MemWrite = {
  type: 'memwrite',
  address: number,
  value: number
}

type Instruction = Mask | MemWrite

run()

function run() {
  const INPUT = readInput('14.input')

  let currentMask: Mask = {type: 'mask', values: []}
  const memory: Record<number, number> = {}

  INPUT.forEach(line => {
    const instruction = parseInstruction(line)

    switch (instruction.type) {
      case 'mask':
        currentMask = instruction
        break
      case 'memwrite':
        const binary = toBinary(instruction.value)
        currentMask.values.forEach(v => {
          binary[v.position] = v.value
        })
        memory[instruction.address] = toDecimal(binary)
        break
    }
  })

  console.log(Object.values(memory).reduce((sum, v) => sum + v, 0))
}

function toBinary(x: number): Binary[] {
  const binary = x.toString(2).padStart(36, '0').split('') as Binary[]
  return binary
}

function toDecimal(x: Binary[]): number {
  return parseInt(x.join(''), 2)
}

function parseInstruction(line: string): Instruction {
  if (line.startsWith('mem')) {
    const [memString, valueString] = line.split(' = ')
    return {
      type: 'memwrite',
      address: parseInt(memString.slice(4, memString.length-1)),
      value: parseInt(valueString)
    }
  } else if (line.startsWith('mask')) {
    return {
      type: 'mask',
      values: line.substr(7).split('').map(
        (value, position) => ({ position, value: value })
      ).filter(v => v.value !== 'X') as Mask['values']
    }
  } else {
    throw new Error('Cannot parse line: ' + line)
  }
}
