import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PinEntry: React.FC<{ onPinSubmit: (pin: string) => void }> = ({ onPinSubmit }) => {
    const { t } = useTranslation();
    const [pin, setPin] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPin(event.target.value);
        setError(null);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (pin.length === 4) {
            onPinSubmit(pin);
        } else {
            setError(t('pinEntry.error.invalidLength'));
        }
    };

    return (
        <div className="pin-entry">
            <h2>{t('pinEntry.title')}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={pin}
                    onChange={handleChange}
                    maxLength={4}
                    placeholder={t('pinEntry.placeholder')}
                    required
                />
                <button type="submit">{t('pinEntry.submit')}</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default PinEntry;