// This file should be placed in your static assets folder
// It will be loaded asynchronously with a random query string to make it harder to track

// Self-executing function to avoid polluting global namespace
(function() {
	console.log("Email protection script loaded");

	// Helper function to process emails
	function processEmails() {
		console.log("Processing emails");

		// Find all protected email elements
		const protectedElements = document.querySelectorAll('[data-cfemail]');
		console.log("Found protected elements:", protectedElements.length);

		protectedElements.forEach(function(element) {
			// Get the encoded email data
			const encodedData = element.getAttribute('data-cfemail');
			console.log("Processing element with data:", encodedData);

			// Only proceed if we have encoded data
			if (!encodedData) {
				console.log("No encoded data found, skipping");
				return;
			}

			try {
				// Decode using a variation of Cloudflare's approach
				const decoded = decodeCloudflareEmail(encodedData);
				console.log("Successfully decoded to:", decoded);

				// If this is a link element, update its href
				if (element.tagName.toLowerCase() === 'a') {
					console.log("Updating link element");
					element.setAttribute('href', 'mailto:' + decoded);

					// Add click handler as backup
					element.addEventListener('click', function(e) {
						console.log("Email link clicked");
						e.preventDefault();
						const mailtoUrl = 'mailto:' + decoded;
						console.log("Opening email with URL:", mailtoUrl);
						window.location.href = mailtoUrl;
					});
				} else {
					// For non-link elements, just update the text
					console.log("Updating non-link element text");
					element.textContent = decoded;
				}
			} catch (err) {
				console.error('Failed to decode email address', err);
			}
		});
	}

	// Decoding function inspired by Cloudflare's approach
	function decodeCloudflareEmail(encodedString) {
		if (!encodedString || typeof encodedString !== "string") {
			console.error("Invalid input string");
			return "";
		}

		let encoded = encodedString.toLowerCase();

		if (encoded.startsWith("0x")) {
			encoded = encoded.substr(2);
		}

		if (encoded.length % 2 !== 0) {
			console.error("Encoded string length is not even, invalid input");
			return "";
		}

		let r = "";
		const encoded_length = encoded.length;

		for (let i = 0; i < encoded_length; i += 2) {
			const hex = encoded.substr(i, 2);
			const num = parseInt(hex, 16);

			if (isNaN(num)) {
				console.error(`Invalid hex value at position ${i}: ${hex}`);
				continue;
			}

			const char_code = num ^ 0x1A; // XOR with a key
			r += String.fromCharCode(char_code);
		}

		return r;
	}

	// Try both event approaches to maximize compatibility
	// 1. Listen for DOMContentLoaded if it hasn't happened yet
	if (document.readyState !== 'loading') {
		console.log("Document already loaded, processing immediately");
		processEmails();
	} else {
		console.log("Waiting for DOMContentLoaded event");
		document.addEventListener('DOMContentLoaded', processEmails);
	}

	// 2. Also set a timeout as a fallback
	setTimeout(processEmails, 500);
})();