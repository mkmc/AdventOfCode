import { readInput } from '../utils/readInput'

type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST'

function solvePart1(input: string[]): number {
  let sum = 0
  for (let i = 0; i < input[0].length; i++) {
    let nextValue = input.length
    input.forEach((l, j) => {
      if (l[i] === '#') {
        nextValue = input.length - j - 1
      } else if (l[i] === 'O') {
        sum += nextValue
        nextValue--
      }
    })
  }

  return sum
}

function getLines(input: string[][], direction: Direction): string[][] {
  let lines: string[][]

  switch (direction) {
    case 'EAST':
    case 'WEST':
      lines = input
      break
    case 'SOUTH':
    case 'NORTH':
      lines = input[0].map((_, i) => input.map((v) => v[i]))
      break
    default:
      const c: never = direction
      throw new Error('Unhandled case:' + direction)
  }

  if (direction === 'SOUTH' || direction === 'EAST') {
    lines = lines.map((l) => l.reverse())
  }

  return lines
}

function mergeBack(lines: string[][], direction: Direction): string[][] {
  if (direction === 'SOUTH' || direction === 'EAST') {
    lines = lines.map((l) => l.reverse())
  }

  switch (direction) {
    case 'EAST':
    case 'WEST':
      return lines
    case 'SOUTH':
    case 'NORTH':
      return lines[0].map((_, i) => lines.map((v) => v[i]))
  }
}

function moveRocks(input: string[][]): string[][] {
  return input.map((line) => {
    let tiltedPosition = 0
    for (let i = 0; i < line.length; i++) {
      if (line[i] === 'O') {
        if (i !== tiltedPosition) {
          line[tiltedPosition] = 'O'
          line[i] = '.'
        }
        tiltedPosition++
      } else if (line[i] === '#') {
        tiltedPosition = i + 1
      }
    }

    return line
  })
}

function tilt(input: string[][], direction: Direction): string[][] {
  let lines = getLines(input, direction)

  lines = moveRocks(lines)

  return mergeBack(lines, direction)
}

function cycle(input: string[][]): string[][] {
  let current = input
  const directions: Direction[] = ['NORTH', 'WEST', 'SOUTH', 'EAST']

  directions.forEach((direction) => {
    current = tilt(current, direction)
  })

  return current
}

function calculateLoad(input: string[][]): number {
  let sum = 0
  for (let i = 0; i < input[0].length; i++) {
    input.forEach((l, j) => {
      if (l[i] === 'O') {
        sum += input.length - j
      }
    })
  }

  return sum
}

const CYCLES = 1000000000

function solvePart2(input: string[]): number {
  let map = input.map((l) => l.split(''))
  let hashes = [JSON.stringify(map)]
  for (let i = 1; i <= CYCLES; i++) {
    const newMap = cycle(map)
    const newHash = JSON.stringify(newMap)

    const e = hashes.findIndex((h) => h === newHash)
    if (e !== -1) {
      map = JSON.parse(hashes[e + ((CYCLES - e) % (i - e))])

      break
    }

    map = newMap
    hashes.push(newHash)
  }

  return calculateLoad(map)
}

const TEST_INPUT = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`.split('\n')

const INPUT = readInput('src/2023/14.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
