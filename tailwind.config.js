import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // This is the crucial line
	theme: {
		extend: {}
	},
	plugins: [typography]
};
