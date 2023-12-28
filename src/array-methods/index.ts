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

// Array.prototype.myReduce = function (callback, initialValue) {
//   // Write your code here.
// }
