export function deepEquals(valueOne, valueTwo) {
  // Basic check
  if (typeof valueOne !== typeof valueTwo) return false

  // Nan
  if (Number.isNaN(valueOne) && Number.isNaN(valueTwo)) return true

  // Array vs non array
  if (Array.isArray(valueOne) && !Array.isArray(valueTwo)) return false
  if (!Array.isArray(valueOne) && Array.isArray(valueTwo)) return false

  // null
  if (valueOne === null) return valueTwo === null
  if (valueTwo === null) return valueOne === null

  if (Array.isArray(valueOne)) {
    if (valueOne.length !== valueTwo.length) return false

    return valueOne.every((value, index) => deepEquals(value, valueTwo[index]))
  }

  if (typeof valueOne === 'object') {
    const valueOneKeys = Object.keys(valueOne)
    const valueTwoKeys = Object.keys(valueTwo)

    if (valueOneKeys.length !== valueTwoKeys.length) return false

    return valueOneKeys.every((key) => {
      if (!valueTwoKeys.includes(key)) return false

      return deepEquals(valueOne[key], valueTwo[key])
    })
  }

  return valueOne === valueTwo
}
