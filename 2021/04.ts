import { readInput } from './utils/readInput'

const INPUT = readInput('2021/04.input')

const drawnNumbers = INPUT[0].split(',').map((i) => parseInt(i))

const bingoFields: (number | 'X')[][][] = []
for (let i = 2; i < INPUT.length; i += 6) {
  const bingoField: number[][] = []
  for (let j = 0; j < 5; j++) {
    bingoField.push(
      INPUT[i + j]
        .split(' ')
        .filter((i) => i.trim() !== '')
        .map((i) => parseInt(i))
    )
  }
  bingoFields.push(bingoField)
}

function checkNumber(
  bingoField: (number | 'X')[][],
  numberToCheck: number
): void {
  bingoField.forEach((row) =>
    row.forEach((n, i) => {
      if (n === numberToCheck) {
        row[i] = 'X'
      }
    })
  )
}

function checkWon(bingoField: (number | 'X')[][]): boolean {
  return (
    bingoField.some((row) => row.every((e) => e === 'X')) ||
    [0, 1, 2, 3, 4].some((c) => bingoField.every((row) => row[c] === 'X'))
  )
}

const hasWon: boolean[] = new Array(bingoFields.length).fill(false)

let winner: (number | 'X')[][] | undefined = undefined
let loser: (number | 'X')[][] | undefined = undefined
let winningNumber: number | undefined = undefined
let nextNumber: number | undefined = undefined
while (!loser) {
  nextNumber = drawnNumbers.shift()

  if (nextNumber === undefined) {
    break
  }

  for (let i = 0; i < bingoFields.length; i++) {
    if (hasWon[i]) {
      continue
    }

    const bingoField = bingoFields[i]

    checkNumber(bingoField, nextNumber)
    if (checkWon(bingoField)) {
      hasWon[i] = true

      if (!winner) {
        winner = bingoField
        winningNumber = nextNumber
      }

      if (hasWon.every((i) => i)) {
        loser = bingoField
      }
    }
  }
}

console.log(
  'part 1',
  winner &&
    winner.reduce(
      (sum, row) =>
        sum + row.reduce<number>((sum, e) => sum + (e === 'X' ? 0 : e), 0),
      0
    ) * (winningNumber ?? -1)
)

console.log(
  'part 2',
  loser &&
    loser.reduce(
      (sum, row) =>
        sum + row.reduce<number>((sum, e) => sum + (e === 'X' ? 0 : e), 0),
      0
    ) * (nextNumber ?? -1)
)
