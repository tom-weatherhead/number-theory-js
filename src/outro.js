	// Node, AMD, and window are supported.

	const version = '{{VERSION}}';

	if (typeof exports !== 'undefined') {
		module.exports = {
			version: version,
			gcd: gcd,
			sieve: sieve,
			factorize: factorize
		};
	} else if (typeof define === 'function' && define.amd !== void 0) {
		define(() => {
			return {
				version: version,
				gcd: gcd,
				sieve: sieve,
				factorize: factorize
			};
		});
	} else {
		global.gcd = gcd;
		global.sieve = sieve;
		global.factorize = factorize;
	}
}(typeof window !== 'undefined' ? window : global));
