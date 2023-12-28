# Learnings

- In JavaScript, Arrays are objects, same with null.
- How we use typeof object we need to be careful with.
- .concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array. If it is not an array, it will be added to the new array, which is the nice part of this method.
- Object.entries() method returns an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a for...in loop. The only important thing is that it returns an array.

Example of Object.entries() method:

```javascript
const object1 = {
  a: 'somestring',
  b: 42,
}

for (const [key, value] of Object.entries(object1)) {
  console.log(`${key}: ${value}`)
}
```

- Object.assign method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object. The only important thing is that it returns an object.

Example of Object.assign() method:

```javascript
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }

const returnedTarget = Object.assign(target, source) // `target` object is modified and will be equal to `returnedTarget`

console.log(target) // { a: 1, b: 4, c: 5 }
console.log(returnedTarget) // { a: 1, b: 4, c: 5 }
```
