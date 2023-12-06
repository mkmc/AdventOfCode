export function product(values: number[]): number {
    return values.reduce((total, v) => total * v, 1)
  }
  