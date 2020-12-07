const INPUT = require('./readInput')('06.input')

{
  let currentGroup = new Set()
  const groups = [currentGroup]

  INPUT.forEach(line => {
    if (line === '') {
      currentGroup = new Set()
      groups.push(currentGroup)
    } else {
      [...line].forEach(letter => {
        currentGroup.add(letter)
      })
    }
  })

  const answerCounts = groups.map(group => group.size)
  const sum = answerCounts.reduce((sum, count) => sum + count, 0)

  console.log('Part 1:', sum)
}

{
  let currentGroup = [...'abcdefghijklmnopqrstuvwxyz']
  const groups = [currentGroup]

  INPUT.forEach(line => {
    if (line === '') {
      currentGroup = [...'abcdefghijklmnopqrstuvwxyz']
      groups.push(currentGroup)
    } else {
      currentGroup.splice(
        0,
        currentGroup.length,
        ...currentGroup.filter(letter => line.includes(letter))
      )
    }
  })

  const answerCounts = groups.map(group => group.length)
  const sum = answerCounts.reduce((sum, count) => sum + count, 0)

  console.log('Part 2:', sum)
}
