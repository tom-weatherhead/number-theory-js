	// Node, AMD, and window are supported.

	const version = '{{VERSION}}';

	if (typeof exports !== 'undefined') {
		module.exports = {
			version: version,
			gcd: gcd,
			gcdExtended: gcdExtended,
			sieve: sieve,
			factorize: factorize,
			condenseFactorList: condenseFactorList,
			divisors: divisors,
			isPerfect: isPerfect,
			totient: totient
		};
	} else if (typeof define === 'function' && define.amd !== void 0) {
		define(() => {
			return {
				version: version,
				gcd: gcd,
				gcdExtended: gcdExtended,
				sieve: sieve,
				factorize: factorize,
				condenseFactorList: condenseFactorList,
				divisors: divisors,
				isPerfect: isPerfect,
				totient: totient
			};
		});
	} else {
		global.gcd = gcd;
		global.gcdExtended = gcdExtended;
		global.sieve = sieve;
		global.factorize = factorize;
		global.condenseFactorList = condenseFactorList;
		global.divisors = divisors;
		global.isPerfect = isPerfect;
		global.totient = totient;
	}
}(typeof window !== 'undefined' ? window : global));
