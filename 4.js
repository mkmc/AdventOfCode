let count = 0
for (let i = 125730; i <= 579381; i++) {
  if (meetsCriteria(i)) {
    count++
  }
}

console.log(meetsCriteria(112233))
console.log(meetsCriteria(123444))
console.log(meetsCriteria(111122))

console.log(count)

function meetsCriteria(i) {
  const string = i + ''

  if (
    parseInt(string[0]) > parseInt(string[1])
    || parseInt(string[1]) > parseInt(string[2])
    || parseInt(string[2]) > parseInt(string[3])
    || parseInt(string[3]) > parseInt(string[4])
    || parseInt(string[4]) > parseInt(string[5])
  ) {
    return false
  }

  if (!countDigits(string).includes(2)) {
    return false
  }

  return true
}

function countDigits(string) {
  let counts = new Array(10).fill(0)
  for (let i = 0; i < 6; i++) {
    counts[parseInt(string[i])]++
  }
  return counts
}