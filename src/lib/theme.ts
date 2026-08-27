/** Theme system: dark (default) and amber CRT. Persisted, applied pre-paint. */

export type ThemeName = 'dark' | 'amber';
const KEY = 'kv-theme';

export function getTheme(): ThemeName {
	const t = document.documentElement.dataset.theme;
	return t === 'amber' ? 'amber' : 'dark';
}

export function setTheme(t: ThemeName) {
	document.documentElement.dataset.theme = t;
	try {
		localStorage.setItem(KEY, t);
	} catch {
		/* private mode */
	}
}

export function cycleTheme() {
	setTheme(getTheme() === 'amber' ? 'dark' : 'amber');
}
