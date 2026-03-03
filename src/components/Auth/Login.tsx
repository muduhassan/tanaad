import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import './Login.css';

const Login = () => {
    const { t } = useTranslation();
    const { login } = useAuthStore();
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (pin.length === 4) {
            const success = login(pin);
            if (!success) {
                setError(t('login.error'));
            }
        } else {
            setError(t('login.pinLengthError'));
        }
    };

    return (
        <div className="login-container">
            <h2>{t('login.title')}</h2>
            <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder={t('login.pinPlaceholder')}
                maxLength={4}
            />
            <button onClick={handleLogin}>{t('login.submit')}</button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;