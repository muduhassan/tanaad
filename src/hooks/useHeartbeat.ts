import { useEffect, useRef } from 'react';
import { sendHeartbeat } from '../services/tauri-api';

const useHeartbeat = () => {
    const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const startHeartbeat = () => {
            if (heartbeatIntervalRef.current) return;

            heartbeatIntervalRef.current = setInterval(() => {
                sendHeartbeat();
            }, 300000); // Send heartbeat every 5 minutes
        };

        const stopHeartbeat = () => {
            if (heartbeatIntervalRef.current) {
                clearInterval(heartbeatIntervalRef.current);
                heartbeatIntervalRef.current = null;
            }
        };

        startHeartbeat();

        return () => {
            stopHeartbeat();
        };
    }, []);

    return null; // This hook does not need to return anything
}; 

export default useHeartbeat;