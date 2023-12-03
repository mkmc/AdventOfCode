export function sum(values: number[]): number {
  return values.reduce((total, v) => total + v, 0)
}
