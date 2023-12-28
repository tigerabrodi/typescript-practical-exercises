function throttle(fn, delay) {
  let lastCallInMs = 0
  let timeoutId = null

  function throttledFunction(...args) {
    // `throttledFunction` is needed because we need to be able to cancel the timeout
    const now = Date.now()

    if (now - lastCallInMs < delay) {
      // If the delay has not passed, we need to set a timeout, but we also need to cancel the previous one, because we don't want to call the function twice
      if (timeoutId) {
        clearTimeout(timeoutId) // Cancel the previous timeout if it exists
      }

      timeoutId = setTimeout(() => {
        lastCallInMs = now // Update the last call time
        fn.apply(this, args) // Call the function with `this` context set to whatever calling it and the arguments
      }, delay - (now - lastCallInMs))
    } else {
      lastCallInMs = now
      fn.apply(this, args)
    }
  }

  throttledFunction.cancel = function () {
    // Functions are objects, so we can add properties to them
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return throttledFunction
}
