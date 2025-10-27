/**
 * Dark mode theme store using Svelte 5 runes
 */

import { browser } from '$app/environment';

class ThemeStore {
	theme = $state('light');

	constructor() {
		// Initialize theme from localStorage or system preference
		if (browser) {
			const stored = localStorage.getItem('theme');
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

			this.theme = stored || (prefersDark ? 'dark' : 'light');
			this.applyTheme();

			// Listen for system theme changes
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!localStorage.getItem('theme')) {
					this.theme = e.matches ? 'dark' : 'light';
					this.applyTheme();
				}
			});
		}
	}

	toggle() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		this.applyTheme();
		if (browser) {
			localStorage.setItem('theme', this.theme);
		}
	}

	applyTheme() {
		if (browser) {
			if (this.theme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
}

export const themeStore = new ThemeStore();
