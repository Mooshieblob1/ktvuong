// This file should be placed in your static assets folder
// It will be loaded asynchronously to make it harder to track

// Self-executing function to avoid polluting global namespace
(function() {

	// Process emails function (only adds click handlers, doesn't modify DOM href)
	function processEmails() {

		// Find all protected email elements
		const protectedElements = document.querySelectorAll('[data-cfemail]');

		protectedElements.forEach(function(element) {
			// Get the encoded email data
			const encodedData = element.getAttribute('data-cfemail');

			// Only proceed if we have encoded data
			if (!encodedData) {
				return;
			}

			try {
				// Decode using a variation of Cloudflare's approach
				const decoded = decodeCloudflareEmail(encodedData);

				// Store the decoded email but don't modify the href attribute
				// This keeps the email address out of the DOM
				element.setAttribute('data-decoded', 'true');

				// Only add click handler to handle the email action when clicked
				element.addEventListener('click', function(e) {
					e.preventDefault();
					const mailtoUrl = 'mailto:' + decoded;
					window.location.href = mailtoUrl;
				});
			} catch (err) {
				console.error('Failed to decode email address', err);
			}
		});
	}

	// Decoding function inspired by Cloudflare's approach
	function decodeCloudflareEmail(encodedString) {
		// Convert hex to bytes array
		let encoded = encodedString;

		// Handle both with and without the standard Cloudflare format
		if (encoded.indexOf('0x') === 0) {
			encoded = encoded.substr(2);
		}

		// Convert hex to bytes
		let r = "";
		let i = 0;
		let encoded_length = encoded.length;

		// Use a custom decoding approach rather than a direct Base64 decode
		for (i = 0; i < encoded_length; i += 2) {
			try {
				const hex = encoded.substr(i, 2);
				const num = parseInt(hex, 16);
				if (isNaN(num)) {
					console.error(`Invalid hex value at position ${i}: ${hex}`);
					continue;
				}

				const char_code = num ^ 0x1A; // XOR with a key
				r += String.fromCharCode(char_code);
			} catch (err) {
				console.error(`Error processing hex at position ${i}:`, err);
			}
		}

		return r;
	}

	// Try both event approaches to maximize compatibility
	// 1. Listen for DOMContentLoaded if it hasn't happened yet
	if (document.readyState !== 'loading') {
		processEmails();
	} else {
		document.addEventListener('DOMContentLoaded', processEmails);
	}

	// 2. Also set a timeout as a fallback
	setTimeout(processEmails, 500);
})();