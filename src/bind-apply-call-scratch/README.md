# How call, apply and bind work in JavaScript

## Call

The call() method calls a function with a given `this` value and arguments provided individually.

`this` will be the object that is passed as the first argument to call().

Example:

```js
function say(phrase) {
  console.log(this.name + ' says ' + phrase)
}

const person = { name: 'Carol' }
say.call(person, 'hello') // Output: "Carol says hello"
```

## Apply

The apply() method calls a function with a given `this` value, and arguments provided as an array (or an array-like object).

`this` will be the object that is passed as the first argument to apply().

Example:

```js
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation)
}

const person = { name: 'Alice' }
greet.apply(person, ['Hello', '!']) // Output: "Hello, Alice!"
```

## Bind

`bind()` creates a new function with a specified this value and optional initial arguments.

The new function can be called later with additional arguments.

Example:

```js
function introduce(age, gender) {
  console.log('Name: ' + this.name + ', Age: ' + age + ', Gender: ' + gender)
}

const person = { name: 'Bob' }
const introduceBob = introduce.bind(person, 30)
introduceBob('Male') // Output: "Name: Bob, Age: 30, Gender: Male"
```

# Learnings

```js
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
```
