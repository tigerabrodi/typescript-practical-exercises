// Test framework from scratch

type TypeOf =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'function'
  | 'undefined'
  | 'symbol'

// should have test case name and error message
class CustomDescribeError extends Error {
  testCaseName: string

  constructor(message: string, testCaseName: string = '') {
    super(message)
    this.name = 'CustomDescribeError'
    this.testCaseName = testCaseName
  }
}

export function describe(testSuiteName: string, func: () => void) {
  console.log(`beginning test suite ${testSuiteName}`)
  try {
    func()
  } catch (error) {
    if (error instanceof CustomDescribeError) {
      console.error(
        `failed running test suite ${testSuiteName} on test case ${error.testCaseName} with error message ${error.message}`
      )
      return
    }

    throw error
  }
  console.log(`successfully completed test suite ${testSuiteName}`)
}

export function it(testCaseName: string, func: () => void) {
  console.log(`beginning test case ${testCaseName}`)
  try {
    func()
  } catch (error) {
    if (error instanceof CustomDescribeError) {
      throw new CustomDescribeError(
        `${testCaseName} with error message ${error.message}`,
        testCaseName
      )
    }

    throw error
  }
  console.log(`successfully completed test case ${testCaseName}`)
}

export function expect(actual: unknown) {
  return {
    toExist() {
      const isValueExist = actual !== null && actual !== undefined
      if (!isValueExist) {
        console.log(`expected value to exist but got ${JSON.stringify(actual)}`)
        throw new CustomDescribeError(
          `expected value to exist but got ${JSON.stringify(actual)}`
        )
      }
      return true
    },
    toBe(expected: unknown) {
      const isValueEqual = actual === expected
      if (!isValueEqual) {
        console.log(
          `expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`
        )
        throw new CustomDescribeError(
          `expected ${JSON.stringify(actual)} to be ${expected}`
        )
      }

      return true
    },
    // one of the typeofs
    toBeType(expected: TypeOf) {
      const isTypeSame = typeof actual === expected
      const typeOfActual = typeof actual
      if (!isTypeSame) {
        console.log(
          `expected ${JSON.stringify(
            actual
          )} to be type ${expected} but got ${typeOfActual}`
        )
        throw new CustomDescribeError(
          `expected ${JSON.stringify(
            actual
          )} to be type ${expected} but got ${typeOfActual}`
        )
      }
      return true
    },
  }
}
