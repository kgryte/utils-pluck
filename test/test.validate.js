'use strict';

// MODULES //

var tape = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof validate, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns an error if not provided an options object', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[ i ] );
		t.ok( err instanceof TypeError, 'returns a type error when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function returns an error if provided a `copy` option which is not a boolean primitive', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		{},
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'copy': values[ i ]
		});
		t.ok( err instanceof TypeError, 'returns a type error when provided ' + values[ i ] );
	}
	t.end();
});

tape( 'the function returns `null` if all options are valid', function test( t ) {
	var opts;
	var err;

	opts = {
		'copy': true
	};
	err = validate( {}, opts );
	t.equal( err, null, 'returns null' );
	t.end();
});

tape( 'the function ignores unrecognized options', function test( t ) {
	var opts;
	var err;

	opts = {
		'beep': 'boop',
		'a': 'b'
	};
	err = validate( {}, opts );
	t.equal( err, null, 'returns null' );
	t.end();
});