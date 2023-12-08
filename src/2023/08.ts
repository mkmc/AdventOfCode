import { readInput } from '../utils/readInput'

type Graph = { [nodeID: string]: { L: string; R: string } }

function parseNode(line: string): { id: string; L: string; R: string } {
  return {
    id: line.slice(0, 3),
    L: line.slice(7, 10),
    R: line.slice(12, 15),
  }
}

function parseInput(input: string[]): {
  instruction: ('L' | 'R')[]
  graph: Graph
} {
  const graph: Graph = {}
  input.slice(2).forEach((n) => {
    const { id, L, R } = parseNode(n)
    graph[id] = { L, R }
  })

  return {
    instruction: input[0].split('') as ('L' | 'R')[],
    graph,
  }
}

function gcd(a: number, b: number): number {
  let t: number
  while (b !== 0) {
    t = b
    b = a % b
    a = t
  }
  return a
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

function solvePart1(input: string[]): number {
  const { instruction, graph } = parseInput(input)

  let currentNode = 'AAA'
  let numberOfSteps = 0
  while (currentNode !== 'ZZZ') {
    currentNode =
      graph[currentNode][instruction[numberOfSteps % instruction.length]]
    numberOfSteps++
  }

  return numberOfSteps
}

function solvePart2(input: string[]): number {
  const { instruction, graph } = parseInput(input)

  let nodes = Object.keys(graph).filter((n) => n.endsWith('A'))
  let cycleLengths = nodes.map((n) => {
    let currentNode = n
    let numberOfSteps = 0
    while (!currentNode.endsWith('Z')) {
      currentNode =
        graph[currentNode][instruction[numberOfSteps % instruction.length]]
      numberOfSteps++
    }

    return numberOfSteps
  })

  return cycleLengths.reduce((lcmValue, number) => lcm(lcmValue, number), 1)
}

const TEST_INPUT = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`.split('\n')

const TEST_INPUT_2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`.split('\n')

const INPUT = readInput('src/2023/08.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT_2))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
