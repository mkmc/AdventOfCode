const numbers = [14,8,16,0,1,17] as const
const numberMap = new Map<number, number>(
  numbers
    .map((n, i) => [n, i])
    .slice(0, numbers.length - 1) as [number, number][]
  )

let lastNumber: number = numbers[numbers.length - 1]
let counter = numberMap.size
while (counter < 30000000 - 1) {
  const newNumber = findNumber(lastNumber)
  numberMap.set(lastNumber, counter)
  lastNumber = newNumber
  counter++
}

console.log(lastNumber)

function findNumber(lastNumber: number): number {
  const lastIndex = numberMap.get(lastNumber)
  if (lastIndex === undefined) {
    return 0
  } else {
    return counter - lastIndex
  }
}
