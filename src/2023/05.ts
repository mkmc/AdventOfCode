import { readInput } from '../utils/readInput'

type Map = {
  destination: number
  start: number
  end: number
}[]

type Range = {
  start: number
  end: number
}

function parseInput(input: string[]): { seeds: number[]; maps: Map[] } {
  const seeds = input[0]
    .split(': ')[1]
    .split(' ')
    .map((n) => parseInt(n))

  const maps: Map[] = [[]]

  for (let i = 3; i < input.length; i++) {
    const line = input[i]

    if (line === '') {
      i++
      maps.push([])
    } else {
      const [destination, source, length] = line
        .split(' ')
        .map((n) => parseInt(n))
      maps[maps.length - 1].push({
        destination,
        start: source,
        end: source + length - 1,
      })
    }
  }

  return { seeds, maps }
}

function mapSeed(seed: number, maps: Map[]): number {
  return maps.reduce((current, map) => {
    for (const mapping of map) {
      if (current >= mapping.start && current <= mapping.end) {
        return current - mapping.start + mapping.destination
      }
    }

    return current
  }, seed)
}

function mapSeedRange(range: Range, maps: Map[]) {
  return maps.reduce(
    (ranges, map) => {
      let rangesToMap = ranges
      const mappedRanges: Range[] = []
      for (const mapping of map) {
        const remainingRanges: Range[] = []
        while (rangesToMap.length) {
          const range = rangesToMap.shift()!

          if (range.start >= mapping.start && range.end <= mapping.end) {
            mappedRanges.push({
              start: range.start - mapping.start + mapping.destination,
              end: range.end - mapping.start + mapping.destination,
            })
          } else if (range.end < mapping.start || range.start > mapping.end) {
            remainingRanges.push(range)
          } else if (range.start < mapping.start && range.end > mapping.end) {
            mappedRanges.push({
              start: mapping.destination,
              end: mapping.destination + mapping.end - mapping.start,
            })
            remainingRanges.push(
              {
                start: range.start,
                end: mapping.start - 1,
              },
              {
                start: mapping.end + 1,
                end: range.end,
              }
            )
          } else if (range.start <= mapping.end && range.end > mapping.end) {
            mappedRanges.push({
              start: range.start - mapping.start + mapping.destination,
              end: mapping.destination + mapping.end - mapping.start,
            })
            remainingRanges.push({
              start: mapping.end + 1,
              end: range.end,
            })
          } else if (
            range.start < mapping.start &&
            range.end >= mapping.start
          ) {
            mappedRanges.push({
              start: mapping.destination,
              end: range.end - mapping.start + mapping.destination,
            })
            remainingRanges.push({
              start: range.start,
              end: mapping.start - 1,
            })
          } else {
            throw Error(`Unexpected case! range: ${range}, mapping: ${mapping}`)
          }
        }
        rangesToMap = remainingRanges
      }

      return [...mappedRanges, ...rangesToMap]
    },
    [range]
  )
}

function solvePart1(input: string[]): number {
  const { seeds, maps } = parseInput(input)
  const locations = seeds.map((s) => mapSeed(s, maps))

  return Math.min(...locations)
}

function solvePart2(input: string[]): number {
  const { seeds: seedsRanges, maps } = parseInput(input)

  let bestLocation = Infinity
  for (let i = 0; i < seedsRanges.length; i += 2) {
    const start = seedsRanges[i]
    const end = start + seedsRanges[i + 1] - 1

    bestLocation = Math.min(
      bestLocation,
      ...mapSeedRange({ start, end }, maps).map((s) => s.start)
    )
  }

  return bestLocation
}

const TEST_INPUT = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.split('\n')

const INPUT = readInput('src/2023/05.input')

console.log('Test input')
console.log('Part 1:', solvePart1(TEST_INPUT))
console.log('Part 2:', solvePart2(TEST_INPUT))

console.log('Real input')
console.log('Part 1:', solvePart1(INPUT))
console.log('Part 2:', solvePart2(INPUT))
