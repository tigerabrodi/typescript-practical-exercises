// Define the MyPromise class
export class MyPromise {
  // Initialize the state to 'pending' and the value to null
  // Also create arrays to hold onFulfilled and onRejected callbacks
  privateState = 'pending'
  privateValue = null
  onFulfilledCallbacks = []
  onRejectedCallbacks = []

  // The constructor takes an executor function with resolve and reject functions
  constructor(executorFunc) {
    // Define the resolve function
    const resolve = (value) => {
      // If the state is pending, change it to 'fulfilled', set the value,
      // and run any onFulfilled callbacks
      if (this.privateState === 'pending') {
        this.privateState = 'fulfilled'
        this.privateValue = value
        this.onFulfilledCallbacks.forEach((callback) => callback(value))
      }
    }

    // Define the reject function
    const reject = (reason) => {
      // If the state is pending, change it to 'rejected', set the value,
      // and run any onRejected callbacks
      if (this.privateState === 'pending') {
        this.privateState = 'rejected'
        this.privateValue = reason
        this.onRejectedCallbacks.forEach((callback) => callback(reason))
      }
    }

    // Try executing the executor function with resolve and reject
    try {
      executorFunc(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // The then method for handling fulfilled or rejected promises
  then(onFulfilled, onRejected) {
    // Create a new promise to return for chaining
    const promise2 = new MyPromise((resolve, reject) => {
      // If the current promise is fulfilled, queue the onFulfilled function
      if (this.privateState === 'fulfilled') {
        if (onFulfilled) {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.privateValue)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          })
        }
      }
      // If the current promise is rejected, queue the onRejected function
      else if (this.privateState === 'rejected') {
        if (onRejected) {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.privateValue)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          })
        }
      }
      // If the current promise is still pending, store the callbacks
      else {
        if (onFulfilled) {
          this.onFulfilledCallbacks.push(onFulfilled)
        }
        if (onRejected) {
          this.onRejectedCallbacks.push(onRejected)
        }
      }
    })

    // Return the new promise for chaining
    return promise2
  }

  // The catch method for handling rejected promises
  catch(onRejected) {
    // This is just a shortcut for calling then with no onFulfilled callback
    return this.then(undefined, onRejected)
  }

  // Getter for the promise's state
  get state() {
    return this.privateState
  }

  // Getter for the promise's value
  get value() {
    return this.privateValue
  }
}
