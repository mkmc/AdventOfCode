import { sum } from '../utils/sum'
import { readInput } from '../utils/readInput'

type Row = {
  arrangement: string
  groups: number[]
}

function parseRow(line: string): Row {
  const [arrangement, groupPart] = line.split(' ')

  return { arrangement, groups: groupPart.split(',').map((v) => parseInt(v)) }
}

function generatePermutations(arrangement: string): string[] {
  const firstQuestionMark = arrangement.indexOf('?')
  if (firstQuestionMark === -1) {
    return [arrangement]
  }

  const a =
    arrangement.slice(0, firstQuestionMark) +
    '.' +
    arrangement.slice(firstQuestionMark + 1)
  const b =
    arrangement.slice(0, firstQuestionMark) +
    '#' +
    arrangement.slice(firstQuestionMark + 1)

  return [...generatePermutations(a), ...generatePermutations(b)]
}

function solvePart1(input: string[]): number {
  const rows = input.map(parseRow)

  const possibleArragnements = rows.map((row) => {
    const permutations = generatePermutations(row.arrangement)

    return permutations.filter((permutation) => {
      const pGroups = permutation.split('.').filter((p) => p.length > 0)
      if (pGroups.length !== row.groups.length) {
        return false
      }
      for (let i = 0; i < row.groups.length; i++) {
        if (pGroups[i].length !== row.groups[i]) {
          return false
        }
      }
      return true
    }).length
  })

  return sum(possibleArragnements)
}

function solvePart2(input: string[]): number {
  input = input.map((l) => {
    const [a, b] = l.split(' ')
    return new Array(5).fill(a).join('?') + ' ' + new Array(5).fill(b).join(',')
  })

  console.log(input)

  return solvePart1(input)
}

const TEST_INPUT = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`.split('\n')

const INPUT = readInput('src/2023/12.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
// console.log('Part 2:', solvePart2(TEST_INPUT))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
// console.log('Part 2:', solvePart2(INPUT))
