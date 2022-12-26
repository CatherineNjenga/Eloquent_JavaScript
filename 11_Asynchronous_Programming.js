// Promises
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