import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addExpense } from '../../services/tauri-api';
import { useLedgerStore } from '../../stores/ledgerStore';

const ShopOperations: React.FC = () => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState<number | ''>('');
    const [category, setCategory] = useState<string>('Electricity Tokens');
    const { addPendingExpense } = useLedgerStore();

    const handleAddExpense = async () => {
        if (amount) {
            const expense = {
                category,
                amount,
                note: '',
                status: 'Pending',
            };
            await addExpense(expense);
            addPendingExpense(expense);
            setAmount('');
        }
    };

    return (
        <div className="shop-operations">
            <h2>{t('shopOperations.title')}</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Electricity Tokens">{t('shopOperations.electricityTokens')}</option>
                <option value="Cleaning">{t('shopOperations.cleaning')}</option>
                <option value="Water">{t('shopOperations.water')}</option>
                <option value="Repairs">{t('shopOperations.repairs')}</option>
            </select>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder={t('shopOperations.amountPlaceholder')}
            />
            <button onClick={handleAddExpense}>{t('shopOperations.addExpense')}</button>
        </div>
    );
};

export default ShopOperations;