/**
 * Generate a random string ID with specified length.
 */
export const generate = (length) => {
	let id = '';
	length = length || 8;

	for (let i = 0; i < length; i++) {
		let code = Math.floor(Math.random() * 26);
		id += String.fromCharCode('a'.charCodeAt(0) + code);
	}

	return id;
}