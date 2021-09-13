/*

Challenge 1
Create a function createFunction that creates and returns a function. When that created function is 
called, it should print "hello". When you think you completed createFunction, un-comment out those 
lines in the code and run it to see if it works.


*/

function createFunction() {
  const innerCreateFunction = () => {
    console.log('hello');
  };

  return innerCreateFunction;
}

const function1 = createFunction();
function1(); // => should console.log('hello');

/*


Challenge 2
Create a function createFunctionPrinter that accepts one input and returns a function. When that created
function is called, it should print out the input that was used when the function was created.


*/

function createFunctionPrinter(input) {
  const innerFunction = () => {
    console.log(input);
  };
  return innerFunction;
}

const printSample = createFunctionPrinter('sample');
printSample(); // => should console.log('sample');

/*

Challenge 3
Examine the code for the outer function. Notice that we are returning a function and that function is using 
variables that are outside of its scope. Uncomment those lines of code. Try to deduce the output before 
executing. Now we are going to create a function addByX that returns a function that will add an input by 
x.

*/

function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log('counter', counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// /*** Uncomment these to check your work! ***/
willCounter(); //Guess => 1
willCounter(); //Guess => 2
willCounter(); //Guess => 3

jasCounter(); //Guess => 1
willCounter(); //Guess => 4

function addByX(x) {
  const innerFunction = input => {
    return x + input;
  };
  return innerFunction;
}

// /*** Uncomment these to check your work! ***/
const addByTwo = addByX(2);
//addByTwo(1); // => should return 3
//addByTwo(2); // => should return 4
//addByTwo(3); // => should return 5

//const addByThree = addByX(3);
//addByThree(1); // => should return 4
//addByThree(2); // => should return 5

//const addByFour = addByX(4);
//addByFour(4); // => should return 8
//addByFour(5); // => should return 9

/*

Challenge 4
Write a function once that accepts a callback as input and returns a function. When the returned function
is called the first time, it should call the callback and return that output. If it is called any 
additional times, instead of calling the callback again it will simply return the output value from the 
first time it was called.

*/

function once(func) {
  let counter = 0;
  let onceValue;
  const innerFunction = value => {
    if (counter === 0) {
      onceValue = func(value);
      counter++;
    }
    return onceValue;
  };
  return innerFunction;
}

// /*** Uncomment these to check your work! ***/
const onceFunc = once(addByTwo);
console.log(onceFunc(4)); // => should log 6
console.log(onceFunc(10)); // => should log 6
console.log(onceFunc(9001)); // => should log 6

/*

Challenge 5
Write a function after that takes the number of times the callback needs to be called before being executed 
as the first parameter and the callback as the second parameter.

*/

function after(count, func) {
  let counter = 0;
  const innerFunction = () => {
    if (counter === count) {
      return func();
    }
    counter++;
  };
  return innerFunction;
}

// /*** Uncomment these to check your work! ***/
const called = function () {
  console.log('hello');
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed

/*

Challenge 6
Write a function delay that accepts a callback as the first parameter and the wait in milliseconds before 
allowing the callback to be invoked as the second parameter. Any additional arguments after wait are 
provided to func when it is invoked. HINT: research setTimeout();

*/

function delay(func, wait) {
  setTimeout(() => {
    func();
  }, wait);
}

delay(function () {
  console.log('Closures are elegant');
}, 1000);

/*

Write a function rollCall that accepts an array of names and returns a function. The first time the 
returned function is invoked, it should log the first name to the console. The second time it is invoked,
it should log the second name to the console, and so on, until all names have been called. Once all names
have been called, it should log 'Everyone accounted for'.


*/

function rollCall(names) {
  let counter = 0;
  const innerFunction = () => {
    if (counter < names.length) {
      console.log(names[counter]);
      counter++;
    } else {
      console.log('Everyone accounted for');
    }
  };
  return innerFunction;
}

// /*** Uncomment these to check your work! ***/
const rollCaller = rollCall(['Victoria', 'Juan', 'Ruth', 'Jawad', 'Maaz']);
rollCaller(); // => should log 'Victoria'
rollCaller(); // => should log 'Juan'
rollCaller(); // => should log 'Ruth'
rollCaller(); // => should log 'Jawad'
rollCaller(); // => should log 'Maaz'
rollCaller(); // => should log 'Everyone accounted for'

/*

Challenge 8
Create a function saveOutput that accepts a function (that will accept one argument), and a string 
(that will act as a password). saveOutput will then return a function that behaves exactly like the
 passed-in function, except for when the password string is passed in as an argument. When this happens, 
 the returned function will return an object with all previously passed-in arguments as keys, and the 
 corresponding outputs as values.


 */

function saveOutput(func, magicWord) {
  let resultVal = {};

  const innerFunction = val => {
    if (val !== magicWord) {
      resultVal[val] = func(val);
      return func(val);
    } else {
      return resultVal;
    }
  };

  return innerFunction;
}

// /*** Uncomment these to check your work! ***/
const multiplyBy2 = function (num) {
  return num * 2;
};
const multBy2AndLog = saveOutput(multiplyBy2, 'boo');
console.log(multBy2AndLog(2)); // => should log 4
console.log(multBy2AndLog(9)); // => should log 18
console.log(multBy2AndLog(5)); // => should log 10
console.log(multBy2AndLog('boo')); // => should log { 2: 4, 9: 18 }

/*

Challenge 9
Create a function cycleIterator that accepts an array, and returns a function. The returned function will 
accept zero arguments. When first invoked, the returned function will return the first element of the array.
When invoked a second time, the returned function will return the second element of the array, and so forth. 
After returning the last element of the array, the next invocation will return the first element of the 
array again, and continue on with the second after that, and so forth.


*/

function cycleIterator(array) {
  let counter = 0;
  const innerFunction = () => {
    if (counter < array.length) {
      let val = array[counter];
      counter++;
      return val;
    } else {
      if (counter === array.length) {
        counter = 0;
        let val = array[counter];
        counter++;
        return val;
      }
    }
  };
  return innerFunction;
}

// /*** Uncomment these to check your work! ***/
const threeDayWeekend = ['Fri', 'Sat', 'Sun'];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log  'Sun'
console.log(getDay()); // => should log 'Fri'

/*

Challenge 10
Create a function defineFirstArg that accepts a function and an argument. Also, the function being passed 
in will accept at least one argument. defineFirstArg will return a new function that invokes the passed-in
function with the passed-in argument as the passed-in function's first argument. Additional arguments 
needed by the passed-in function will need to be passed into the returned function.

 */

function defineFirstArg(func, arg) {
  const innerFunction = val => {
    return func(arg, val);
  };
  return innerFunction;
}

// /*** Uncomment these to check your work! ***/
const subtract = function (big, small) {
  return big - small;
};
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15

/*

Challenge 11
Create a function dateStamp that accepts a function and returns a function. The returned function 
will accept however many arguments the passed-in function accepts, and return an object with a date 
key that contains a timestamp with the time of invocation, and an output key that contains the result 
from invoking the passed-in function. HINT: You may need to research how to access information on Date 
objects.

*/

function dateStamp(func) {
  const innerFunction = val => {
    let today = new Date();
    let date =
      today.getFullYear() +
      '/' +
      (today.getMonth() + 1) +
      '/' +
      today.getDate();
    return {
      date: date,
      output: func(val),
    };
  };
  return innerFunction;
}

// /*** Uncomment these to check your work! ***/
const stampedMultBy2 = dateStamp(n => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

/*

Challenge 12
Create a function censor that accepts no arguments. censor will return a function that will accept 
either two strings, or one string. When two strings are given, the returned function will hold onto 
the two strings as a pair, for future use. When one string is given, the returned function will return 
the same string, except all instances of first strings (of saved pairs) will be replaced with their 
corresponding second strings (of those saved pairs).

*/

// function censor() {
//   let arr = [];
//   const innerFunction = (...args) => {
//     if (args.length === 2) {
//       let obj = {
//         0: args[0],
//         1: args[1],
//       };
//       arr.push(obj);
//     } else {
//       let str = args[0];
//       let newStr = str.replace(arr[1][0], arr[1][1]);
//       return newStr.replace(arr[0][0], arr[0][1]);
//     }
//   };
//   console.log(arr);
//   return innerFunction;
// }

// function censor() {
//   let strings = {};

//   return function (str1, str2) {
//     if (str1 && str2) {
//       Object.assign(strings, {
//         [str1]: str2,
//         [str2]: str1,
//       });
//     } else {
//       return str1
//         .split(' ')
//         .map(s => s.replace(/\./g, '').replace(/\,/g, ''))
//         .map(s => {
//           if (strings[s]) {
//             console.log(strings[s]);
//             const regex = new RegExp(`${s}`, 'g');
//             return s.replace(regex, strings[s]);
//           }
//           return s;
//         })
//         .join(' ');
//     }
//   };
// }

// /*** Uncomment these to check your work! ***/
//const changeScene = censor();
//changeScene('dogs', 'cats');
//changeScene('quick', 'slow');
//changeScene('hello', 'world');
//console.log(changeScene('The quick, hello fox jumps over the lazy dogs.'));
// => should log 'The slow, brown fox jumps over the lazy cats.'

/*

Challenge 13
There's no such thing as private properties on a JavaScript object! But, maybe there are? Implement a 
function createSecretHolder(secret) which accepts any value as secret and returns an object with ONLY 
two methods. getSecret() which returns the secret setSecret() which sets the secret

*/

function createSecretHolder(secret) {
  return {
    getSecret() {
      return secret;
    },
    setSecret(newSecret) {
      secret = newSecret;
    },
  };
}

// /*** Uncomment these to check your work! ***/
const obj = createSecretHolder(5);
obj.getSecret(); // => returns 5
obj.setSecret(2);
obj.getSecret(); // => returns 2
