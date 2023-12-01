import { readInput } from '../utils/readInput'

const INPUT = readInput('2021/01.input').map((i) => parseInt(i))

let count1 = 0
for (let i = 1; i < INPUT.length; i++) {
  count1 += INPUT[i] > INPUT[i - 1] ? 1 : 0
}

console.log('Part 1', count1)

const windows = new Array(INPUT.length - 2).fill(0).map(
  (_, i) => INPUT[i] + INPUT[i + 1] + INPUT[i + 2]
)

let count2 = 0
for (let i = 1; i < windows.length; i++) {
  count2 += windows[i] > windows[i - 1] ? 1 : 0
}

console.log('Part 2', count2)
