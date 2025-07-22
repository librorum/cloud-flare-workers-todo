/**
 * Custom assertion function - replacement for Node.js assert
 * @param {any} value - Value to test for truthiness
 * @param {string} message - Error message if assertion fails
 * @throws {Error} - Throws Error if value is falsy
 */
export const assert = (value, message = 'Assertion failed') => {
	if (!value) {
		throw new Error(message)
	}
}
