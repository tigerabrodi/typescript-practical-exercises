# Learnings

- `this` is the array itself when using array methods, because the methods are called on the array itself.
- Array methods have the array itself as last argument

Example:

```js
const array = [1, 2, 3]
const newArray = array.map((value, index, arr) => {
  // 'value' is the current element.
  // 'index' is the index of the current element.
  // 'arr' is the entire array 'array'.
  return value * 2
})
```
