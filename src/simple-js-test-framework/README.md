# Learnings

- In JavaScript, when using `throw` in a function, the function will stop executing and return the value of the `throw` statement. You don't have to throw errors, you can throw any value.
- The value you throw can be caught by a `try`/`catch` block.
- throw is flexible with what you decide to throw
- Custom Errors come in handy when using `throw` because you can add more information to the error object.
- At the parent level, we use try/catch to catch the error and log it to the console. At the child level, we use try/catch to catch the error and throw it again. This allows the parent to catch the error and log it to the console.
