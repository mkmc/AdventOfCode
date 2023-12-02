import { readInput } from '../utils/readInput'

const COLORS = ['red', 'blue', 'green'] as const

type Color = (typeof COLORS)[number]
type Set = { [x in Color]: number }
type Game = { id: number; sets: Set[] }

const BAG: Set = { red: 12, green: 13, blue: 14 }

function parseSet(line: string): Set {
  const set = { red: 0, green: 0, blue: 0 }

  line.split(', ').forEach((cube) => {
    const [count, color] = cube.split(' ')
    set[color as Color] = parseInt(count)
  })

  return set
}

function parseLine(line: string): Game {
  const [idPart, setsPart] = line.split(': ')

  return {
    id: parseInt(idPart.replace('Game ', '')),
    sets: setsPart.split('; ').map(parseSet),
  }
}

function isPossible(game: Game): boolean {
  return game.sets.every((set) =>
    COLORS.every((color) => set[color] <= BAG[color])
  )
}

function getPowerOfMinimumSet(game: Game): number {
  return COLORS.reduce(
    (power, color) => power * Math.max(...game.sets.map((s) => s[color])),
    1
  )
}

function solvePart1(input: string[]): number {
  return input
    .map(parseLine)
    .reduce((sum, game) => (isPossible(game) ? sum + game.id : sum), 0)
}

function solvePart2(input: string[]): number {
  return input
    .map(parseLine)
    .reduce((sum, game) => sum + getPowerOfMinimumSet(game), 0)
}

const TEST_INPUT = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split('\n')

const INPUT = readInput('src/2023/02.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
