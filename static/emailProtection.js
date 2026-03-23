(function () {
	function processEmails() {
		document.querySelectorAll('[data-cfemail]').forEach(function (el) {
			var encoded = el.getAttribute('data-cfemail');
			if (!encoded || el.hasAttribute('data-decoded')) return;

			try {
				var key = parseInt(encoded.substr(0, 2), 16);
				var decoded = '';
				for (var i = 2; i < encoded.length; i += 2) {
					decoded += String.fromCharCode(parseInt(encoded.substr(i, 2), 16) ^ key);
				}

				el.setAttribute('data-decoded', 'true');
				el.addEventListener('click', function (e) {
					e.preventDefault();
					window.location.href = 'mailto:' + decoded;
				});
			} catch {
				return;
			}
		});
	}

	if (document.readyState !== 'loading') {
		processEmails();
	} else {
		document.addEventListener('DOMContentLoaded', processEmails);
	}
})();
