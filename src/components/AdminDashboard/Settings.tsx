import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateSettings } from '../../services/tauri-api';
import './Settings.css';

const Settings = () => {
    const { t } = useTranslation();
    const [milkAlarmTime, setMilkAlarmTime] = useState('');
    const [breadAlarmTime, setBreadAlarmTime] = useState('');
    const [snoozeTime, setSnoozeTime] = useState(15);
    const [dailyPresetPrices, setDailyPresetPrices] = useState({ lunch: 0, transport: 0 });

    const handleSaveSettings = async () => {
        const settings = {
            milkAlarmTime,
            breadAlarmTime,
            snoozeTime,
            dailyPresetPrices,
        };
        await updateSettings(settings);
        alert(t('settings.saved'));
    };

    return (
        <div className="settings-container">
            <h2>{t('settings.title')}</h2>
            <div className="setting-item">
                <label>{t('settings.milkAlarmTime')}</label>
                <input
                    type="time"
                    value={milkAlarmTime}
                    onChange={(e) => setMilkAlarmTime(e.target.value)}
                />
            </div>
            <div className="setting-item">
                <label>{t('settings.breadAlarmTime')}</label>
                <input
                    type="time"
                    value={breadAlarmTime}
                    onChange={(e) => setBreadAlarmTime(e.target.value)}
                />
            </div>
            <div className="setting-item">
                <label>{t('settings.snoozeTime')}</label>
                <input
                    type="number"
                    value={snoozeTime}
                    onChange={(e) => setSnoozeTime(Number(e.target.value))}
                />
            </div>
            <div className="setting-item">
                <label>{t('settings.dailyPresetPrices.lunch')}</label>
                <input
                    type="number"
                    value={dailyPresetPrices.lunch}
                    onChange={(e) => setDailyPresetPrices({ ...dailyPresetPrices, lunch: Number(e.target.value) })}
                />
            </div>
            <div className="setting-item">
                <label>{t('settings.dailyPresetPrices.transport')}</label>
                <input
                    type="number"
                    value={dailyPresetPrices.transport}
                    onChange={(e) => setDailyPresetPrices({ ...dailyPresetPrices, transport: Number(e.target.value) })}
                />
            </div>
            <button onClick={handleSaveSettings}>{t('settings.save')}</button>
        </div>
    );
};

export default Settings;