export function curry(callback: (...args: Array<unknown>) => unknown) {
  return function (...args: Array<unknown>) {
    if (!args.length) {
      return callback() // Calling `callback` with ...args is optional because `bind` will provide the arguments for us, they're already bound to the function.
    }

    return curry(callback.bind(this, ...args)) // `bind` purpose here is to return a new function with the arguments passed in. The function returned is the same as the one passed in, but with the arguments bound to it. So we're incrementally building up the arguments until we have all of them.
  }
}

// function curry(fn) {
//   const accumulatedArgs = []

//   function accumulator(...args) {
//     // If no arguments are provided, invoke the original function with accumulated arguments
//     if (args.length === 0) {
//       return fn.apply(this, accumulatedArgs)
//     }

//     // Accumulate arguments and return the accumulator function for further chaining
//     accumulatedArgs.push(...args)
//     return accumulator
//   }

//   return accumulator
// }
