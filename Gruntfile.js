// tom-weatherhead/number-theory-js/Gruntfile.js

'use strict';

const path = require('path');

// const babelTargetsClientSide = require('./config/babel-targets-client-side');
// const babelTargetsServerSide = require('./config/babel-targets-server-side');

module.exports = grunt => {
	const packageJsonFilename = 'package.json';
	const gruntfile = grunt.file.readJSON(packageJsonFilename);
	const getWebpackConfig = (mode, libraryTarget) => {
		// const babelTargets = libraryTarget === 'commonjs2' ? babelTargetsServerSide : babelTargetsClientSide;
		const babelTargets = libraryTarget === 'commonjs2' ?
			{
				'node': 'current'
			} :
			{
				'browsers': [
					{
						'chrome': 'last 2 versions',
						'firefox': 'last 2 versions',
						'ios_saf': '10'
					}
				],
				'ios': '10',
				'node': 'current'
			};

		// const filename = `${ gruntfile.shortName }-webpack-${mode}-${libraryTarget}${filenameSuffix}.js`;
		const filename = `${ gruntfile.shortName }-${libraryTarget}.js`;

		return {
			mode: mode,
			entry: './src/main.js',
			target: libraryTarget === 'commonjs2' ? 'node' : undefined, // See https://stackoverflow.com/questions/43915463/webpack-node-js-http-module-http-createserver-is-not-a-function
			output: {
				path: path.join(__dirname, 'dist'),
				filename: filename,
				library: gruntfile.shortName,
				// See https://webpack.js.org/configuration/output/#output-librarytarget
				libraryTarget: libraryTarget
			},
			// plugins: [
			// 	new HtmlWebpackPlugin({
			// 		template: 'src/index.html'
			// 	})
			// ],
			module: {
				rules: [
					{
						test: /\.js[x]?$/,
						exclude: /node_modules/,
						use: [
							{
								loader: 'babel-loader',
								options: {
									presets: [
										[
											'@babel/preset-env',
											{
												// targets: '> 0.25%, not dead'
												targets: babelTargets
											}
										]
									]
									// ,
									// plugins: [
									// 	'transform-class-properties'
									// 	? 2019-03-18 : Replace the above with @babel/plugin-proposal-class-properties ?
									// ]

									// From https://babeljs.io/docs/en/babel-plugin-transform-classes :

									// When extending a native class (e.g., class extends Array {}), the super class needs to be wrapped. This is needed to workaround two problems:
									//
									//     Babel transpiles classes using SuperClass.apply(/* ... */), but native classes aren't callable and thus throw in this case.
									//     Some built-in functions (like Array) always return a new object. Instead of returning it, Babel should treat it as the new this.

									// This plugin allows a class in this package to be used as the base class
									// of a class outside of this package:

									// $ npm i -D @babel/plugin-transform-classes

									// 'loose' defaults to false:
									// 'plugins': ['@babel/plugin-transform-classes']

									// 'plugins': [
									// 	['@babel/plugin-transform-classes', {
									// 		'loose': true
									// 	}]
									// ]
								}
							}
						]
					}
					// ,
					// {
					// 	test: /.css$/,
					// 	loader: "style-loader!css-loader"
					// }
				]
			} //,
			// devtool: 'source-map'
		};
	};

	grunt.initConfig({
		pkg: gruntfile,
		concat: {
			options: {
				banner: '/**\n' +
				' * <%= pkg.name %>\n' +
				' *\n' +
				' * @copyright <%= grunt.template.today(\'yyyy\') %> <%= pkg.author %>\n' +
				' * @license <%= pkg.license %>\n' +
				' * @version <%= pkg.version %>\n' +
				' */\n'
			},
			dist: {
				src: [
					'<banner>',
					'insertia/1.js',
					'dist/<%= pkg.shortName %>-commonjs2.js',
					'insertia/2.js',
					'dist/<%= pkg.shortName %>-global.js',
					'insertia/3.js'
				],
				dest: 'dist/<%= pkg.shortName %>.js'
			}
		},
		eslint: {
			target: [
				'*.js',
				'src/*.js',
				'test/*.js'
			]
		},
		nodeunit: {
			all: ['test/*test.js']
		},
		webpack: {
			// Possible values for libraryTarget: See https://webpack.js.org/configuration/output/#output-librarytarget :
			// amd, amd-require, assign, commonjs, commonjs2, global, jsonp, this, umd, var, window.
			prodcommonjs2: getWebpackConfig('production', 'commonjs2'),
			prodglobal: getWebpackConfig('production', 'global')
		}
	});

	// Tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-webpack');

	// Aliases
	grunt.registerTask('build', [
		'webpack:prodcommonjs2',
		'webpack:prodglobal', // We may want to use prodwindow instead.
		'concat'
	]);
	grunt.registerTask('test', ['eslint', 'nodeunit']);
	grunt.registerTask('default', ['eslint', 'build', 'concat', 'nodeunit']);
};
