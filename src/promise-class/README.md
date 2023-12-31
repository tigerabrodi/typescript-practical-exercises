# Learnings

Promises in JavaScript have three states:

- Pending
- Fulfilled
- Rejected

.then, .catch, .finally, are all used to do further action on the promise.

.then takes two arguments, first is the callback function for the success case and second is the callback function for the failure case.

You can chain .then and .catch.

.catch is used to handle the error case. This happens when the promise is rejected. It's like the second argument of .then.

The reason .then has a second argument is because when you've multiple .then chained together, you can handle the error case in each .then before proceeding to chain the next .then.

At the end you can have a single .catch.

```js
myPromise
  .then((value) => `${value} and bar`)
  .then((value) => `${value} and bar again`)
  .then((value) => `${value} and again`)
  .then((value) => `${value} and again`)
  .then((value) => {
    console.log(value)
  })
  .catch((err) => {
    console.error(err)
  })
```
