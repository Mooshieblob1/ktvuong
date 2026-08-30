/**
 * Contact details, stored as obfuscated tokens rather than text.
 *
 * Each token is Cloudflare's data-cfemail shape: the first byte is a random
 * XOR key, the rest is the value, all hex. Nothing readable ships in the
 * server-rendered markup or in the JS bundle, and decoding only runs when a
 * visitor asks for it, so a crawler that reads HTML (or greps the bundle for
 * an @) comes away with nothing. Someone who wants to reach Kent clicks once.
 *
 * Regenerate a token with: node encodeEmailForProtection.js "<value>"
 */

const EMAIL = 'caa1afa4be8aa1bebcbfa5a4ade4a9a5a7';
const PHONE = 'cde6fbfcedf9fdfdedf8fbf8edf5ffff';

function decode(token: string): string {
	const key = parseInt(token.slice(0, 2), 16);
	let out = '';
	for (let i = 2; i < token.length; i += 2) {
		out += String.fromCharCode(parseInt(token.slice(i, i + 2), 16) ^ key);
	}
	return out;
}

/** Call these on a user gesture, not at module scope: decoding is the reveal. */
export const contact = {
	email: () => decode(EMAIL),
	phone: () => decode(PHONE),
	/** Digits only, for a tel: href. */
	phoneHref: () => decode(PHONE).replace(/\s/g, '')
};
