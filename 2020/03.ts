import { readInput } from './utils/readInput'

const INPUT = readInput('03.input')

const slopes: [number, number][] = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2],
]
const treeCounts = slopes.map(checkSlope)
const product = treeCounts.reduce((product, currentValue) => product * currentValue, 1)

console.log(product)

function checkSlope(slope: [number, number]) {
  let currentX = 0
  let treeCount = 0

  for (let currentY = 0; currentY < INPUT.length; currentY += slope[1]) {
    const line = INPUT[currentY]
    if (line[currentX] === '#') {
      treeCount++
    }

    currentX = (currentX + slope[0]) % line.length
  }

  return treeCount
}
