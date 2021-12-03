import { readInput } from './utils/readInput'

type Bit = '0' | '1'

const INPUT = readInput('2021/03.input').map((i) => [...i]) as Bit[][]

function getMostCommonBit(input: Bit[][], index: number): Bit | undefined {
  const count1 = input.map((j) => j[index]).filter((j) => j === '1').length

  return count1 > input.length / 2
    ? '1'
    : count1 < input.length / 2
    ? '0'
    : undefined
}

{
  const gammaBinary = [...INPUT[0]].map((_, i) => getMostCommonBit(INPUT, i))

  const epsilonBinary = gammaBinary.map((i) => (i === '0' ? '1' : '0'))

  const gamma = parseInt(gammaBinary.join(''), 2)
  const epsilon = parseInt(epsilonBinary.join(''), 2)

  console.log('part 1', gamma, epsilon, gamma * epsilon)
}

{
  function filterOxy(): Bit[][] {
    let values = [...INPUT]

    for (let i = 0; values.length > 1 && i < INPUT[0].length; i++) {
      const bit = getMostCommonBit(values, i)
      values = values.filter((j) => j[i] === (bit ?? '1'))
    }

    return values
  }

  function filterCO2(): Bit[][] {
    let values = [...INPUT]

    for (let i = 0; values.length > 1 && i < INPUT[0].length; i++) {
      const bit = getMostCommonBit(values, i)
      values = values.filter((j) => j[i] !== (bit ?? '1'))
    }

    return values
  }

  const oxy = parseInt(filterOxy()[0].join(''), 2)
  const co2 = parseInt(filterCO2()[0].join(''), 2)

  console.log('part 2', oxy, co2, oxy * co2)
}
