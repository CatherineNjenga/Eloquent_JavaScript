// ENCAPSULATION.
// Separating interface from implementation is a great idea. It is usually called encapsulation.
// Private properties are declared with # names(hash names), which are identifiers prefixed with #. The hash prefix is an inherent part of the property name #privateField.
// It is a syntax error to refer to # names from outside the class, or attempt to remove declared properties with delete.

const { timeFilter } = require("linkedin-jobs-scraper");

// METHODS
// Methods are properties that hold function values.
let rabbit = {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};
rabbit.speak("I'm alive.");

// When a function is called as a method-looked up as a property and immediately called, as in object.method()
// the binding called this in its body automatically points at the object it was called on.
function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
hungryRabbit.speak("I could use a carrot right now.");

// You can think of this as an extra parameter that is passed in a different way.
// If you want to pass it explicitly, you use a function's call method, which takes the this value as its first argument
// and treats further arguments as normal parameters.
speak.call(hungryRabbit, "Burb");

// Function.prototype.call()
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

console.log(new Food('cheese', 5).name);
// Note: This function is almost identical to apply(), except that call() accepts an argument list
// while apply() accepts a single array of arguments
// func.apply(this, ['eat', 'bananas']) VS func.call(this, 'eat', 'bananas').
// Each function has its own this binding, whose value depends on the way it is called and...
// you cannot refer to the this of the wrapping scope in a regular function declaration.
// Arrow functions do not bind their own this but can see the this binding of the scope around them.
function normalize() {
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});

// PROTOTYPES.
let empty = {};
console.log(empty.toString);

console.log(Object.getPrototypeOf({}) === 
            Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));
console.log(Object.getPrototypeOf(Math.max) == 
            Function.prototype);
console.log(Object.getPrototypeOf([]) == 
            Array.prototype);
// Object.create()
// A static method that creates a new object, using an existing object as the prototype of the newly created object.
const person = {
  isHuman: false,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};

const me = Object.create(person);
me.name = "Matthew";
me.isHuman = true;
me.printIntroduction();
// Classical inheritance with Object.create()
// Shape - superclass
function Shape() {
  this.x = 0;
  this.y = 0;
}

// superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// Rectangle - subclass
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// subclass extends superclass
Rectangle.prototype = Object.create(Shape.prototype, {
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

const rect = new Rectangle();

console.log("Is rect an instance of Rectangle?", rect instanceof Rectangle);
console.log("Is rect an instanceof Shape?", rect instanceof Shape);
rect.move(1, 1)
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};

// Method definitions - MDN

let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");

// CLASSES
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");

console.log(Object.getPrototypeOf(Rabbit) ==
            Function.prototype);
console.log(Object.getPrototypeOf(weirdRabbit) == 
            Rabbit.prototype);

// CLASS NOTATION.
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

// class expressions do not define a binding but produce a constructor as a value.
// It is allowable to omit the class name in a class expression.
let object = new class { getWord() { return "hello" } };
console.log(object.getWord());

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// -> small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// -> long, sharp, and bloody
console.log(blackRabbit.teeth);
// -> small
console.log(Rabbit.prototype.teeth);
// -> small
console.log(Array.prototype.toString == 
            Object.prototype.toString);
console.log([1, 2].toString()); 
// -> 1, 2
console.log(Object.prototype.toString.call([1, 2]));

// MAPS
let ages = {
  Boris: 39,
  Liang: 22,
  Julia: 62,
};

console.log(`Julia is ${ages["Julia"]}`);
// -> Julia is 62
console.log("Is Jack's age known?",  "Jack" in ages);
// -> Is JAck's age known? false
console.log("Is toString's age known?", "toString" in ages);
// -> Is toString's age known? true
console.log("toString" in Object.create(null));
// -> false

// JavaScript comes with a class called Map

let agesToo = new Map();
agesToo.set("Borris", 39);
agesToo.set("Liang", 22);
agesToo.set("Julia", 62);

console.log(`Julia is ${agesToo.get("Julia")}`);
// -> Julia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// -> Is Jack's age known? false
console.log(ages.has("toString"));
// -> false
console.log({ x: 1 }.hasOwnProperty("x"));
// -> true
console.log({ x: 1}.hasOwnProperty("toString"));
// -> false

// POLYMORPHISM.
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
// -> a black rabbit

// SYMBOLS
// Symbols are value created with the Symbol function.
// newlycreated symbols are unique-you cannot create the same symbol twice.
let sym = Symbol("name");
console.log(sym == Symbol("name"));
// -> false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// -> 55
const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
// -> 1, 2
console.log([1, 2][toStringSymbol]());
// -> 2 cm of blue yarn

let stringObject = {
  [toStringSymbol]() { return " a jute rope"; }
};
console.log(stringObject[toStringSymbol()]);
// -> a jute rope

// THE ITERATOR INTERPHASE.
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// -> {value: "O", done: false}
console.log(okIterator.next());
// -> {value: "K", done: false}
console.log(okIterator.next());
// -> {value: undefined, done: true}

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};
    
    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x += 1;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y += 1;
    }
    return {value, done: false};
  }
}

Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};
console.log(varyingSize.size);
// -> 73
console.log(varyingSize.size);
// -> 49

class Temperature {
  constructor(celcius) {
    this.celcius = celcius;
  }
  get fahrenheit() {
    return this.celcius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celcius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// -> 71.6
temp.fahrenheit = 86;
console.log(temp.celcius);
// -> 30

const obj = {
  log: ['a', 'b', 'c'],
  get latest() {
    return this.log[this.log.length - 1]
  }
};
console.log(obj.latest);
// -> "c"

class ClassWithGetSet {
  #msg = "hello world";
  get msg() {
    return this.#msg;
  }
  set msg(x) {
    this.#msg = `hello ${x}`;
  }
}

const instance = new ClassWithGetSet();
console.log(instance.msg); // "hello world"

instance.msg = "cake";
console.log(instance.msg); // "hello cake"

// Using a computed property name
const expr = "foo";
const obj2 = {
  get [expr]() { return "bar"; }
};

// Defining static getters
class MyContants {
  static get foo() {
    return "foo";
  }
}
console.log(MyContants.foo); // 'foo'
MyContants.foo = 'bar';
console.log(MyContants.foo); // 'foo', a static getter's value cannot be changed

// The set syntax binds an object property to a function to be called when there is an attempt to set that property
const language = {
  set current(name) {
    this.log.push(name);
  },
  log: [],
};

language.current = 'EN';
language.current = 'FA';
console.log(language.log);
// -> ['EN', 'FA']

// INHERITANCE
class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }

  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}

let matrixSymm = new SymmetricMatrix(5, (x, y) => `${x}, ${y}`);
console.log(matrix.get(2, 3));
// -> 3, 2
// In a Symmetric matrix matching entries either side of the main diagonal are equal.
// THE INSTANCEOF OPERATOR
// It is a binary operator
console.log(
  new SymmetricMatrix(2) instanceof SymmetricMatrix);
// -> true
console.log(new SymmetricMatrix(2) instanceof Matrix)
// -> true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// -> false
console.log([1] instanceof Array);
// -> true

// EXERCISES
// A VECTOR TYPE
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(this.x + vector.x, this.y + vector.y);
  }
  minus(vector) {
    return new Vec(this.x - vector.x, this.y - vector.y);
  }
  get length() {
    return Math.sqrt((this.x * this.x) + (this.y + this.y));
  }
}

class Group {
  constructor(obj) {
    this.obj = obj;
  }
  add(element) {
    if (!this.obj.includes(element)) {
      this.obj.push(element);
      return this.obj;
    }
  }
  delete(element) {
    if (this.obj.includes(element)) {
      this.obj = this.obj.filter(value => value != element);
    }
  }
  has(element) {
    return this.obj.includes(element);
  }
  static from(obj) {
    return new Group(obj.map(element => element));
  }
}

class GroupIterator {
  constructor(group) {
    this.x = 0;
    this.group = group;
  }
  
  next() {
    if (this.x === this.group.obj.length) return {done: true}
    let value = {
      value: this.group.obj[this.x],
      done: false,
    };
    this.x += 1;
    return value;
  }
}

Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
};

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
