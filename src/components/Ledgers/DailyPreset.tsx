import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLedgerStore } from '../../stores/ledgerStore';

const DailyPreset: React.FC = () => {
    const { t } = useTranslation();
    const { dailyWelfare, addDailyWelfare } = useLedgerStore();

    const handleAddWelfare = (type: 'lunch' | 'transport') => {
        const amount = type === 'lunch' ? dailyWelfare.lunch : dailyWelfare.transport;
        addDailyWelfare(type, amount);
    };

    return (
        <div className="daily-preset">
            <h2>{t('dailyPreset.title')}</h2>
            <div className="preset-buttons">
                <button onClick={() => handleAddWelfare('lunch')}>
                    {t('dailyPreset.staffLunch')}
                </button>
                <button onClick={() => handleAddWelfare('transport')}>
                    {t('dailyPreset.staffTransport')}
                </button>
            </div>
        </div>
    );
};

export default DailyPreset;