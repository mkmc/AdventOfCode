const INPUT = require('./readInput')('05.input')

const seatIDs = INPUT.map(boardingPassCode => {
  let minRow = 0
  let maxRow = 127

  for (let i = 0; i < 7; i++) {
    const midRow = Math.floor((minRow+maxRow)/2)
    if (boardingPassCode[i] === 'F') {
      maxRow = midRow
    } else if (boardingPassCode[i] === 'B') {
      minRow = midRow + 1
    } else {
      console.error('Oops')
    }
  }

  let minColumn = 0
  let maxColumn = 7
  for (let i = 7; i < 10; i++) {
    const midColumn = Math.floor((minColumn+maxColumn)/2)
    if (boardingPassCode[i] === 'L') {
      maxColumn = midColumn
    } else if (boardingPassCode[i] === 'R') {
      minColumn = midColumn + 1
    } else {
      console.error('Oops')
    }
  }

  const seatID = minRow * 8 + minColumn
  return seatID
})

console.log('Part 1:', Math.max(...seatIDs))

seatIDs.sort((a,b) => a-b)

for (let i = 0; i < seatIDs.length - 1; i++) {
  if (seatIDs[i] + 1 !== seatIDs[i+1]) {
    console.log('Part 2:', seatIDs[i] + 1)
  }
}
