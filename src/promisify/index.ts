export function promisify(callback) {
  return function (...args) {
    // A new regular `function` has its own `this` context, which is set at the time of the function's invocation. It doesn't automatically inherit the `this` context of the parent function, it depends on how the function is invoked, not where it's defined.
    return new Promise((resolve, reject) => {
      callback.call(this, ...args, (error, result) => {
        // with `call`, we can set the `this` context of the callback function to where it's invoked, e.g. method of an object.
        if (error) {
          return reject(error)
        }

        resolve(result)
      })
    })
  }
}

// `promisify` is a function that takes a function and returns a function that returns a promise. It bridges the gap between callback-based functions and promise-based functions. It was the old way of dealing with asynchronous code before async/await was introduced in ES2017.

// It's a wrapper function that takes care of the boilerplate code of creating a promise and calling `resolve` and `reject` in the callback.
