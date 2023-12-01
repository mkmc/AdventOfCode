import { readInput } from '../utils/readInput'

const INPUT = readInput('2021/02.input')

const commands = INPUT.map((i) => {
  const splitInput = i.split(' ')
  return {
    command: splitInput[0],
    value: parseInt(splitInput[1]),
  }
})

{
  let x = 0
  let y = 0

  commands.forEach((c) => {
    switch (c.command) {
      case 'forward':
        x += c.value
        break
      case 'down':
        y += c.value
        break
      case 'up':
        y -= c.value
        break
    }
  })

  console.log('part 1', x, y, x * y)
}

{
  let x = 0
  let y = 0
  let a = 0

  commands.forEach((c) => {
    switch (c.command) {
      case 'forward':
        x += c.value
        y += a * c.value
        break
      case 'down':
        a += c.value
        break
      case 'up':
        a -= c.value
        break
    }
  })

  console.log('part 2', x, y, x * y)
}
