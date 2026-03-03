import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLedgerStore } from '../../stores/ledgerStore';
import { addCustomerDeposit } from '../../services/tauri-api';

const CustomerVault: React.FC = () => {
    const { t } = useTranslation();
    const { customerDeposits, fetchCustomerDeposits } = useLedgerStore();
    const [customerId, setCustomerId] = useState('');
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCustomerDeposits();
    }, [fetchCustomerDeposits]);

    const handleAddDeposit = async () => {
        if (amount <= 0) {
            setError(t('error.invalidAmount'));
            return;
        }
        try {
            await addCustomerDeposit(customerId, amount);
            setAmount(0);
            setError('');
            fetchCustomerDeposits(); // Refresh the deposits list
        } catch (err) {
            setError(t('error.addDepositFailed'));
        }
    };

    return (
        <div>
            <h2>{t('customerVault.title')}</h2>
            {error && <p className="error">{error}</p>}
            <div>
                <label>{t('customerVault.customerId')}</label>
                <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                />
            </div>
            <div>
                <label>{t('customerVault.amount')}</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>
            <button onClick={handleAddDeposit}>{t('customerVault.addDeposit')}</button>
            <h3>{t('customerVault.currentDeposits')}</h3>
            <ul>
                {customerDeposits.map((deposit) => (
                    <li key={deposit.id}>
                        {deposit.customerId}: {deposit.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerVault;