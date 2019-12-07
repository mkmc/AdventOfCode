const originalProgram = '3,8,1001,8,10,8,105,1,0,0,21,42,63,76,101,114,195,276,357,438,99999,3,9,101,2,9,9,102,5,9,9,1001,9,3,9,1002,9,5,9,4,9,99,3,9,101,4,9,9,102,5,9,9,1001,9,5,9,102,2,9,9,4,9,99,3,9,1001,9,3,9,1002,9,5,9,4,9,99,3,9,1002,9,2,9,101,5,9,9,102,3,9,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,102,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99'
  .split(',').map(i => parseInt(i))

class Amplifier {
  constructor(phase) {
    this.program = [...originalProgram]
    this.input = [phase]
    this.instructionPointer = 0
  }

  connect(next) {
    this.next = next
  }

  run() {
    while (true) {
      const instruction = this.program[this.instructionPointer].toString().split('').reverse().join('')
      const opcode = parseInt(instruction.length <= 2 ? instruction : instruction.substring(0, 2).split('').reverse().join(''))
      const p1Mode = parseInt(instruction.length >= 3 ? instruction[2] : 0)
      const p2Mode = parseInt(instruction.length >= 4 ? instruction[3] : 0)
      const p3Mode = parseInt(instruction.length >= 4 ? instruction[3] : 0)

      const input1 = p1Mode === 0 ? this.program[this.program[this.instructionPointer + 1]] : this.program[this.instructionPointer + 1]
      const input2 = p2Mode === 0 ? this.program[this.program[this.instructionPointer + 2]] : this.program[this.instructionPointer + 2]
      const output = this.program[this.instructionPointer + 3]

      if (opcode === 1) {
        this.program[output] = input1 + input2
        this.instructionPointer += 4
      } else if (opcode === 2) {
        this.program[output] = input1 * input2
        this.instructionPointer += 4
      } else if (opcode === 3) {
        if (this.input.length === 0) {
          return false
        }
        this.program[this.program[this.instructionPointer + 1]] = this.input.shift()
        this.instructionPointer += 2
      } else if (opcode === 4) {
        this.next.input.push(this.program[this.program[this.instructionPointer + 1]])
        this.instructionPointer += 2
      } else if (opcode === 5) {
        if (input1 !== 0) {
          this.instructionPointer = input2
        } else {
          this.instructionPointer += 3
        }
      } else if (opcode === 6) {
        if (input1 === 0) {
          this.instructionPointer = input2
        } else {
          this.instructionPointer += 3
        }
      } else if (opcode === 7) {
        this.program[output] = input1 < input2 ? 1 : 0
        this.instructionPointer += 4
      } else if (opcode === 8) {
        this.program[output] = input1 === input2 ? 1 : 0
        this.instructionPointer += 4
      } else if (opcode === 99) {
        return true
      } else {
        throw new Error('Unexcepected code:', opcode)
      }
    }
  }
}

console.log(Math.max(...perm([5, 6, 7, 8, 9]).map(p => executeAmplifierConfiguration(p))))

function executeAmplifierConfiguration(phaseSettings) {
  const amplifiers = phaseSettings.map(p => new Amplifier(p))
  const feedbackLoop = { input: [0] }

  for (let i = 0; i < amplifiers.length - 1; i++) {
    amplifiers[i].connect(amplifiers[i + 1])
  }

  amplifiers[amplifiers.length - 1].connect(feedbackLoop)

  let halted = false
  while (!halted) {
    amplifiers[0].input.push(feedbackLoop.input.shift())
    amplifiers.forEach(amplifier => {
      halted = amplifier.run()
    })
  }

  if (feedbackLoop.input.length !== 1) {
    throw new Error('Feedback loop has unexpected amount of singals.')
  }

  return feedbackLoop.input[0]
}

function perm(xs) {
  const ret = []
  for (let i = 0; i < xs.length; i++) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)))

    if (!rest.length) {
      ret.push([xs[i]])
    } else {
      for (let j = 0; j < rest.length; j++) {
        ret.push([xs[i]].concat(rest[j]))
      }
    }
  }
  return ret
}
