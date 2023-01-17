// Synchronous vs.Asynchronous JavaScript
function f1() {
  console.log('f1');
}

function f2() {
  console.log('f2');
}

function f3() {
  console.log('f3');
}

function main() {
  console.log('main');

  setTimeout(f1, 50);
  setTimeout(f3, 30);

  new Promise((resolve, reject) =>
    resolve('I am a Promise, right after f1 and f3 Really?')  
  ).then(resolve => console.log(resolve))

  new Promise((resolve, reject) =>
    resolve('I am a Promise after Promise!')
  ).then(resolve => console.log(resolve))

  f2();

}

main();

// 'main'
// 'f2'
// 'I am a Promise, right after f1 and f3 Really?'
// 'I am a Promise after Promise!'
// 'f3'
// 'f1'

function f1() {
  console.log('f1');
}

console.log("Let's do it!");

setTimeout(function() {console.log('in settimeout');}, 0);

f1();
f1();
f1();
f1();
// 'Let's do it'
// 'f1'
// 'f1'
// 'f1'
// 'f1'
// 'in settimeout'

function f1() {
  console.log('f1');
}

function f2() {
  console.log('f2');
}

function f3() {
  console.log('f3');
}

function f4() {
  console.log('f4');
}

console.log("Let's do it!");

setTimeout(function() {f1();}, 0); // callback queue -> f1, f2, f3

f4(); // call stack -> f4, 

setTimeout(function() {f2();}, 5000);

setTimeout(function() {f3();}, 3000);

// 'Let's do it!'
// 'f4'
// 'f1'
// 'f3'
// 'f2'

const tom = () => console.log('Tom');

const jerry = () => console.log('Jerry');

const cartoon = () => {
  console.log('Cartoon');

  setTimeout(tom, 5000); // callback queue -> tom, 

  new Promise((resolve, reject) => // job queue -> anonymous, 
    resolve('should it be right after Tom, before Jerry?')  
  ).then(resolve => console.log(resolve))

  jerry(); 
}

cartoon();

// 'Cartoon'
// 'Jerry'
// 'should it be right after Tom, before Jerry?
// 'Tom'

const tom1 = () => console.log('Tom');
const jerry1 = () => console.log('Jerry');
const doggy = () => console.log('Doggy');

const cartoon1 = () => {
  console.log('Cartoon');

  setTimeout(tom, 50); // callback queue -> tom, doggy, 
  setTimeout(doggy, 30);

  new Promise((resolve, reject) => // job queue -> anonymous, anonymous
    resolve('I am a Promise, right after tom and doggy! Really?')
  ).then(resolve => console.log(resolve));
  new Promise((resolve, reject) => 
    resolve('I am a Promise after Promise!')
  ).then(resolve => console.log(resolve));

  jerry1();
}

cartoon1(); // callstack -> cartoon1, console.log('Cartoon'), jerry1, 

// 'Cartoon'
// 'Jerry'
// 'I am a Promise, right after tom and doggy! Really?'
// 'I am a Promise after Promise!'
// 'Doggy'
// 'Tom'

const f1 = () => console.log('f1');
const f2 = () => console.log('f2');
const f3 = () => console.log('f3');
const f4 = () => console.log('f4');

f4(); // call stack -> f4,

setTimeout(f1, 0); // callback queue -> f1, f2, f3

new Promise((resolve, reject) => { // job queue -> anonymous, anonymous, anonymous
  resolve('Boom');
}).then(result => console.log(result));

setTimeout(f2, 2000);

new Promise((resolve, reject) => {
  resolve('Sonic');
}).then(result => console.log(result));

setTimeout(f3, 0);

new Promise((resolve, reject) => {
  resolve('Albert');
}).then(result => console.log(result));

// 'f4'
// 'Boom'
// 'Sonic'
// 'Albert'
// 'f1'
// 'f3'
// 'f2'

const f1 = () => {
  console.log('f1');
  f2();
}
const f2 = () => console.log('f2');
const f3 = () => console.log('f3');
const f4 = () => console.log('f4');

f4(); // call stack -> f4

setTimeout(f1, 0); // callback queue -> f1, f3

new Promise((resolve, reject) => { // job queue -> anonymous, anonymous 
  resolve('Sonic');
}).then(result => console.log(result));

setTimeout(f3, 0);

new Promise((resolve, reject) => {
  resolve('Albert');
}).then(result => console.log(result));

// 'f4'
// 'Sonic'
// 'Albert'
// 'f1'
// 'f2'
// 'f3'

// JavaScript Promises
let promise = new Promise(function(resolve, reject) {

  // Resolve and reject are callback functions for the executor function to announce an outcome.
  // Resolve method indicates successful completion of the task.
  // You do not define the resolve and reject functions but JavaScript provides for you.
  // You need to call them from the executor function.
  setTimeout(function() {

    // Reject method indicates an error.
    reject(new Error('Jack fell down and broke his crown. And Jill came tumbling after.'))
  }, 2000)
  let value = 'water';
  // Pretend a delay of 2 sec to fetch it!
  setTimeout(function() {
    // Ftched the water. Let's resolve the promise.
    resolve('Hurray! Fetched the water.');
  }, 2000);  
});

// Function to set up the handler to handle a promise result.
// It is to inform the grand parents when the result is available.
const grandParentsCooking = () => {
  // The handler function to handle the resolved promise.
  promise.then(function(result) {
    // Fetched the water. Now grandparents can start the cooking
    console.log(`cooking rice with the ${result}`);
  });

  promise.catch(function(error) {
    console.log(`OMG ${error.message}`);
  });
}

// Calling the function to activaye the set up.
grandParentsCooking();

promise.then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);

let loading = true;
loading && console.log('Loading...');

// Getting the promise
promise = getPromise();

promise.finally(() => {
  loading = false;
  console.log(`Promise Settled and loading is ${loading}`);
}).then((result) => {
  console.log({result});
});

// Callbacks
import {bigOak} from "./crow-tech";

bigOak.readStorage("food caches", caches => {
  let firstCache = caches[0];
  bigOak.readStorage(firstCache, info => {
    console.log(info)
  });
});

bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",
            () => console.log("Note delivered"));

import {defineRequestType} from "./crow-tech";
defineRequestType("note", (nest, content, source, done) => {
  console.log(`${nest.name} received note: ${content}`);
  done();
});

let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// -> Got 15

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result))
  });
}

storage(bigOak, "enemies")
  .then(value => console.log("Got", value));

new Promise((_, reject) = reject(new Error("Fail")))
  .then(value => console.log("Handler 1"))
  .catch(reason => {
    console.log("Caught failure" + reason);
    return "nothing";
  })
  .then(value => console.log("Handler 2", value));

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      }, 250);
    }
    attempt(1);
  });
}

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source,
                    callback) => {
    try {
      Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response),
              failure => callback(failure));
    } catch (exception) {
      callback(exception);
    }
  });
}