# Learnings

In JavaScript, every function is an object, and when you create a function, you're creating an object of type Function. Each function has its own unique reference in memory. This reference is what gets passed around when you assign a function to a variable or pass it as an argument.

When you compare two functions using === or !==, JavaScript checks whether both operands are the exact same function object in memory. This means two functions with identical code but defined separately are considered different because they occupy different locations in memory.
