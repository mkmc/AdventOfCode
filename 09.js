const INPUT = require('./readInput')('09.input')

const PREAMBLE_SIZE = 25

const input = INPUT.map(s => parseInt(s))
const preamble = input.slice(0, PREAMBLE_SIZE)

const invalidNumber = findInvalid()

for (let i = 0; i < input.length; i++) {
  let sum = 0
  let minNumber = Infinity
  let maxNumber = 0
  for (let j = i; sum < invalidNumber; j++) {
    sum += input[j]

    minNumber = Math.min(minNumber, input[j])
    maxNumber = Math.max(maxNumber, input[j])
  }

  if (sum === invalidNumber) {
    console.log(minNumber, maxNumber, minNumber+maxNumber)
  }
}

function findInvalid() {
  for (let i = PREAMBLE_SIZE; i < input.length; i++) {
    const currentNumber = input[i]

    if (!isValid(currentNumber)) {
      return currentNumber
    }

    preamble.shift()
    preamble.push(currentNumber)
  }
}

function isValid(number) {
  for (let a = 0; a < preamble.length; a++) {
    for (let b = a + 1; b < preamble.length; b++) {
      if (preamble[a] + preamble[b] === number) {
        return true
      }
    }
  }

  return false
}
