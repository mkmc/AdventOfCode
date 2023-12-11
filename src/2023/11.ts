import { readInput } from '../utils/readInput'

type Point = { x: number; y: number }

function expand(input: string[]): string[] {
  for (let i = input.length - 1; i >= 0; i--) {
    if (!input[i].includes('#')) {
      input[i] = ''.padEnd(input[i].length, 'x')
    }
  }

  for (let i = input[0].length - 1; i >= 0; i--) {
    if (input.every((l) => l[i] !== '#')) {
      input = input.map((l) => l.substring(0, i) + 'x' + l.substring(i + 1))
    }
  }

  return input
}

function findGalaxies(universe: string[]): Point[] {
  const galaxies: Point[] = []

  for (let y = 0; y < universe.length; y++) {
    const line = universe[y]
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '#') {
        galaxies.push({ x, y })
      }
    }
  }

  return galaxies
}

function getDistance(
  universe: string[],
  a: Point,
  b: Point,
  expansionFactor: number
): number {
  let distance = 0
  for (let x = Math.min(a.x, b.x) + 1; x <= Math.max(a.x, b.x); x++) {
    distance += universe[a.y][x] === 'x' ? expansionFactor : 1
  }

  for (let y = Math.min(a.y, b.y) + 1; y <= Math.max(a.y, b.y); y++) {
    distance += universe[y][a.x] === 'x' ? expansionFactor : 1
  }

  return distance
}

function getTotalDistance(
  universe: string[],
  galaxies: Point[],
  expansionFactor: number
): number {
  let totalDistance = 0
  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      totalDistance += getDistance(
        universe,
        galaxies[i],
        galaxies[j],
        expansionFactor
      )
    }
  }

  return totalDistance
}

function solve(input: string[], expansionFactor: number): number {
  const universe = expand(input)
  const galaxies = findGalaxies(universe)

  return getTotalDistance(universe, galaxies, expansionFactor)
}

const TEST_INPUT = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`.split('\n')

const INPUT = readInput('src/2023/11.input')

console.log('Test input')
console.log('Part 1:', solve(TEST_INPUT, 2))
console.log('Part 2:', solve(TEST_INPUT, 10))
console.log('Part 2:', solve(TEST_INPUT, 100))

console.log('Real input')
console.log('Part 1:', solve(INPUT, 2))
console.log('Part 2:', solve(INPUT, 1_000_000))
