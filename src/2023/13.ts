import fs from 'fs'
import { sum } from '../utils/sum'

function countDiffs(a: string[], b: string[]): number {
  return a.reduce((diffs, v, i) => (diffs += v !== b[i] ? 1 : 0), 0)
}

function findSymmetryInLines(
  lines: string[][],
  targetSmudges: number,
  multiplier: number
): number {
  for (let i = 1; i < lines.length; i++) {
    let totalNumberOfDifferences = 0
    for (
      let j = 1;
      j <= Math.min(i, lines.length - i) &&
      totalNumberOfDifferences <= targetSmudges;
      j++
    ) {
      totalNumberOfDifferences += countDiffs(lines[i - j], lines[i + j - 1])
    }
    if (totalNumberOfDifferences === targetSmudges) {
      return i * multiplier
    }
  }

  return NaN
}

function findSymmetry(input: string[], targetSmudges: number): number {
  const symmetryRow = findSymmetryInLines(
    input.map((l) => l.split('')),
    targetSmudges,
    100
  )

  return isNaN(symmetryRow)
    ? findSymmetryInLines(
        input[0].split('').map((_, i) => input.map((l) => l[i])),
        targetSmudges,
        1
      )
    : symmetryRow
}

function solve(input: string[][], targetSmudges: number): number {
  return sum(input.map((i) => findSymmetry(i, targetSmudges)))
}

const TEST_INPUT = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`
  .split('\n\n')
  .map((x) => x.split('\n'))

const INPUT = fs
  .readFileSync('src/2023/13.input', 'utf-8')
  .trimEnd()
  .split('\n\n')
  .map((x) => x.split('\n'))

console.log('Test input')
console.log('Part 1:', solve(TEST_INPUT, 0))
console.log('Part 2:', solve(TEST_INPUT, 1))

console.log('Real input')
console.log('Part 1:', solve(INPUT, 0))
console.log('Part 2:', solve(INPUT, 1))
