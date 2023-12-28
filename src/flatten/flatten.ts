export function flatten<
  Type extends Array<unknown> | Record<string, unknown> | unknown
>(value: Type) {
  if (value === null) {
    return null
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      let elementsToReturn: Array<unknown> = []

      value.forEach((element) => {
        if (Array.isArray(element)) {
          elementsToReturn = flatten([
            ...elementsToReturn,
            ...element,
          ]) as Array<unknown>
        } else {
          elementsToReturn.push(element)
        }
      })

      return elementsToReturn
    } else {
      let objToBeReturned = {} as Record<string, unknown>

      Object.keys(value).forEach((key) => {
        const typedKey = key as string
        const typedValue = value as Record<string, unknown>
        const valueToCheck = typedValue[typedKey]

        // Check if the value is an object and not null, because typeof null === 'object'
        if (valueToCheck !== null && typeof valueToCheck === 'object') {
          if (Array.isArray(typedValue[typedKey])) {
            objToBeReturned[typedKey] = flatten(typedValue[typedKey])
          } else {
            objToBeReturned = {
              ...objToBeReturned,
              ...flatten(typedValue[key]),
            }
          }
        } else {
          objToBeReturned[key] = valueToCheck
        }
      })

      return objToBeReturned
    }
  }

  return value
}
