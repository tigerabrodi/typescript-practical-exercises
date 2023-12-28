Function.prototype.myCall = function (thisContext, ...args) {
  // Symbol is needed to avoid collision with other properties on the object
  // Symbol is a unique value that can be used as a property key
  // Symbol is a primitive data type
  // Symbol won't appear in iteration
  const symbol = Symbol()
  thisContext[symbol] = this
  const result = thisContext[symbol](...args)
  delete thisContext[symbol] // clean up
  return result
}

Function.prototype.myApply = function (thisContext, args = []) {
  return this.myCall(thisContext, ...args)
}

Function.prototype.myBind = function (thisContext, ...args) {
  retun (...newArgs) => this.myApply(thisContext, [...args, ...newArgs]) // return a new function with new args, that's how bind works
}
