import { readInput } from '../utils/readInput'
import { sum } from '../utils/sum'

type Number = {
  y: number
  x0: number
  x1: number
  v: number
}

type Gear = {
  x: number
  y: number
}

function hasAdjacentSymbol(input: string[], n: Number): boolean {
  for (
    let y = Math.max(0, n.y - 1);
    y <= Math.min(n.y + 1, input.length - 1);
    y++
  ) {
    const line = input[y]

    for (
      let x = Math.max(n.x0 - 1, 0);
      x <= Math.min(n.x1 + 1, line.length - 1);
      x++
    ) {
      if (y === n.y && x >= n.x0 && x <= n.x1) continue

      const char = line[x]
      if (isNaN(parseInt(char)) && char !== '.') {
        return true
      }
    }
  }

  return false
}

function findNumbers(schematic: string[]): Number[] {
  const numbers: Number[] = []

  for (let y = 0; y < schematic.length; y++) {
    const line = schematic[y]

    let currentNumberString = ''
    let currentStartCol = -1

    for (let x = 0; x < line.length; x++) {
      const char = line[x]
      if (!isNaN(parseInt(char))) {
        if (currentNumberString === '') {
          currentStartCol = x
        }

        currentNumberString += char
      }

      if (currentNumberString !== '') {
        if (isNaN(parseInt(char))) {
          numbers.push({
            y,
            x0: currentStartCol,
            x1: x - 1,
            v: parseInt(currentNumberString),
          })
          currentNumberString = ''
          currentStartCol = -1
        } else if (x === line.length - 1) {
          numbers.push({
            y,
            x0: currentStartCol,
            x1: x,
            v: parseInt(currentNumberString),
          })
          currentNumberString = ''
          currentStartCol = -1
        }
      }
    }
  }

  return numbers
}

function findGears(input: string[]): Gear[] {
  const gears: Gear[] = []

  for (let y = 0; y < input.length; y++) {
    const line = input[y]

    for (let x = 0; x < line.length; x++) {
      if (line[x] === '*') {
        gears.push({ x, y })
      }
    }
  }

  return gears
}

function solvePart1(input: string[]): number {
  return sum(
    findNumbers(input)
      .filter((n) => hasAdjacentSymbol(input, n))
      .map((n) => n.v)
  )
}

function solvePart2(input: string[]): number {
  const numbers = findNumbers(input)

  return sum(
    findGears(input).map((gear) => {
      const neighborNumbers = numbers
        .filter((n) => Math.abs(n.y - gear.y) <= 1)
        .filter((n) => n.x0 <= gear.x + 1 && n.x1 >= gear.x - 1)

      if (neighborNumbers.length === 2) {
        return neighborNumbers[0].v * neighborNumbers[1].v
      } else {
        return 0
      }
    })
  )
}

const TEST_INPUT = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split('\n')

const INPUT = readInput('src/2023/03.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
