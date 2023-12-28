# Learnings

- When checking difference in dates, `Date.now()` minus the milliseconds you want to check.
- For example, if you want to check if 5 seconds have passed, you can do `Date.now() - 5000`.

```js
const now = Date.now() // returns milliseconds

now - lastCalled >= delay
```

- `now - lastCalled` will return the difference in milliseconds.
- If the difference is greater than or equal to the delay, this would imply that the delay has passed.
