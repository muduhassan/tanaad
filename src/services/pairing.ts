import { useEffect, useState } from 'react';
import { getPairingToken, validatePairingToken } from './tauri-api';
import { useStore } from '../stores/uiStore';

export const usePairing = () => {
    const [pairingToken, setPairingToken] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean>(false);
    const { setPairingStatus } = useStore();

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getPairingToken();
            setPairingToken(token);
        };

        fetchToken();
    }, []);

    const validateToken = async (token: string) => {
        const valid = await validatePairingToken(token);
        setIsValid(valid);
        setPairingStatus(valid ? 'paired' : 'unpaired');
    };

    return {
        pairingToken,
        isValid,
        validateToken,
    };
};