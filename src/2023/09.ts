import { sum } from '../utils/sum'
import { readInput } from '../utils/readInput'

function deltas(a: number[]) {
  return a.map((v, i) => (a[i + 1] || 0) - v).slice(0, -1)
}

function solve(input: string[]): number[] {
  const mappings = input.map((line) => {
    let values = line.split(' ').map((n) => parseInt(n))
    const firstValues = []
    const lastValues = []

    while (values.length > 1) {
      firstValues.push(values[0])
      lastValues.push(values.at(-1)!)
      values = deltas(values)
    }

    return [
      firstValues.reverse().reduce((total, current) => current - total, 0),
      sum(lastValues),
    ]
  })

  return [sum(mappings.map((m) => m[0])), sum(mappings.map((m) => m[1]))]
}

const TEST_INPUT = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`.split('\n')

const INPUT = readInput('src/2023/09.input')

console.log('Test input')
console.log(solve(TEST_INPUT))

console.log('Real input')
console.log(solve(INPUT))
