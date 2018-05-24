const path = require('path');
const engine = require(path.join(__dirname, '..', 'lib', 'number-theory-js.js'));	// Or just: require('..'); ?

exports.lifecycle = {
	test: function (test) {
		test.expect(16);

		test.equal(engine.gcd(35, 84),				7,										'Should be 7');
		test.equal(engine.gcd(24, 80),				8,										'Should be 8');
		test.equal(engine.gcd(-64, 14),			 	2,										'Should be 2');
		test.equal(engine.gcd(31, -120),			1,										'Should be 1');
		test.equal(engine.gcd(-259, -74),			37,										'Should be 37');
		test.equal(engine.gcd(0, 15),				15,										'Should be 15');
		test.equal(engine.gcd(77, 0),				77,										'Should be 77');

		test.deepEqual(engine.sieve(2),				[],										'Should be []');
		test.deepEqual(engine.sieve(3),				[2],									'Should be [2]');
		test.deepEqual(engine.sieve(10),			[2, 3, 5, 7],							'Should be [2, 3, 5, 7]');
		test.deepEqual(engine.sieve(20),			[2, 3, 5, 7, 11, 13, 17, 19],			'Should be [2, 3, 5, 7, 11, 13, 17, 19]');

		test.deepEqual(engine.factorize(2),			[2],									'Should be [2]');
		test.deepEqual(engine.factorize(4),			[2, 2],									'Should be [2, 2]');
		test.deepEqual(engine.factorize(6),			[2, 3],									'Should be [2, 3]');
		test.deepEqual(engine.factorize(8),			[2, 2, 2],								'Should be [2, 2, 2]');
		test.deepEqual(engine.factorize(72),		[2, 2, 2, 3, 3],						'Should be [2, 2, 2, 3, 3]');

		test.done();
	}
};
