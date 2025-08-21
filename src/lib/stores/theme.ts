import { browser } from '$app/environment';
import { writable } from 'svelte/store';

type Theme = 'light' | 'dark' | 'system';

const defaultValue: Theme = 'system';
// On the server, always use the default. In the browser, get the stored theme or use the default.
const initialValue = browser ? (window.localStorage.getItem('theme') as Theme) ?? defaultValue : defaultValue;

const theme = writable<Theme>(initialValue);

// This subscription runs whenever the theme store changes.
theme.subscribe((value) => {
    if (browser) {
        // Save the user's preference to local storage.
        window.localStorage.setItem('theme', value);

        // Apply the 'dark' class to the <html> element based on the theme.
        if (value === 'system') {
            // If 'system', check the OS preference and apply/remove the class.
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', systemTheme);
        } else {
            // If 'light' or 'dark', directly apply/remove the class.
            document.documentElement.classList.toggle('dark', value === 'dark');
        }
    }
});

export default theme;