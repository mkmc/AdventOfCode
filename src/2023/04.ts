import { sum } from '../utils/sum'
import { readInput } from '../utils/readInput'

type Card = {
  winningNumbers: number[]
  numbersYouHave: number[]
}

function parseNumbers(line: string): number[] {
  return line
    .split(' ')
    .filter(Boolean)
    .map((s) => parseInt(s))
}

function parseCard(line: string): Card {
  const [_, numbersPart] = line.split(': ')
  const [winningNumbersPart, numbersYouHavePart] = numbersPart.split(' | ')

  return {
    winningNumbers: parseNumbers(winningNumbersPart),
    numbersYouHave: parseNumbers(numbersYouHavePart),
  }
}

function countPoints(card: Card): number {
  return card.winningNumbers.filter((n) => card.numbersYouHave.includes(n))
    .length
}

function applyScore(count: number): number {
  return count ? Math.pow(2, count - 1) : 0
}

function solvePart1(input: string[]): number {
  return sum(input.map(parseCard).map(countPoints).map(applyScore))
}

function solvePart2(input: string[]): number {
  const cardCount = new Array<number>(input.length).fill(1)

  input
    .map(parseCard)
    .map(countPoints)
    .forEach((w, i) => {
      for (let j = i + 1; j <= i + w; j++) {
        cardCount[j] += cardCount[i]
      }
    })

  return sum(cardCount)
}

const TEST_INPUT = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split('\n')

const INPUT = readInput('src/2023/04.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
