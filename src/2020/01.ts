import { readInput } from '../utils/readInput'

const INPUT = readInput('01.input')
const parsedInput = INPUT.map(s => parseInt(s))

console.log("PART – 1")

parsedInput.forEach(a => {
  const b = 2020 - a

  if (parsedInput.includes(b)) {
    console.log(a, b, a*b)
  }
})

console.log("PART – 2")

parsedInput.forEach(x => {
  parsedInput.forEach(y => {
    if (x !== y) {
      const z = 2020-x-y
      if (parsedInput.includes(z)) {
        console.log(x, y, z, x*y*z)
      }
    }
  })
})
