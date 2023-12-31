export class MyPromise<T> {
  private privateState: 'pending' | 'fulfilled' | 'rejected' = 'pending'
  private privateValue: T | null = null
  private onFulfilledCallbacks: Array<(value: T) => void> = []
  private onRejectedCallbacks: Array<(value: unknown) => void> = []

  constructor(
    executorFunc: (
      resolve: (value: T) => void,
      reject: (reason: unknown) => void
    ) => void
  ) {
    const resolve = (value: T) => {
      if (this.privateState === 'pending') {
        this.privateState = 'fulfilled'
        this.privateValue = value
        this.onFulfilledCallbacks.forEach((callback) => callback(value))
      }
    }

    const reject = (reason: unknown) => {
      if (this.privateState === 'pending') {
        this.privateState = 'rejected'
        this.privateValue = reason as T
        this.onRejectedCallbacks.forEach((callback) => callback(reason))
      }
    }

    try {
      executorFunc(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(
    onFulfilled?: (value: T) => void,
    onRejected?: (value: unknown) => void
  ): MyPromise<T> {
    const promise2 = new MyPromise<T>((resolve, reject) => {
      if (this.privateState === 'fulfilled') {
        if (onFulfilled) {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.privateValue as T)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          })
        }
      } else if (this.privateState === 'rejected') {
        if (onRejected) {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.privateValue as T)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          })
        }
      } else {
        if (onFulfilled) {
          this.onFulfilledCallbacks.push(onFulfilled)
        }
        if (onRejected) {
          this.onRejectedCallbacks.push(onRejected)
        }
      }
    })

    return promise2
  }

  catch(onRejected: (reason: unknown) => void): MyPromise<T> {
    return this.then(undefined, onRejected)
  }

  get state() {
    return this.privateState
  }

  get value() {
    return this.privateValue
  }
}

// How to use Promise in JS example

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('hello world')
//   }, 1000)

//   setTimeout(() => {
//     reject('error')
//   }, 2000)
// })

// // promise.then is responsible for handling the resolved value
// // promise.catch is responsible for handling the rejected value
// promise
//   .then((resolvedValue) => {
//     console.log('resolvedValue', resolvedValue)
//   })
//   .catch((rejectedValue) => {
//     console.log('rejectedValue', rejectedValue)
//   })
