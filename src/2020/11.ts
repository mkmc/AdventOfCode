import { readInput } from '../utils/readInput'

const enum TileType { FLOOR = '.', EMPTY = 'L', OCCUPIED = '#' }
type NeighborFunction = (layout: TileType[][], x: number, y: number) => TileType[]

const DIRECTIONS = [
  { x: -1, y: -1 },
  { x:  0, y: -1 },
  { x:  1, y: -1 },
  { x: -1, y:  0 },
  { x:  1, y:  0 },
  { x: -1, y:  1 },
  { x:  0, y:  1 },
  { x:  1, y:  1 },
]

run()

function run() {
  const layout = readInput('11.input').map(line => {
    return line.split('').map(s => {
      switch (s) {
        case '.':
          return TileType.FLOOR
        case 'L':
          return TileType.EMPTY
        case '#':
          return TileType.OCCUPIED
        default:
          throw new Error('Unexcpected input')
      }
    })
  })

  console.log('PART 1')
  const result1 = simulate(layout, 4, getNeighbors)
  console.log(result1.map(l => l.join('')))
  console.log(([] as TileType[]).concat(...result1).filter(t => t === TileType.OCCUPIED).length)

  console.log('PART 2')
  const result2 = simulate(layout, 5, getVisualNeighbors)
  console.log(result2.map(l => l.join(' ')))
  console.log(([] as TileType[]).concat(...result2).filter(t => t === TileType.OCCUPIED).length)
}

function simulate(
  layout: TileType[][],
  neighborLimit: number,
  neighborFunction: NeighborFunction
) {
  let hasChanges = true
  while (hasChanges) {
    [layout, hasChanges] = update(layout, neighborLimit, neighborFunction)
  }
  return layout
}

function update(
  layout: TileType[][],
  neighborLimit: number,
  neighborFunction: NeighborFunction
): [TileType[][], boolean] {
  let hasChanges = false
  const newLayout: TileType[][] = []

  for (let y = 0; y < layout.length; y++) {
    const currentRow: TileType[] = []
    newLayout.push(currentRow)

    for (let x = 0; x < layout[0].length; x++) {
      const tileType = layout[y][x]

      switch (tileType) {
        case TileType.FLOOR:
          currentRow.push(TileType.FLOOR)
          break
        case TileType.EMPTY:
          const neighbors = neighborFunction(layout, x, y)
          if (!neighbors.includes(TileType.OCCUPIED)) {
            currentRow.push(TileType.OCCUPIED)
            hasChanges = true
          } else {
            currentRow.push(TileType.EMPTY)
          }
          break
        case TileType.OCCUPIED: {
          const neighbors = neighborFunction(layout, x, y)
          if (neighbors.filter(t => t === TileType.OCCUPIED).length >= neighborLimit) {
            currentRow.push(TileType.EMPTY)
            hasChanges = true
          } else {
            currentRow.push(TileType.OCCUPIED)
          }
          break
        }
      }
    }
  }

  return [newLayout, hasChanges]
}

function getNeighbors(layout: TileType[][], x: number, y: number): TileType[] {
  const neighbors: TileType[] = []

  for (let ix = x-1; ix <= x+1; ix++) {
    for (let iy = y-1; iy <= y+1; iy++) {
      if (ix !== x || iy !== y) {
        neighbors.push(layout[iy]?.[ix])
      }
    }
  }

  return neighbors
}

function getVisualNeighbors(layout: TileType[][], x: number, y: number): TileType[] {
  const neighbors: TileType[] = []

  for (const direction of DIRECTIONS) {
    for (
      let ix = x + direction.x, iy = y + direction.y;
      ix >= 0 && ix < layout[0].length && iy >= 0 && iy < layout.length;
      ix += direction.x, iy += direction.y
    ) {
      const tile = layout[iy][ix]
      if (tile !== TileType.FLOOR) {
        neighbors.push(tile)
        break
      }
    }
  }

  return neighbors
}
