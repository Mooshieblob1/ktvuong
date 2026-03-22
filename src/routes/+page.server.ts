import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	contact: async ({ request, platform }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const message = data.get('message')?.toString().trim();

		if (!name || !email || !message) {
			return fail(400, { error: 'All fields are required.' });
		}

		const apiKey = platform?.env?.RESEND_API_KEY;
		if (!apiKey) {
			return fail(500, { error: 'Server configuration error.' });
		}

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				from: 'Portfolio Contact <noreply@ktvuong.com>',
				to: 'kent@ktvuong.com',
				subject: `Portfolio message from ${name}`,
				reply_to: email,
				text: `Name: ${name}\nEmail: ${email}\n\n${message}`
			})
		});

		if (!res.ok) {
			return fail(500, { error: 'Failed to send message. Please try again.' });
		}

		return { success: true };
	}
};
