export function throttle(fn, delay) {
  let timerId: ReturnType<typeof setTimeout> | null = null
  let lastCalledTime = 0

  const throttledFn = function (...args: Array<any>) {
    const currentTime = Date.now()
    const timeSinceLastCall = currentTime - lastCalledTime
    const delayRemaining = delay - timeSinceLastCall

    // if delayRemaining <= 0, then the function was last called at least delay ms ago, we're ready to call it again
    if (delayRemaining <= 0) {
      lastCalledTime = currentTime
      fn.apply(this, ...args)
    } else {
      clearTimeout(timerId!)

      timerId = setTimeout(() => {
        lastCalledTime = currentTime
        fn.apply(this, ...args)
      }, delayRemaining) // we do not want to use delay here, because we want to execute the function as soon as possible
    }
  }

  throttledFn.cancel = function () {
    clearTimeout(timerId!)
  }

  return throttledFn
}
