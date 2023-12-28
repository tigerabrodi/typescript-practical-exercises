// Test framework from scratch

type TypeOf =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'function'
  | 'undefined'
  | 'symbol'

export function describe(testSuiteName: string, func: () => void) {
  console.log(`beginning test suite ${testSuiteName}`)
  func()
  console.log(`successfully completed test suite ${testSuiteName}`)
}

export function it(testCaseName: string, func: () => void) {
  console.log(`beginning test case ${testCaseName}`)
  func()
  console.log(`successfully completed test case ${testCaseName}`)
}

export function expect(actual: unknown) {
  return {
    toExist() {
      const isValueExist = actual !== null && actual !== undefined
      if (!isValueExist) {
        throw new Error(`Expected value to exist but got ${actual}`)
      }
      return true
    },
    toBe(expected: unknown) {
      const isValueEqual = actual === expected
      if (!isValueEqual) {
        throw new Error(`Expected ${actual} to be ${expected}`)
      }

      return true
    },
    // one of the typeofs
    toBeType(expected: TypeOf) {
      const isTypeSame = typeof actual === expected
    },
  }
}
