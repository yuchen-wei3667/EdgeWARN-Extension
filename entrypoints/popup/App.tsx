import { browser } from '#imports';
import { useEffect, useState } from 'react';
import {
  ALERT_TONES,
  getSettings,
  setSettings,
  type Settings,
} from '../../shared/settings';

export default function App() {
  const [settings, setSettingsState] = useState<Settings | null>(null);

  useEffect(() => {
    void getSettings().then(setSettingsState);
  }, []);

  async function toggleEnabled() {
    if (!settings) return;
    const next = await setSettings({ enabled: !settings.enabled });
    setSettingsState(next);
  }

  if (!settings) return null;

  const toneLabel =
    ALERT_TONES.find((tone) => tone.value === settings.tone)?.label ?? settings.tone;

  return (
    <main className="popup">
      <h1>EdgeWARN</h1>
      <label className="row">
        <input
          type="checkbox"
          checked={settings.enabled}
          onChange={toggleEnabled}
        />
        Severe weather alerts {settings.enabled ? 'on' : 'off'}
      </label>
      <p className="hint">Alert tone: {toneLabel}</p>
      <button type="button" onClick={() => void browser.runtime.openOptionsPage()}>
        Settings
      </button>
    </main>
  );
}
