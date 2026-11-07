import { browser, defineBackground } from '#imports';
import { CHECK_ALARM, CHECK_INTERVAL_MINUTES, getSettings } from '../shared/settings';

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    void browser.alarms.create(CHECK_ALARM, {
      periodInMinutes: CHECK_INTERVAL_MINUTES,
    });
  });

  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === CHECK_ALARM) void checkForSevereWeather();
  });
});

interface AlertInfo {
  id: string;
  event: string;
  headline: string;
}

async function checkForSevereWeather(): Promise<void> {
  const { enabled } = await getSettings();
  if (!enabled) return;

  const alerts = await fetchActiveAlerts();
  // TODO: dedupe against previously notified alerts before notifying.
  for (const alert of alerts) {
    browser.notifications.create(alert.id, {
      type: 'basic',
      iconUrl: '/icon/128.png',
      title: alert.event,
      message: alert.headline,
      priority: 2,
    });
  }
}

/**
 * Fetch active severe/extreme alerts from the National Weather Service.
 * TODO: filter to the user's configured location instead of nationwide.
 */
async function fetchActiveAlerts(): Promise<AlertInfo[]> {
  const url =
    'https://api.weather.gov/alerts/active?status=actual&severity=severe,extreme&limit=5';
  try {
    const res = await fetch(url, { headers: { Accept: 'application/geo+json' } });
    if (!res.ok) return [];
    const data = (await res.json()) as {
      features: Array<{
        id: string;
        properties: { event: string; headline?: string };
      }>;
    };
    return data.features.map(({ id, properties }) => ({
      id,
      event: properties.event,
      headline: properties.headline ?? properties.event,
    }));
  } catch {
    return [];
  }
}
