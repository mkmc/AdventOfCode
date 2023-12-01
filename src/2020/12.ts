import { readInput } from '../utils/readInput'

type Orientation = 'N' | 'E' | 'S' | 'W'
type Rotation = 'L' | 'R'
type InstructionType = Orientation | Rotation | 'F'
interface Instruction { type: InstructionType, value: number }

const MOVE_DIRECTION: { [x in Orientation]: {x: number, y: number}} = {
  'N': {x: 0, y: 1},
  'E': {x: 1, y: 0},
  'S': {x: 0, y: -1},
  'W': {x: -1, y: 0},
}

run()

function run() {
  const INPUT = readInput('12.input')

  console.log('PART – 1')
  part1(INPUT)

  console.log('PART – 2')
  part2(INPUT)
}

function part1(input: string[]) {
  const ship: {x: number, y: number, orientation: Orientation} = { x: 0, y: 0, orientation: 'E' }

  input.forEach(line => {
    const instruction = parseInstruction(line)

    switch (instruction.type) {
      case 'N':
      case 'E':
      case 'S':
      case 'W': {
        const movement = MOVE_DIRECTION[instruction.type]
        ship.x += movement.x * instruction.value
        ship.y += movement.y * instruction.value
        break
      }
      case 'F': {
        const movement = MOVE_DIRECTION[ship.orientation]
        ship.x += movement.x * instruction.value
        ship.y += movement.y * instruction.value
        break
      }
      case 'L':
      case 'R':
        ship.orientation = rotate(ship.orientation, instruction.type, instruction.value)
        break
    }
  })

  console.log(ship)
}

function part2(input: string[]) {
  const ship = { x: 0, y: 0 }
  let waypoint = { x: 10, y: 1 }

  input.forEach(line => {
    const instruction = parseInstruction(line)

    switch (instruction.type) {
      case 'N':
      case 'E':
      case 'S':
      case 'W': {
        const movement = MOVE_DIRECTION[instruction.type]
        waypoint.x += movement.x * instruction.value
        waypoint.y += movement.y * instruction.value
        break
      }
      case 'F': {
        ship.x += waypoint.x * instruction.value
        ship.y += waypoint.y * instruction.value
        break
      }
      case 'L':
      case 'R':
        waypoint = rotatePosition(waypoint, instruction.type, instruction.value)
        break
    }

  })

  console.log(ship)
}

function parseInstruction(line: string): Instruction {
  const instructionString = line[0]
  const valueString = line.slice(1, line.length)

  return {
    type: instructionString as InstructionType,
    value: parseInt(valueString)
  }
}


function rotate(orientation: Orientation, direction: Rotation, amount: number): Orientation {
  let currentOrientation = orientation
  for (let i = 0; i < amount; i += 90) {
    switch (currentOrientation) {
      case 'E':
        currentOrientation = direction === 'L' ? 'N' : 'S'
        break
      case 'S':
        currentOrientation = direction === 'L' ? 'E' : 'W'
        break
      case 'W':
        currentOrientation = direction === 'L' ? 'S' : 'N'
        break
      case 'N':
        currentOrientation = direction === 'L' ? 'W' : 'E'
        break
    }
  }
  return currentOrientation
}

function rotatePosition(waypoint: {x: number, y: number}, direction: Rotation, amount: number): {x: number, y: number} {
  let currentWaypoint = {...waypoint}

  for (let i = 0; i < amount; i += 90) {
    switch (direction) {
      case 'L':
        currentWaypoint = { x: -currentWaypoint.y, y: currentWaypoint.x }
        break
      case 'R':
        currentWaypoint = { x: currentWaypoint.y, y: -currentWaypoint.x}
        break
    }
  }

  return currentWaypoint
}
