import { readInput } from '../utils/readInput'

const INPUT = readInput('2021/07.input')

const positions = INPUT[0]
  .split(',')
  .map((i) => parseInt(i))
  .sort((a, b) => b - a)

const median =
  (positions[positions.length / 2 - 1] + positions[positions.length / 2]) / 2

const sum = positions.reduce((sum, p) => sum + p, 0)
const mean = Math.round(sum / positions.length)
const meanM1 = mean - 1
const meanP1 = mean + 1

const fuelCost1 = positions.reduce((sum, i) => sum + Math.abs(i - median), 0)

const fuelCost0 = positions.reduce((sum, i) => {
  const n = Math.abs(mean - i)
  return sum + (n * (n + 1)) / 2
}, 0)

const fuelCostM1 = positions.reduce((sum, i) => {
  const n = Math.abs(meanM1 - i)
  return sum + (n * (n + 1)) / 2
}, 0)

const fuelCostP1 = positions.reduce((sum, i) => {
  const n = Math.abs(meanP1 - i)
  return sum + (n * (n + 1)) / 2
}, 0)

console.log('part 1', median, fuelCost1)
console.log('part 1', mean, fuelCost0, fuelCostM1, fuelCostP1)

// don't judge me 🙈
