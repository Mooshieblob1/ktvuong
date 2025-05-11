import type { Config } from 'sveltekit-i18n';

export const config: Config = {
	fallbackLocale: 'en',
	loaders: [
		{
			locale: 'en',
			key: '',
			loader: async () => (await import('./en.json')).default
		},
		{
			locale: 'ja',
			key: '',
			loader: async () => (await import('./ja.json')).default
		}
	]
};
