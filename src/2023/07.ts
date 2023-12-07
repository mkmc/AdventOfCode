import { sum } from '../utils/sum'
import { readInput } from '../utils/readInput'

const enum Type {
  FIVE_OF_A_KIND = 6,
  FOUR_OF_A_KIND = 5,
  FULL_HOUSE = 4,
  THREE_OF_A_KIND = 3,
  TWO_PAIR = 2,
  ONE_PAIR = 1,
  HIGH_CARD = 0,
}

const CardValue = {
  A: 15,
  K: 14,
  Q: 13,
  J: 12,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
}

const CardValueWithJokers = {
  A: 15,
  K: 14,
  Q: 13,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
}

type CardKind = keyof typeof CardValue

type Hand = {
  hand: string
  bid: number
  type: Type
}

function getTypeWithNoJoker(cardCounts: { [card: string]: number }): Type {
  switch (Object.keys(cardCounts).length) {
    case 1:
      return Type.FIVE_OF_A_KIND
    case 2:
      return Object.values(cardCounts).some((c) => c === 4)
        ? Type.FOUR_OF_A_KIND
        : Type.FULL_HOUSE
    case 3:
      return Object.values(cardCounts).some((c) => c === 3)
        ? Type.THREE_OF_A_KIND
        : Type.TWO_PAIR
    case 4:
      return Type.ONE_PAIR
    case 5:
    default:
      return Type.HIGH_CARD
  }
}

function getTypeWithOneJoker(cardCounts: { [card: string]: number }): Type {
  switch (Object.keys(cardCounts).length) {
    case 1:
      return Type.FIVE_OF_A_KIND
    case 2:
      return Object.values(cardCounts).some((c) => c === 3)
        ? Type.FOUR_OF_A_KIND
        : Type.FULL_HOUSE
    case 3:
      return Type.THREE_OF_A_KIND
    case 4:
    default:
      return Type.ONE_PAIR
  }
}

function getTypeWithTwoJokers(cardCounts: { [card: string]: number }): Type {
  switch (Object.keys(cardCounts).length) {
    case 1:
      return Type.FIVE_OF_A_KIND
    case 2:
      return Type.FOUR_OF_A_KIND
    case 3:
    default:
      return Type.THREE_OF_A_KIND
  }
}

function getTypeWithThreeJokers(cardCounts: { [card: string]: number }): Type {
  return Object.keys(cardCounts).length === 1
    ? Type.FIVE_OF_A_KIND
    : Type.FOUR_OF_A_KIND
}

function getHandType(hand: string, withJokers: boolean): Type {
  const cardCounts: { [card: string]: number } = {}

  hand.split('').forEach((card) => {
    cardCounts[card] = (cardCounts[card] ?? 0) + 1
  })

  if (!withJokers) {
    return getTypeWithNoJoker(cardCounts)
  } else {
    const jokerCount = cardCounts['J']
    delete cardCounts['J']

    switch (jokerCount) {
      case 5:
      case 4:
        return Type.FIVE_OF_A_KIND
      case 3:
        return getTypeWithThreeJokers(cardCounts)
      case 2:
        return getTypeWithTwoJokers(cardCounts)
      case 1:
        return getTypeWithOneJoker(cardCounts)
      default:
        return getTypeWithNoJoker(cardCounts)
    }
  }
}

function compare(a: Hand, b: Hand, withJokers: boolean): number {
  const valueMap = withJokers ? CardValueWithJokers : CardValue

  if (a.type != b.type) {
    return (a.type - b.type) * 100_000_000_000
  }

  for (let i = 0; i < 5; i++) {
    if (a.hand[i] !== b.hand[i]) {
      return (
        (valueMap[a.hand[i] as CardKind] - valueMap[b.hand[i] as CardKind]) *
        Math.pow(100, 4 - i)
      )
    }
  }

  return 0
}

function solve(input: string[], withJokers: boolean): number {
  const hands: Hand[] = input
    .map((l) => {
      const [hand, bidText] = l.split(' ')
      return {
        hand,
        bid: parseInt(bidText),
        type: getHandType(hand, withJokers),
      }
    })
    .sort((a, b) => compare(a, b, withJokers))

  return sum(hands.map((h, i) => h.bid * (i + 1)))
}

const TEST_INPUT = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`.split('\n')

const INPUT = readInput('src/2023/07.input')

console.log('Test input')
console.log('Part 1:', solve(TEST_INPUT, false))
console.log('Part 2:', solve(TEST_INPUT, true))

console.log('Real input')
console.log('Part 1:', solve(INPUT, false))
console.log('Part 2:', solve(INPUT, true))
