import { sum } from '../utils/sum'
import { readInput } from '../utils/readInput'

type Point = { x: number; y: number }

type Direction = 'U' | 'D' | 'R' | 'L'

const DIRECTIONS: { [x in Direction]: Point } = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
}

type Ray = { position: Point; direction: Direction }

function add(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y }
}

function raytrace(input: string[], startingRay: Ray): number {
  const mirrorMap = input.map((l) => l.split(''))
  const directionMap: Direction[][][] = mirrorMap.map((l) => l.map(() => []))

  let currentRays: Ray[] = [startingRay]

  for (
    let currentRay = currentRays.pop();
    currentRay;
    currentRay = currentRays.pop()
  ) {
    const nextPoint = add(currentRay.position, DIRECTIONS[currentRay.direction])
    if (
      nextPoint.x < 0 ||
      nextPoint.y < 0 ||
      nextPoint.y === mirrorMap.length ||
      nextPoint.x === mirrorMap[0].length
    ) {
      continue
    }

    const mirror = mirrorMap[nextPoint.y][nextPoint.x]
    const directions = directionMap[nextPoint.y][nextPoint.x]

    const applyDirection = (direction: Direction) => {
      if (!directions.includes(direction)) {
        directionMap[nextPoint.y][nextPoint.x] = [...directions, direction]
        currentRays.push({
          position: nextPoint,
          direction: direction,
        })
      }
    }

    if (mirror === '.') {
      applyDirection(currentRay.direction)
    } else if (mirror === '|') {
      if (currentRay.direction === 'U' || currentRay.direction === 'D') {
        applyDirection(currentRay.direction)
      } else {
        applyDirection('U')
        applyDirection('D')
      }
    } else if (mirror === '-') {
      if (currentRay.direction === 'R' || currentRay.direction === 'L') {
        applyDirection(currentRay.direction)
      } else {
        applyDirection('L')
        applyDirection('R')
      }
    } else if (mirror === '/') {
      if (currentRay.direction === 'L') {
        applyDirection('D')
      } else if (currentRay.direction === 'R') {
        applyDirection('U')
      } else if (currentRay.direction === 'U') {
        applyDirection('R')
      } else if (currentRay.direction === 'D') {
        applyDirection('L')
      }
    } else if (mirror === '\\') {
      if (currentRay.direction === 'L') {
        applyDirection('U')
      } else if (currentRay.direction === 'R') {
        applyDirection('D')
      } else if (currentRay.direction === 'U') {
        applyDirection('L')
      } else if (currentRay.direction === 'D') {
        applyDirection('R')
      }
    }
  }

  return sum(directionMap.map((l) => l.filter((v) => v.length > 0).length))
}

function solvePart1(input: string[]): number {
  return raytrace(input, {
    position: { x: -1, y: 0 },
    direction: 'R',
  })
}

function solvePart2(input: string[]): number {
  let best = 0

  for (let y = 0; y < input.length; y++) {
    best = Math.max(
      best,
      raytrace(input, { position: { x: -1, y }, direction: 'R' }),
      raytrace(input, { position: { x: input[0].length, y }, direction: 'L' })
    )
  }

  for (let x = 0; x < input[0].length; x++) {
    best = Math.max(
      best,
      raytrace(input, { position: { x, y: -1 }, direction: 'D' }),
      raytrace(input, { position: { x, y: input.length }, direction: 'U' })
    )
  }

  return best
}

const TEST_INPUT = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`.split('\n')

const INPUT = readInput('src/2023/16.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
