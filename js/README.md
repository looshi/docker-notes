```js
// JS stuff I can never remember ...


// ------------- Node Callback Queues ----------------
/*

When the callstack is empty, js will grab the next item
from one of callback queues and add it to the callstack.
So, the various queues wait for the callstack to be empty.
The event loop checks the callstack on each tick, when callstack
is empty it will grab the next item from a Queue.
in order of priority:

MicroTask Queue
  process.nextTick
  promises

Timer Queue
   setTimeout schedules the time a fn is added here,
   not when it is actually ran.


IO Queue
  filesystem, network socket


Check Queue
  setImmediate - will run after the IO Queue is done


Close Queue
  any "close" event listeners

*/

// ---------------- Generators ----------------

function* myGenerator() {
  let a = 1;
  while (a < 5) {
    yield a++;
  }
}
const g = myGenerator();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
/*
outputs:
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: 4, done: false }
{ value: undefined, done: true }
{ value: undefined, done: true }
*/


//  a custom iterable ( example from mdn )
//  Any object with a the Symbol.iterator property can be "iterated" similar to a generator
// In this case the iterator has the "*"
const myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}
// Can be used like this:
for (let value of myIterable) {
    console.log(value);
}
[...myIterable]; // [1, 2, 3]

// Can also be written like this, are these the same ?
const iterable1 = {};
iterable1[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log([...iterable1]);
// expected output: Array [1, 2, 3]



// ----------------- Async Await ----------------

const fs = require('fs').promises;
// const { promisify } = require('util');
// promisify(fs.readFile) ( prior to fs promises )


async function looshi() {
  const d = await fs.readFile('./package-lock.json');
  return d;
}

async function loglooshi() {
  const res = await looshi();
  console.log("looshi ------------->", res);
}
loglooshi();
/*
outputs
looshi -------------> <Buffer 7b 0a 20 20 22 6e 61 6d 65 22 ... >
*/




// ---------------- For Await Of ----------------

function* myGenerator() {
  let a = 1;
  while (a < 5) {
    yield a++;
  }
}

// for await ( has be inside an async fn )
const g = myGenerator();
(async () => {
  for await (var result of g) {
    console.log('result', result);
  }
})();
/*
outputs:
result 1
result 2
result 3
result 4
*/


// ---------------- Promises ----------------

// promisifiying, something like this:
const promisify = function (fn) {
  return function (args) {
    return new Promise((resolve, reject) => {
      fn(args, (err, cb) => {
        return err ? reject(err) : resolve(cb);
      });
    });
  }
}

const readFileP = promisify(fs.readFile);
readFileP('./index.html')
  .then(data => { console.log('data', data) });
  .catch(error => { console.log('error', error) });

```
