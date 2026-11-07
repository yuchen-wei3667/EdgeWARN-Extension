import { useEffect, useState } from 'react';
import {
  ALERT_TONES,
  getSettings,
  setSettings,
  type AlertTone,
  type Settings,
} from '../../shared/settings';

export default function App() {
  const [settings, setSettingsState] = useState<Settings | null>(null);

  useEffect(() => {
    void getSettings().then(setSettingsState);
  }, []);

  async function selectTone(tone: AlertTone) {
    const next = await setSettings({ tone });
    setSettingsState(next);
  }

  if (!settings) return null;

  return (
    <main className="options">
      <h1>EdgeWARN Settings</h1>
      <fieldset>
        <legend>Alert tone</legend>
        {ALERT_TONES.map((tone) => (
          <label key={tone.value} className="row">
            <input
              type="radio"
              name="tone"
              checked={settings.tone === tone.value}
              onChange={() => void selectTone(tone.value)}
            />
            {tone.label}
          </label>
        ))}
      </fieldset>
      {/* TODO: play a sample of the selected tone here. */}
    </main>
  );
}
