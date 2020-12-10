import { readInput } from './utils/readInput'

const INPUT = readInput('10.input')

const parsedInput = INPUT.map(s => parseInt(s)).sort((a,b) => a-b)

const differences: Record<number, number> = {
  1: 0,
  2: 0,
  3: 1,
}

for (let i = 0; i < parsedInput.length; i++) {
  differences[parsedInput[i] - (parsedInput[i-1] || 0)]++
}

console.log('PART – 1')
console.log(differences, differences[1] * differences[3])

console.log('PART – 2')

const extendedInput = [0,...parsedInput, parsedInput[parsedInput.length] + 3]
const counter: Record<number, number> = {0: 1}

for (let i = 0; i <= extendedInput.length; i++) {
  let j = i + 1
  while (extendedInput[j] <= extendedInput[i] + 3) {
    counter[j] = (counter[j] || 0) + counter[i]
    j++
  }
}

console.log(counter)
