import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ledgerStore } from '../../stores/ledgerStore';
import { addNeighborInventoryEntry } from '../../services/tauri-api';

const NeighborInventory = () => {
    const { t } = useTranslation();
    const [item, setItem] = useState('');
    const [neighbor, setNeighbor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [buyingPrice, setBuyingPrice] = useState(0);
    const [message, setMessage] = useState('');

    const handleAddEntry = async () => {
        if (!item || !neighbor) {
            setMessage(t('neighborInventory.error.emptyFields'));
            return;
        }

        const entry = {
            item,
            neighbor,
            quantity,
            buyingPrice,
        };

        try {
            await addNeighborInventoryEntry(entry);
            setMessage(t('neighborInventory.success.entryAdded'));
            setItem('');
            setNeighbor('');
            setQuantity(1);
            setBuyingPrice(0);
        } catch (error) {
            setMessage(t('neighborInventory.error.addEntryFailed'));
        }
    };

    useEffect(() => {
        // Load existing entries or any necessary data when component mounts
        ledgerStore.loadNeighborInventory();
    }, []);

    return (
        <div>
            <h2>{t('neighborInventory.title')}</h2>
            <input
                type="text"
                placeholder={t('neighborInventory.placeholder.item')}
                value={item}
                onChange={(e) => setItem(e.target.value)}
            />
            <input
                type="text"
                placeholder={t('neighborInventory.placeholder.neighbor')}
                value={neighbor}
                onChange={(e) => setNeighbor(e.target.value)}
            />
            <input
                type="number"
                placeholder={t('neighborInventory.placeholder.quantity')}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <input
                type="number"
                placeholder={t('neighborInventory.placeholder.buyingPrice')}
                value={buyingPrice}
                onChange={(e) => setBuyingPrice(Number(e.target.value))}
            />
            <button onClick={handleAddEntry}>{t('neighborInventory.button.addEntry')}</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NeighborInventory;