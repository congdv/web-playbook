# Javascript

## Promise

"A promise is an object that may produce a single value some time in the future"

A promise has 3 states:
- Fulfilled: onFulfilled() will be called (resolve() was called)
- Rejected: onRejected() will be called -> reject() was called
- Pending: not yet fulfilled or rejected

## Closure
"A closure is the combination of a function bundled together (enclosed) with references to its surrounding state( the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function."

"Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope."

## Event Loop
Js is a single thread programming language.

Call stack: one thread === one call stack === one thing at a time

The solution: asynchronous callback by sending the callback to task queue by using webapis.

We will 3 parts:

- Call stacks contains all main execution
- Webapi: when you use webapis like setTimeout, fetch
- TaskQueue: when wepapi complete execution.

The taskQueue will run when the call stack is clear

## Reference

https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
https://www.digitalocean.com/community/tutorials/javascript-promises-for-dummies
https://github.com/getify/You-Dont-Know-JS/
https://www.youtube.com/watch?v=8aGhZQkoFbQ&feature=youtu.be
