import { readInput } from '../utils/readInput'

const INPUT = readInput('2021/05.input')

type Point = { x: number; y: number }
type Line = { start: Point; end: Point }

const lines: Line[] = INPUT.map((lineInput) => {
  const [start, end] = lineInput.split(' -> ').map((p) => {
    const [x, y] = p.split(',').map((i) => parseInt(i))
    return { x, y }
  })
  return { start, end }
})

const max: Point = { x: 0, y: 0 }
lines.forEach((line) => {
  max.x = Math.max(line.start.x, line.end.x, max.x)
  max.y = Math.max(line.start.y, line.end.y, max.y)
})

{
  const grid: number[][] = []
  for (let i = 0; i < max.y + 1; i++) {
    grid.push(new Array<number>(max.x + 1).fill(0))
  }

  lines.forEach((line) => {
    if (line.start.x === line.end.x) {
      for (
        let y = Math.min(line.start.y, line.end.y);
        y <= Math.max(line.start.y, line.end.y);
        y++
      ) {
        grid[y][line.start.x]++
      }
    } else if (line.start.y === line.end.y) {
      for (
        let x = Math.min(line.start.x, line.end.x);
        x <= Math.max(line.start.x, line.end.x);
        x++
      ) {
        grid[line.start.y][x]++
      }
    }
  })

  console.log(
    'part 1',
    grid.reduce((sum, row) => sum + row.filter((i) => i >= 2).length, 0)
  )
}

{
  const grid: number[][] = []
  for (let i = 0; i < max.y + 1; i++) {
    grid.push(new Array<number>(max.x + 1).fill(0))
  }

  lines.forEach((line) => {
    let x = line.start.x
    let y = line.start.y

    while (true) {
      grid[y][x]++

      if (x === line.end.x && y === line.end.y) {
        break
      }

      x += Math.sign(line.end.x - line.start.x)
      y += Math.sign(line.end.y - line.start.y)
    }
  })

  console.log(
    'part 2',
    grid.reduce((sum, row) => sum + row.filter((i) => i >= 2).length, 0)
  )
}
