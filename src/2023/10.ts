import { sum } from '../utils/sum'
import { readInput } from '../utils/readInput'

type Point = { x: number; y: number }

function findStart(input: string[]): Point {
  let x = -1
  const y = input.findIndex((line) => {
    x = line.indexOf('S')
    return x !== -1
  })

  return { x, y }
}

function findNeighbor(input: string[], start: Point): Point {
  for (const neighbor of [
    { x: start.x - 1, y: start.y, valid: ['-', 'F', 'L'] },
    { x: start.x + 1, y: start.y, valid: ['-', 'J', '7'] },
    { x: start.x, y: start.y - 1, valid: ['|', 'F', '7'] },
    { x: start.x, y: start.y + 1, valid: ['|', 'J', 'L'] },
  ]) {
    if (neighbor.valid.includes(input[neighbor.y][neighbor.x])) {
      return neighbor
    }
  }

  throw new Error("Couldn't find valid neighbbor")
}

function walkToNext(input: string[], current: Point, previous: Point): Point {
  const symbol = input[current.y][current.x]

  switch (symbol) {
    case '-':
      return previous.x === current.x - 1
        ? { x: current.x + 1, y: current.y }
        : { x: current.x - 1, y: current.y }
    case '|':
      return previous.y === current.y - 1
        ? { x: current.x, y: current.y + 1 }
        : { x: current.x, y: current.y - 1 }
    case '7':
      return previous.y === current.y
        ? { x: current.x, y: current.y + 1 }
        : { x: current.x - 1, y: current.y }
    case 'F':
      return previous.y === current.y
        ? { x: current.x, y: current.y + 1 }
        : { x: current.x + 1, y: current.y }
    case 'J':
      return previous.y === current.y
        ? { x: current.x, y: current.y - 1 }
        : { x: current.x - 1, y: current.y }
    case 'L':
      return previous.y === current.y
        ? { x: current.x, y: current.y - 1 }
        : { x: current.x + 1, y: current.y }
    default:
      throw Error('Unexpected symbol: ' + symbol)
  }
}

function walk(input: string[], cb: (p: Point, value: string) => void): Point {
  const start = findStart(input)
  let previousPoint = start
  let currentPoint = findNeighbor(input, start)

  while (currentPoint.x !== start.x || currentPoint.y !== start.y) {
    cb(currentPoint, input[currentPoint.y][currentPoint.x])
    const nextPoint = walkToNext(input, currentPoint, previousPoint)
    previousPoint = currentPoint
    currentPoint = nextPoint
  }

  return start
}

function solvePart1(input: string[]): number {
  let steps = 1
  walk(input, () => steps++)
  return steps / 2
}

function solvePart2(input: string[]): number {
  const grid: string[][] = input.map((line) => line.split('').map((_) => '.'))

  const start = walk(input, (p, value) => (grid[p.y][p.x] = value))
  grid[start.y][start.x] = 'S'

  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]

    let inside = false
    let previous = ''
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '.') {
        grid[y][x] = inside ? 'I' : 'O'
      } else if (previous === 'F' && row[x] === 'J') {
        previous = ''
      } else if (previous === 'L' && row[x] === '7') {
        previous = ''
      } else if (row[x] !== '-') {
        inside = !inside
        previous = row[x]
      }
    }
  }

  return sum(grid.map((row) => row.filter((v) => v === 'I').length))
}

const TEST_INPUT = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`.split('\n')

const TEST_INPUT_2 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`.split('\n')

const INPUT = readInput('src/2023/10.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT_2))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
