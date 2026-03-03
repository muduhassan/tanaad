import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchDashboardData, sendTelegramAlert } from '../../services/tauri-api';
import { LedgerSummary } from './LedgerSummary';
import { AlarmSettings } from './AlarmSettings';

const Dashboard: React.FC = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const dashboardData = await fetchDashboardData();
                setData(dashboardData);
            } catch (err) {
                setError(t('dashboard.errorLoading'));
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [t]);

    const handleAlert = async () => {
        try {
            await sendTelegramAlert('Test alert from Dashboard');
            alert(t('dashboard.alertSent'));
        } catch (err) {
            alert(t('dashboard.alertFailed'));
        }
    };

    if (loading) {
        return <div>{t('dashboard.loading')}</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>{t('dashboard.title')}</h1>
            <LedgerSummary data={data.ledgerSummary} />
            <AlarmSettings alarms={data.alarms} />
            <button onClick={handleAlert}>{t('dashboard.sendAlert')}</button>
        </div>
    );
};

export default Dashboard;