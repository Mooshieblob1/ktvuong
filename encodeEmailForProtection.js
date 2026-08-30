/**
 * Dev utility: encode a contact detail for src/lib/data/contact.ts.
 *
 * Emits the Cloudflare-style token the site decodes: the first byte is the
 * XOR key, the rest is the value, all hex. The key is random per run, so two
 * details never share a pattern.
 *
 *   node encodeEmailForProtection.js "kent@ktvuong.com"
 *   node encodeEmailForProtection.js "+61 400 565 822"
 */

function encode(value, key = 1 + Math.floor(Math.random() * 254)) {
	let out = key.toString(16).padStart(2, '0');
	for (let i = 0; i < value.length; i++) {
		out += (value.charCodeAt(i) ^ key).toString(16).padStart(2, '0');
	}
	return out;
}

function decode(token) {
	const key = parseInt(token.slice(0, 2), 16);
	let out = '';
	for (let i = 2; i < token.length; i += 2) {
		out += String.fromCharCode(parseInt(token.slice(i, i + 2), 16) ^ key);
	}
	return out;
}

const value = process.argv[2];
if (!value) {
	console.error('usage: node encodeEmailForProtection.js "<value to encode>"');
	process.exit(1);
}

const token = encode(value);
console.log('token:      ', token);
console.log('decodes to: ', decode(token));
