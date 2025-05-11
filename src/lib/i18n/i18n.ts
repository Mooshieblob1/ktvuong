// src/lib/i18n/i18n.ts
import { writable, derived } from 'svelte/store';
import en from './en.json';
import ja from './ja.json';

// Supported locales
export const locales = ['en', 'ja'] as const;
export type Locale = (typeof locales)[number];

// Export the locale store so you can call locale.set('ja')
export const locale = writable<Locale>('en');

// Translations
const translations: Record<Locale, Record<string, string>> = {
	en,
	ja
};

// Derived translation function store
export const t = derived(locale, ($locale) => {
	return (key: string): string =>
		translations[$locale]?.[key] ?? `[missing "${key}" in ${$locale}]`;
});
