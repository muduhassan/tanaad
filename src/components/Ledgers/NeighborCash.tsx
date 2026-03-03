import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLedgerStore } from '../../stores/ledgerStore';
import { addNeighborCashEntry } from '../../services/tauri-api';

const NeighborCash: React.FC = () => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState<number | ''>('');
    const [neighbor, setNeighbor] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleAddEntry = async () => {
        if (amount === '' || neighbor === '') {
            setError(t('neighborCash.error.emptyFields'));
            return;
        }

        try {
            await addNeighborCashEntry(neighbor, amount);
            setAmount('');
            setNeighbor('');
            setError('');
        } catch (err) {
            setError(t('neighborCash.error.addFailed'));
        }
    };

    return (
        <div className="neighbor-cash">
            <h2>{t('neighborCash.title')}</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder={t('neighborCash.placeholder.amount')}
            />
            <input
                type="text"
                value={neighbor}
                onChange={(e) => setNeighbor(e.target.value)}
                placeholder={t('neighborCash.placeholder.neighbor')}
            />
            <button onClick={handleAddEntry}>{t('neighborCash.button.add')}</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default NeighborCash;