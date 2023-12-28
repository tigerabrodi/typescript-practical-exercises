// Array methods from scratch

interface Array<T> {
  myMap<U>(callback: (value: T, index: number, array: Array<T>) => U): Array<U>
}

interface Array<T> {
  myFilter(
    callback: (value: T, index: number, array: Array<T>) => boolean
  ): Array<T>
}

interface Array<T> {
  myReduce<U>(
    callback: (
      accumulator: U,
      currentValue: T,
      currentIndex: number,
      array: Array<T>
    ) => U,
    initialValue?: U
  ): U
}

Array.prototype.myMap = function <U>(
  callback: (value: unknown, index: number, array: Array<unknown>) => U
): Array<U> {
  const result = []
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this)) // `this` is the array, how does it work? `this` works by referring to the array that is calling the function, since `myMap` is a method of the Array prototype, `this` refers to the array that is calling the method
  }

  return result
}

Array.prototype.myFilter = function <T>(
  callback: (value: T, index: number, array: Array<T>) => boolean
): Array<T> {
  const result = []

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i])
    }
  }

  return result
}

Array.prototype.myReduce = function <T, U>(
  callback: (
    accumulator: U,
    currentValue: T,
    currentIndex: number,
    array: Array<T>
  ) => U,
  initialValue?: U
): U {
  let accumulator: U | T | undefined = initialValue
  let startIndex = 0

  // Means that the user didn't pass an initial value
  if (accumulator === undefined) {
    // Means that the array is empty, we can't reduce an empty array
    if (this.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    accumulator = this[0] // The first element of the array if the user didn't pass an initial value
    startIndex = 1 // We start from the second element of the array because we already have the first element in the accumulator, this is intentional and how reduce works
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator as U, this[i], i, this)
  }

  return accumulator as U
}

// Example of myReduce

const numbers = [1, 2, 3, 4, 5]

const sum = numbers.myReduce((acc, curr) => acc + curr, 0) // `acc + curr` is the callback returned
