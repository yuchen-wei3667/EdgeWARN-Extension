import { storage } from '#imports';

/** Name of the periodic background alarm that checks for new weather alerts. */
export const CHECK_ALARM = 'weather-check';

/** How often (minutes) the background worker polls for severe weather alerts. */
export const CHECK_INTERVAL_MINUTES = 1;

export const ALERT_TONES = [
  { value: 'ding', label: 'Ding' },
  { value: 'chime', label: 'Chime' },
  { value: 'siren', label: 'Siren' },
] as const;

export type AlertTone = (typeof ALERT_TONES)[number]['value'];

export interface Settings {
  /** Master switch: poll for alerts and show notifications. */
  enabled: boolean;
  /** Which alert tone to play for new notifications. */
  tone: AlertTone;
}

export const DEFAULT_SETTINGS: Settings = {
  enabled: true,
  tone: 'ding',
};

const settingsItem = storage.defineItem<Settings>('local:settings', {
  fallback: DEFAULT_SETTINGS,
});

export function getSettings(): Promise<Settings> {
  return settingsItem.getValue();
}

/** Merge a partial settings patch on top of the currently stored settings. */
export async function setSettings(patch: Partial<Settings>): Promise<Settings> {
  const current = await settingsItem.getValue();
  const next = { ...current, ...patch };
  await settingsItem.setValue(next);
  return next;
}
