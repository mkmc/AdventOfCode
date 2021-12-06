import { readInput } from './utils/readInput'

const INPUT = readInput('2021/06.input')

const fish = INPUT[0].split(',').map((i) => parseInt(i))

for (let day = 0; day < 80; day++) {
  const count = fish.length
  for (let i = 0; i < count; i++) {
    if (fish[i] === 0) {
      fish[i] = 6
      fish.push(8)
    } else {
      fish[i]--
    }
  }
}

console.log('part 1', fish.length)

const fishPerDay: { [days: number]: number } = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
}

INPUT[0]
  .split(',')
  .map((i) => parseInt(i))
  .forEach((f) => fishPerDay[f]++)

for (let day = 0; day < 256; day++) {
  let newFishCount = fishPerDay[0]
  for (let i = 1; i <= 8; i++) {
    fishPerDay[i - 1] = fishPerDay[i]
  }
  fishPerDay[6] += newFishCount
  fishPerDay[8] = newFishCount
}

console.log(
  'part 2',
  Object.values(fishPerDay).reduce((sum, v) => sum + v)
)
