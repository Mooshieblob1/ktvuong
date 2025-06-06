/**
 * Use this utility during development to encode your email addresses
 * Run this script with Node.js to encode your email
 */

import { fileURLToPath } from 'node:url';

// The email to encode when running this file directly
const emailToEncode = 'kent@ktvuong.com';

// XOR key used in the decoder (must match the one in emailProtection.js)
export const XOR_KEY = 0x1a;

/**
 * Encodes an email address using a Cloudflare-like encoding approach
 *
 * @param {string} email - The email address to encode
 * @returns {string} - The encoded email
 */
export function encodeEmail(email) {
	let result = '';

	// Convert each character to its hex representation after XOR with key
	for (let i = 0; i < email.length; i++) {
		const charCode = email.charCodeAt(i) ^ XOR_KEY;
		const hexChar = charCode.toString(16).padStart(2, '0');
		result += hexChar;
	}

	return result;
}

// Test decoding to confirm it works
export function decodeEmail(encoded) {
	if (encoded.length % 2 !== 0) {
		throw new Error('Encoded string must have an even length.');
	}

	if (encoded === '') {
		return '';
	}

	const chars = [];
	for (let i = 0; i < encoded.length; i += 2) {
		const hexPair = encoded.slice(i, i + 2);
		const charCode = parseInt(hexPair, 16);

		if (isNaN(charCode)) {
			throw new Error(`Invalid hex character in input: ${hexPair}`);
		}

		chars.push(String.fromCharCode(charCode ^ XOR_KEY));
	}
	return chars.join('');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	const encodedEmail = encodeEmail(emailToEncode);
	console.log('Original email:', emailToEncode);
	console.log('Encoded email (use this in data-cfemail attribute):', encodedEmail);
	console.log('Decoded to verify:', decodeEmail(encodedEmail));
}
