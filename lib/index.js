'use strict';

// MODULES //

var copy = require( 'utils-copy' );
var isArray = require( 'validate.io-array' );
var defaults = require( './defaults.json' );
var validate = require( './validate.js' );


// PLUCK //

/**
* FUNCTION: pluck( arr, prop[, options] )
*	Extracts a property value from each element of an object array.
*
* @param {Object[]} arr - source array
* @param {*} prop - property to access
* @param {Object} [options] - function options
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new data structure
* @returns {Array} destination array
*/
function pluck( arr, prop, options ) {
	var opts;
	var out;
	var err;
	var v;
	var i;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'invalid input argument. First argument must be an array. Value: `' + arr + '`.' );
	}
	opts = copy( defaults );
	if ( arguments.length > 2 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.copy ) {
		out = new Array( arr.length );
	} else {
		out = arr;
	}
	for ( i = 0; i < arr.length; i++ ) {
		v = arr[ i ];
		if (
			v !== void 0 &&
			v !== null &&
			v.hasOwnProperty( prop )
		) {
			out[ i ] = v[ prop ];
		}
	}
	return out;
} // end FUNCTION pluck()


// EXPORTS //

module.exports = pluck;
