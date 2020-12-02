const readInput = require('./readInput')

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


function parseInput(input) {
  return input.map(i => {
    const [policyString, password] = i.split(': ')
    const [minMaxString, letter] = policyString.split(' ')
    const [min, max] = minMaxString.split('-')

    return { policy: { min, max, letter }, password }
  })
}

function checkValidityV1(policy, password) {
  const numOfOccurrences = password.split(policy.letter).length - 1

  return numOfOccurrences >= policy.min && numOfOccurrences <= policy.max
}

function checkValidityV2(policy, password) {
  return xor(
    password[policy.min-1] === policy.letter,
    password[policy.max-1] === policy.letter,
  )
}

function xor(a, b) {
  return a ? !b : b
}
