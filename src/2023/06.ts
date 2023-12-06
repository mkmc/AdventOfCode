import { product } from '../utils/product'

type Race = { time: number; distance: number }

function parseTimes(line: string): number[] {
  return line
    .split(':')[1]
    .split(' ')
    .filter(Boolean)
    .map((s) => parseInt(s))
}

function parseInput(input: string[]): Race[] {
  const times = parseTimes(input[0])
  const distances = parseTimes(input[1])

  return times.map((t, i) => ({ time: t, distance: distances[i] }))
}

function countPossibleWaysToWin(race: Race): number {
  return new Array(race.time)
    .fill(0)
    .map((_, i) => i)
    .filter((holdTime) => (race.time - holdTime) * holdTime > race.distance)
    .length
}

function solve(input: string[]): number {
  return product(parseInput(input).map(countPossibleWaysToWin))
}

const TEST_INPUT = `Time:      7  15   30
Distance:  9  40  200`.split('\n')
const TEST_INPUT_2 = TEST_INPUT.map((s) => s.replaceAll(' ', ''))

const INPUT = `Time:        49     78     79     80
Distance:   298   1185   1066   1181`.split('\n')
const INPUT_2 = INPUT.map((s) => s.replaceAll(' ', ''))

console.log('Test input')
console.log('Part 1:', solve(TEST_INPUT))
console.log('Part 2:', solve(TEST_INPUT_2))

console.log('Real input')
console.log('Part 1:', solve(INPUT))
console.log('Part 2:', solve(INPUT_2))
