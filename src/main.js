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

		if (isNaN(n)) {
			throw new Error('Invalid argument');
		} else if (n < 2) {
			return [];
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

	function removeDuplicates (array) {
		return Array.from(new Set(array));
	}

	function totient (n) {
		const primeFactorsOfN = removeDuplicates(factorize(n));
		let result = n;

		primeFactorsOfN.forEach(p => {
			result = result * (p - 1) / p;
		});

		return result;
	}
