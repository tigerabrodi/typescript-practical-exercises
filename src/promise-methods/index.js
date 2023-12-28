// myRace takes an array of promises and returns a promise that resolves or rejects. Promise should resolve or reject as soon as any of the promises in the array resolve or reject. If the first promise in the array resolves, the returned promise should resolve with the same value. If the first promise in the array rejects, the returned promise should reject with the same reason.
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((value) => {
          resolve(value)
        })
        .catch((error) => {
          reject(error)
        })
    })
  })
}

Promise.myAny = function (promises) {
  const promisesLength = promises.length
  let rejectedPromises = 0

  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((value) => {
          resolve(value)
        })
        .catch((error) => {
          rejectedPromises++

          if (rejectedPromises === promisesLength) {
            reject('all promises rejected')
          }
        })
    })
  })
}

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = []
    let resolvedCount = 0

    promises.forEach((promise, index) => {
      // index to keep track of order because they might resolve in different order
      promise
        .then((value) => {
          results[index] = value
          resolvedCount++

          if (resolvedCount === promises.length) {
            resolve(results)
          }
        })
        .catch(reject)
    })
  })
}

Promise.myAllSettled = function (promises) {
  return new Promise((resolve, reject) => {
    const results = []
    let settledCount = 0

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = { status: 'fulfilled', value }
        })
        .catch((error) => {
          results[index] = { status: 'rejected', reason: error }
        })
        .finally(() => {
          settledCount++

          if (settledCount === promises.length) {
            resolve(results)
          }
        })
    })
  })
}
