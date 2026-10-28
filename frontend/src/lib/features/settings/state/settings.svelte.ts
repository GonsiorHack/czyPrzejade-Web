import type { TextSize, Theme } from '../types/settings';

type Option<T extends string> = { value: T; label: string; description?: string };

export const themes: Option<Theme>[] = [
	{ value: 'light', label: 'Jasny' },
	{ value: 'dark', label: 'Ciemny' }
];

export const textSizes: Option<TextSize>[] = [
	{ value: 'standard', label: 'Standard' },
	{ value: 'large', label: 'Duży' },
	{ value: 'x-large', label: 'Bardzo duży' }
];

const STORAGE_KEY = 'krakow-dostepny:ustawienia';

function isOption<T extends string>(options: Option<T>[], value: unknown): value is T {
	return options.some((option) => option.value === value);
}

class AppSettings {
	theme = $state<Theme>('dark');
	highContrast = $state(false);
	textSize = $state<TextSize>('standard');
	visualTransitAlerts = $state(true);

	restore(storage: Storage) {
		let saved: unknown;
		try {
			saved = JSON.parse(storage.getItem(STORAGE_KEY) ?? 'null');
		} catch {
			return;
		}
		if (typeof saved !== 'object' || saved === null) return;

		const values = saved as Record<string, unknown>;
		if (isOption(themes, values.theme)) this.theme = values.theme;
		if (typeof values.highContrast === 'boolean') this.highContrast = values.highContrast;
		if (values.theme === 'contrast') {
			this.theme = 'dark';
			this.highContrast = true;
		}
		if (isOption(textSizes, values.textSize)) this.textSize = values.textSize;
		if (typeof values.visualTransitAlerts === 'boolean') {
			this.visualTransitAlerts = values.visualTransitAlerts;
		}
	}

	persist(storage: Storage) {
		const snapshot = JSON.stringify({
			theme: this.theme,
			highContrast: this.highContrast,
			textSize: this.textSize,
			visualTransitAlerts: this.visualTransitAlerts
		});
		try {
			storage.setItem(STORAGE_KEY, snapshot);
		} catch {}
	}
}

export const settings = new AppSettings();
