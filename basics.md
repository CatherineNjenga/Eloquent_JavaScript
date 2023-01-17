JavaScript is a single-threaded, non-blocking, asynchronous, concurrent programming language with lots of flexibility.
Asynchronous means objects or events that are not coordinated in time.
A promise object has the following internal properties/state;
1. state: This property can have the following values,
  pending: when the execution function starts.
  fulfilled: When the promise resolves successfully.
  rejected: When the promise rejects.
2. result: This property can have the following values,
  undefined: Initially, when the state value is pending.
  value: When the promise is resolved(value)
  error: When the promise is rejected.
A promise that is either resolved or rejected is called settled.
The returned promise object has the above internal properties that are code-inaccessible, but are inspectable.

The .then() Promise Handler
It lets the consumer know about the outcome of the promise.

The .catch() Promise Handler
It handles errors(rejections) from promises.

resolveFunc and rejectFunc are also functions, and you can give them whatever actual names you want. 
Their signatures are simple: they accept a single parameter of any type.
  resolveFunc(value); // call on resolved
  rejectFunc(reason); // call on rejected
The value parameter passed to resolveFunc can be another promise object.
The rejectFunc has semantics close to the throw statement, so reason is typically an Error instance.
If either value or reason is omitted, the promise is fulfilled/rejected with undefined.

Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function.
