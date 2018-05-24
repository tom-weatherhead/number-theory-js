# number-theory-js

[![build status](https://secure.travis-ci.org/tom-weatherhead/number-theory-js.svg)](http://travis-ci.org/tom-weatherhead/number-theory-js)

number-theory-js is a library of JavaScript implementations of number theory utilities.

Most of this project's infrastructure was stolen from Jason Mulligan's ([avoidwork](https://github.com/avoidwork)'s) [tiny-graph](http://avoidwork.github.io/tiny-graph) project.

## Example
```javascript
const engine = require('number-theory-js');

console.log(engine.factorize(72)); // [2, 2, 2, 3, 3]

console.log(engine.gcd(35, 84)); // 7

console.log(engine.sieve(20)); // [2, 3, 5, 7, 11, 13, 17, 19]
```

## How can I use number-theory-js?
number-theory-js can be installed from npm and bower, and supports AMD loaders or script tags (e.g. `window.sieve`).

## API
#### gcd(m, n)
Returns the greatest common divisor of integers `m` and `n`, calculated using Euclid's algorithm

#### factorize(n)
Returns the unique prime factorization of `n` as a list of integers

#### sieve(n)
Returns the list of all prime numbers less than `n`, calculated using the Sieve of Eratosthenes

## License
Copyright (c) 2018 Tom Weatherhead
Licensed under the MIT license
