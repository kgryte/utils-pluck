'use strict';

var round = require( 'math-round' );
var pluck = require( './../lib' );

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