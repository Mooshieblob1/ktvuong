import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeEmail } from '../encodeEmailForProtection.js';

function decodeCloudflareEmail(encodedString) {
  let encoded = encodedString;
  if (encoded.indexOf('0x') === 0) {
    encoded = encoded.substr(2);
  }
  let r = '';
  for (let i = 0; i < encoded.length; i += 2) {
    const hex = encoded.substr(i, 2);
    const num = parseInt(hex, 16);
    if (!Number.isNaN(num)) {
      r += String.fromCharCode(num ^ 0x1a);
    }
  }
  return r;
}

test('encodeEmail and decodeCloudflareEmail round-trip', () => {
  const email = 'test@example.com';
  const encoded = encodeEmail(email);
  const decoded = decodeCloudflareEmail(encoded);
  assert.equal(decoded, email);
});
