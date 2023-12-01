import { readInput } from '../utils/readInput'

const DIGIT_MAPPING: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

function getCalibrationValuePart1(line: string): number {
  const firstDigit = line.match(/\d/)
  const lastDigit = line.match(/\d(?=[^\d]*$)/)

  if (!firstDigit || !lastDigit) {
    throw Error('Could not find digits')
  }

  return parseInt(`${firstDigit}${lastDigit}`)
}

function getMatchesPart2(line: string): string[] {
  const regexForDigits =
    /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g

  return Array.from(line.matchAll(regexForDigits), (v) => v[1])
}

function getCalibrationValuePart2(line: string): number {
  const matches = getMatchesPart2(line)
  if (!matches || !matches.length) {
    throw Error('Could not find sufficient digits')
  }

  const firstMatch = matches[0]
  const lastMatch = matches[matches.length - 1]

  const firstDigit = isNaN(parseInt(firstMatch))
    ? DIGIT_MAPPING[firstMatch]
    : parseInt(firstMatch)
  const lastDigit = isNaN(parseInt(lastMatch))
    ? DIGIT_MAPPING[lastMatch]
    : parseInt(lastMatch)

  return parseInt(`${firstDigit}${lastDigit}`)
}

function sum(values: number[]): number {
  return values.reduce((total, v) => total + v, 0)
}

function solvePart1(input: string[]): number {
  return sum(input.map(getCalibrationValuePart1))
}

function solvePart2(input: string[]): number {
  return sum(input.map(getCalibrationValuePart2))
}

const TEST_INPUT_PART_1 = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`.split('\n')

const TEST_INPUT_PART_2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`.split('\n')

const INPUT = readInput('src/2023/01.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT_PART_1))
console.log('Part 2:', solvePart2(TEST_INPUT_PART_2))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
