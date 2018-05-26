	// See https://en.wikipedia.org/wiki/Group_(mathematics)
	// See https://en.wikipedia.org/wiki/Group_theory
	// See https://www.geeksforgeeks.org/number-theory-interesting-facts-and-algorithms/

	/**
	 * gcd
	 *
	 * @method gcd
	 * @param  {Mixed}   m          String, Int or Float representation of the first number
	 * @param  {Mixed}   n          String, Int or Float representation of the second number
	 * @return {Int}                The greatest common divisor of m and n
	 */
	function gcd (m, n) {
		// See https://en.wikipedia.org/wiki/Euclidean_algorithm

		m = parseInt(m, 10);
		n = parseInt(n, 10);

		if (isNaN(m) || isNaN(n)) {
			throw new Error('Invalid arguments');
		// } else if (m < 0) {		// Unnecessary check; implicitly handled by the following two checks.
			// return gcd(-m, n);
		} else if (n < 0) {
			return gcd(m, -n);
		} else if (m < n) {
			return gcd(n, m);
		} else if (n === 0) {
			return m;
		} else {
			return gcd(n, m % n);
		}
	}

	// Partial application for functional programming:
	gcd.partial = m => n => gcd(m, n);

	/**
	 * gcdExtended
	 *
	 * @method gcdExtended
	 * @param  {Mixed}   a          String, Int or Float representation of the first number
	 * @param  {Mixed}   b          String, Int or Float representation of the second number
	 * @return {Object}             Object containing keys x, y, and g such that a * x + b * y === g. g is the greatest common divisor of a and b.
	 */
	function gcdExtended (a, b) {
		// See https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
		// See https://www.geeksforgeeks.org/euclidean-algorithms-basic-and-extended/

		a = parseInt(a, 10);
		b = parseInt(b, 10);

		if (isNaN(a) || isNaN(b)) {
			throw new Error('Invalid arguments');
		}

		if (a === 0) {
			return {
				x: 0,
				y: 1,
				g: b
			};
		}

		const gcdResultObject = gcdExtended(b % a, a);

		// console.log('gcdExtended:', gcdResultObject);

		return {
			x: gcdResultObject.y - Math.floor(b / a) * gcdResultObject.x,
			y: gcdResultObject.x,
			g: gcdResultObject.g
		};
	}

	/**
	 * isPrime
	 *
	 * @method isPrime
	 * @param  {Int}   		m          		The integer to be tested
	 * @param  {Array<Int>}	primes          The array of primes found thus far
	 * @return {Boolean}                	The Boolean that indicates whether or not m is prime
	 */
	function isPrime (m, primes) {

		for (let p of primes) {

			if (p * p > m) {
				return true;
			}

			if (m % p === 0) {
				return false;
			}
		}

		return true;
	}

	/**
	 * sieve
	 *
	 * @method sieve
	 * @param  {Mixed}   n          		String, Int or Float representation of the ceiling
	 * @return {Array<Int>}                	The list of prime numbers less than n
	 */
	function sieve (n) {					// eslint-disable-line no-unused-vars
		// See https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

		// Ensure than n is an integer. Convert if necessary.
		n = parseInt(n, 10);

		if (isNaN(n)) {
			throw new Error('Invalid argument');
		} else if (n <= 2) {
			return [];
		}

		let primes = [2];

		for (let m = 3; m < n; m += 2) {

			if (isPrime(m, primes)) {
				primes.push(m);
			}
		}

		return primes;
	}

	/**
	 * factorize
	 *
	 * @method factorize
	 * @param  {Mixed}   n          		String, Int or Float representation of n, the integer to factorize
	 * @return {Array<Int>}                	The list of prime factors of n
	 */
	function factorize (n) {					// eslint-disable-line no-unused-vars
		n = parseInt(n, 10);

		if (isNaN(n) || n < 2) {
			throw new Error('Invalid argument');
		}

		let primes = [];
		let factors = [];
		let m = 2;
		let m_increment = 1;

		//while (true) {		// eslint-disable-line no-constant-condition
		for (;;) {

			if (m * m > n) {
				factors.push(n);

				return factors;
			}

			if (isPrime(m, primes)) {
				primes.push(m);

				while (n % m === 0) {
					n /= m;
					factors.push(m);

					if (n === 1) {
						return factors;
					}
				}
			}

			m += m_increment;
			m_increment = 2;
		}

		// Unreachable code:
		//console.log('Return 3', original_n, n, primes, factors);

		//return factors;
	}

	/**
	 * condenseFactorList
	 *
	 * @method condenseFactorList
	 * @param  {Array<Int>}   factors			The prime factorization of a positive integer
	 * @return {Object}							The factors after grouping. The object's keys are primes, and the corresponding values are exponents.
	 */
	function condenseFactorList (factors) {
		// E.g. [ 2, 2, 2, 3, 3, 5, 7 ] -> { '2': 3, '3': 2, '5': 1, '7': 1 }
		let result = {};

		factors.forEach(p => {
			result[p] = (result[p] || 0) + 1;
		});

		return result;
	}

	function divisorHelper (factorsAsObject, primeFactors, i, numPrimeFactors, accumulator) {
		//console.log(`divisorHelper() : factorsAsObject = ${factorsAsObject} ; primeFactors = ${primeFactors} ; i = ${i} ; numPrimeFactors = ${numPrimeFactors} ; accumulator = ${accumulator}`);

		if (i >= numPrimeFactors) {
			//console.log('Returning:', [accumulator]);

			return [accumulator];
			//return Array.from(accumulator);
		}

		const p = primeFactors[i];
		let result = [];

		for (let j = 0; j <= factorsAsObject[p]; j++) {
			const result2 = divisorHelper(factorsAsObject, primeFactors, i + 1, primeFactors.length, accumulator);

			//console.log('concat', result, 'with', result2);
			result = result.concat(result2);
			//console.log('concat result:', result);
			accumulator *= p;
		}

		return result;
	}

	function divisors (n) {
		const factorsAsObject = condenseFactorList(factorize(n));
		//console.log('factorsAsObject =', factorsAsObject);
		const primeFactors = Object.keys(factorsAsObject).map(p => parseInt(p, 10));
		//console.log('primeFactors =', primeFactors);
		//let result = divisorHelper(factorsAsObject, primeFactors, 0, primeFactors.length, 1);

		//result.sort();					// Sorts the array in place. Lexicographic sort.
		// result.sort((a, b) => a - b);		// Sorts the array in place. Numeric sort.

		// return result;

		//return result.sort((a, b) => a - b);		// Sorts the array in place. Numeric sort.

		return divisorHelper(factorsAsObject, primeFactors, 0, primeFactors.length, 1).sort((a, b) => a - b);
	}

	function sum (array) {
		return array.reduce((accumulator, m) => accumulator + m, 0);
	}

	function isPerfect (n) {
		return sum(divisors(n)) === 2 * n;
	}

	function removeDuplicates (array) {
		return Array.from(new Set(array));
	}

	function totient (n) {
		// See https://en.wikipedia.org/wiki/Euler%27s_totient_function
		// See https://www.geeksforgeeks.org/eulers-totient-function/

		n = parseInt(n, 10);

		if (isNaN(n) || n < 2) {
			throw new Error('Invalid argument');
		}

		/*
		const primeFactorsOfN = removeDuplicates(factorize(n));
		let result = n;

		primeFactorsOfN.forEach(p => {
			result = result * (p - 1) / p;
		});

		return result;
		*/

		return removeDuplicates(factorize(n)).reduce((accumulator, p) => accumulator * (p - 1) / p, n);
	}
