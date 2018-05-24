// number-theory-js/examples/script.js

// To disable an eslint warning or error for an entire file, use this syntax: /* eslint no-alert: 0 */

// See https://stackoverflow.com/questions/34764287/turning-off-eslint-rule-for-a-specific-file

'use strict';

function callGCD() {
	const m = document.getElementById('mGCD').value;
	const n = document.getElementById('nGCD').value;
	const result = gcd(m, n);
	
	console.log('callGCD() : m is', m, '; n is', n);
	console.log('callGCD() : result is', result);
	
	document.getElementById('resultGCD').innerHTML = result.toString();
}

function callSieve() {
	const n = document.getElementById('nSieve').value;
	const result = sieve(n);
	
	console.log('callSieve() : n is', n);
	console.log('callSieve() : result is', result);
	
	document.getElementById('resultSieve').innerHTML = '[' + result.toString() + ']';
}

function callFactorize() {
	const n = document.getElementById('nFactorize').value;
	const result = factorize(n);
	
	console.log('callFactorize() : n is', n);
	console.log('callFactorize() : result is', result);
	
	document.getElementById('resultFactorize').innerHTML = '[' + result.toString() + ']';
}
