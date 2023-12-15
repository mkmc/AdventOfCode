import { sum } from '../utils/sum'
import { readInput } from '../utils/readInput'

function hash(input: string): number {
  let current = 0

  for (let i = 0; i < input.length; i++) {
    current += input.charCodeAt(i)
    current *= 17
    current %= 256
  }

  return current
}

function solvePart1(input: string): number {
  return sum(input.split(',').map((s) => hash(s)))
}

function solvePart2(input: string): number {
  const boxes: { label: string; focalLength: number }[][] = Array.from(
    { length: 256 },
    () => []
  )

  input.split(',').forEach((instruction) => {
    const [label, remainder] = instruction.split(/=|-/)
    const hashValue = hash(label)

    if (instruction.includes('-')) {
      boxes[hashValue] = boxes[hashValue].filter((l) => l.label !== label)
    } else {
      const focalLength = parseInt(remainder)
      const existingLens = boxes[hashValue].find((lens) => lens.label === label)

      if (existingLens) {
        existingLens.focalLength = focalLength
      } else {
        boxes[hashValue].push({ label, focalLength })
      }
    }
  })

  return boxes.reduce(
    (boxSum, box, boxNumber) =>
      boxSum +
      box.reduce(
        (lensSum, lens, lensNumber) =>
          lensSum + (1 + boxNumber) * (lensNumber + 1) * lens.focalLength,
        0
      ),
    0
  )
}

const TEST_INPUT = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`

const INPUT = readInput('src/2023/15.input').join('')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
