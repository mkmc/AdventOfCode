import { readInput } from '../utils/readInput'

interface Policy {
  min: number,
  max: number,
  letter: string
}

const INPUT = readInput('02.input')
const parsedInput = parseInput(INPUT)

console.log('PART – 1')
const numOfValidPasswordsV1 = parsedInput.filter(
  ({ policy, password }) => checkValidityV1(policy, password)
).length

console.log(numOfValidPasswordsV1)


console.log('PART – 2')
const numOfValidPasswordsV2 = parsedInput.filter(
  ({ policy, password }) => checkValidityV2(policy, password)
).length

console.log(numOfValidPasswordsV2)


function parseInput(input: string[]) {
  return input.map(i => {
    const [policyString, password] = i.split(': ')
    const [minMaxString, letter] = policyString.split(' ')
    const [min, max] = minMaxString.split('-').map(parseInt)

    return { policy: { min, max, letter }, password }
  })
}

function checkValidityV1(policy: Policy, password: string) {
  const numOfOccurrences = password.split(policy.letter).length - 1

  return numOfOccurrences >= policy.min && numOfOccurrences <= policy.max
}

function checkValidityV2(policy: Policy, password: string) {
  return xor(
    password[policy.min-1] === policy.letter,
    password[policy.max-1] === policy.letter,
  )
}

function xor(a: boolean, b: boolean) {
  return a !== b
}
