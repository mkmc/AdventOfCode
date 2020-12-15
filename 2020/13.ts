import { readInput } from './utils/readInput'

interface Busline {
  index: number
  interval: number
}

run()

function run() {
  const INPUT = readInput('13.input')

  const earliestTime = parseInt(INPUT[0])
  const buslines: Busline[] = INPUT[1].split(',').map(
    (s, index) => ({ index, interval: parseInt(s)}
  ))

  console.log('PART – 1')
  part1(earliestTime, buslines)

  console.log('PART – 2')
  part2(buslines)
}

function part1(earliestTime: number, buslines: Busline[]) {
  let bestTime = Infinity
  let bestInterval: number = -1

  buslines.forEach(busline => {
    const interval = busline.interval
    if (!isNaN(interval)) {
      const possibleTime = Math.ceil(earliestTime / interval) * interval
      if (bestTime > possibleTime) {
        bestTime = possibleTime
        bestInterval = interval
      }
    }
  })

  console.log(bestTime, bestTime-earliestTime, bestInterval * (bestTime-earliestTime))
}

function part2(buslines: Busline[]) {
  buslines = buslines.filter(l => !isNaN(l.interval)).sort((a,b) => b.interval - a.interval)

  const [biggestIntervalLine, ...otherLines] = buslines

  for (let i = biggestIntervalLine.interval;; i += biggestIntervalLine.interval) {
    const zeroPoint = i - biggestIntervalLine.index

    let allValid = true
    for (const otherLine of otherLines) {
      if (!Number.isInteger((zeroPoint + otherLine.index) / otherLine.interval)) {
        allValid = false
        break
      }
    }

    if (allValid) {
      console.log(zeroPoint)
      break
    }
  }
}
