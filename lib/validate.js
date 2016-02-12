'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isBoolean = require( 'validate.io-boolean-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object 
* @param {Object} options - options to validate
* @param {Boolean} [options.copy] - boolean indicating whether to return a new data structure
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( 'invalid option. Copy option must be a boolean primitive. Option: `' + opts.copy + '`.' );
		}
	}	
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
