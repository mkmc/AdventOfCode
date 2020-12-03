const INPUT = require('./readInput')('03.input')

const slopes = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2],
]
const treeCounts = slopes.map(checkSlope)
const product = treeCounts.reduce((product, currentValue) => product * currentValue, 1)

console.log(product)

function checkSlope(slope) {
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
