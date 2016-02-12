'use strict';

// MODULES //

var tape = require( 'tape' );
var copy = require( 'utils-copy' );
var pluck = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof pluck, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided an array', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		null,
		undefined,
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			pluck( value, 'a' );
		};
	}
});

tape( 'the function throws an error if provided an invalid option', function test( t ) {
	t.throws( badOption, TypeError, 'throws an error' );
	t.end();

	function badOption() {
		pluck( [], 'a', {'copy':null} );
	}
});

tape( 'the function returns an empty array if provided an empty array', function test( t ) {
	var out;

	out = pluck( [], 'a' );
	t.deepEqual( out, [], 'returns an empty array' );

	out = pluck( [], 'a', {'copy':false} );
	t.deepEqual( out, [], 'returns an empty array (mutate)' );

	t.end();
});

tape( 'the function plucks a property value from each array element', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':1,'b':2},
		{'a':0.5,'b':3}
	];
	expected = [ 1, 0.5 ];

	actual = pluck( arr, 'a' );

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});

tape( 'by default, the function returns a new array', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':1,'b':2},
		{'a':0.5,'b':3}
	];
	expected = copy( arr );

	actual = pluck( arr, 'a' );

	t.notEqual( actual, arr, 'returns a new array reference' );
	t.deepEqual( arr, expected, 'input array is not mutated' );
	t.end();
});

tape( 'the function supports mutating an input array', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':1,'b':2},
		{'a':0.5,'b':3}
	];
	expected = [ 1, 0.5 ];

	actual = pluck( arr, 'a', {'copy':false} );

	t.equal( actual, arr, 'returns same array reference' );
	t.deepEqual( arr, expected, 'input array is mutated' );
	t.end();
});

tape( 'the function skips `undefined` and `null` elements (copy)', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':1,'b':2},
		null,
		undefined,
		{'a':0.5,'b':3}
	];

	expected = [ 1, , , 0.5 ];

	actual = pluck( arr, 'a' );

	t.deepEqual( actual, expected, 'skips undefined and null elements' );
	t.end();
});

tape( 'the function skips `undefined` and `null` elements (mutate)', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		{'a':1,'b':2},
		null,
		undefined,
		{'a':0.5,'b':3}
	];

	expected = [ 1, null, undefined, 0.5 ];

	actual = pluck( arr, 'a', {'copy':false} );

	t.deepEqual( actual, expected, 'skips undefined and null elements' );
	t.end();
});

tape( 'the function supports non-string property values', function test( t ) {
	var expected;
	var actual;
	var arr;

	arr = [
		[0,1,2],
		[3,4,5]
	];
	expected = [ 1, 4 ];

	actual = pluck( arr, 1 );

	t.deepEqual( actual, expected, 'deep equal' );
	t.end();
});