Pluck
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Extract a property value from each element of an object array.


## Installation

``` bash
$ npm install utils-pluck
```


## Usage

``` javascript
var pluck = require( 'utils-pluck' );
```

#### pluck( arr, prop[, opts] )

Extracts a property value from each element of an object `array`.

``` javascript
var arr = [
	{'a':1,'b':2},
	{'a':0.5,'b':3}
];

var out = pluck( arr, 'a' );
// returns [ 1, 0.5 ]
```

The `function` accepts the following `options`:
*	__copy__: `boolean` indicating whether to return a new data structure. Default: `true`.

By default, the `function` returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [
	{'a':1,'b':2},
	{'a':0.5,'b':3}
];

var out = pluck( arr, 'a', {'copy':false} );
// returns [ 1, 0.5 ]

var bool = ( arr[ 0 ] === out[ 0 ] );
// returns true
```


## Notes

*	The `function` skips `null` and `undefined` array elements.
	
	``` javascript
	var arr = [
		{'a':1,'b':2},
		null,
		undefined,
		{'a':0.5,'b':3}
	];

	var out = pluck( arr, 'a' );
	// returns [ 1, , , 0.5 ]
	```

*	Extracted values are __not__ cloned.

	``` javascript
	var arr = [
		{'a':{'b':2}},
		{'a':{'b':3}}
	];

	var out = pluck( arr, 'a' );
	// returns [ {'b':2}, {'b':3} ]

	var bool = ( arr[ 0 ].a === out[ 1 ] );
	// returns true
	``` 

	To prevent unintended mutation, use [utils-copy][utils-copy].

	``` javascript
	var copy = require( 'utils-copy' );

	var arr = [
		{'a':{'b':2}},
		{'a':{'b':3}}
	];

	var out = pluck( arr, 'a' );
	// returns [ {'b':2}, {'b':3} ]

	// Perform a deep copy:
	out = copy( out );

	var bool = ( arr[ 0 ].a === out[ 1 ] );
	// returns false
	```


---
## Examples

``` javascript
var round = require( 'math-round' );
var pluck = require( 'utils-pluck' );

var arr = new Array( 100 );
var tmp;
var i;
var j;

// Generate a 100x5 2d-array...
for ( i = 0; i < arr.length; i++ ) {
	tmp = new Array( 5 );
	for ( j = 0; j < tmp.length; j++ ) {
		tmp[ j ] = round( Math.random()*100*(j+1) );
	}
	arr[ i ] = tmp;
}

// Pluck the 3rd column:
var out = pluck( arr, 2 );

console.log( out );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-pluck.svg
[npm-url]: https://npmjs.org/package/utils-pluck

[build-image]: http://img.shields.io/travis/kgryte/utils-pluck/master.svg
[build-url]: https://travis-ci.org/kgryte/utils-pluck

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/utils-pluck/master.svg
[coverage-url]: https://codecov.io/github/kgryte/utils-pluck?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-pluck.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-pluck

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-pluck.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-pluck

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-pluck.svg
[github-issues-url]: https://github.com/kgryte/utils-pluck/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[utils-copy]: https://github.com/kgryte/utils-copy