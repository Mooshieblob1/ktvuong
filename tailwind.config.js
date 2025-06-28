/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#3b82f6',
				accent: '#0ea5e9',
				secondary: '#1e293b',
				background: '#0f172a'
			},
			fontFamily: {
				mono: ['JetBrains Mono', 'monospace']
			}
		}
	},
	plugins: []
};
