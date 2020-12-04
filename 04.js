const INPUT = require('./readInput')('04.input')

const passports = parseInput(INPUT)

const validCount = passports.filter(isValid2).length

console.log(validCount)

function parseInput(input) {
  let currentPassport = {}
  const passports = [currentPassport]

  input.forEach(line => {
    if (line === '') {
      currentPassport = {}
      passports.push(currentPassport)
    } else {
      const keyValuePairs = line.split(' ')
      keyValuePairs.forEach(keyValuePair => {
        const [key, value] = keyValuePair.split(':')
        currentPassport[key] = value
      })
    }
  })

  return passports
}

function isValid(passport) {
  return passport.byr && passport.iyr && passport.eyr && passport.hgt
    && passport.hcl && passport.ecl && passport.pid // && passport.cid
}

function isValid2(passport) {
  if (!isValid(passport)) {
    return false
  }

  return checkByr(passport.byr) && checkIyr(passport.iyr) && checkEyr(passport.eyr)
    && checkHgt(passport.hgt) && checkHcl(passport.hcl) && checkEcl(passport.ecl)
    && checkPid(passport.pid) // && passport.cid
}

function checkByr(byrString) {
  const byr = parseInt(byrString)
  return byr >= 1920 && byr <= 2002
}

function checkIyr(iyrString) {
  const iyr = parseInt(iyrString)
  return iyr >= 2010 && iyr <= 2020
}

function checkEyr(eyrString) {
  const eyr = parseInt(eyrString)
  return eyr >= 2020 && eyr <= 2030
}

function checkHgt(hgtString) {
  const value = parseInt(hgtString.substring(0, hgtString.length-2))
  const unit = hgtString.substring(hgtString.length-2)

  switch (unit) {
    case 'cm':
      return value >= 150 && value <= 193
    case 'in':
      return value >= 59 && value <= 76
    default:
      return false
  }
}

function checkHcl(hclString) {
  return /^#[0-9a-f]{6}$/.test(hclString)
}

function checkEcl(eclString) {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(eclString)
}

function checkPid(pidString) {
  return /^[0-9]{9}$/.test(pidString)

}
