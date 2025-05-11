import { t } from '$lib/i18n/i18n';
import { get } from 'svelte/store';

const translate = get(t);
console.log(translate('about_heading'));
