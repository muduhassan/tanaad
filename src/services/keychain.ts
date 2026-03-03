import { Keychain } from 'keytar';

const SERVICE_NAME = 'shop-guard-floating-ledger';

export const setSecret = async (key: string, value: string): Promise<void> => {
    await Keychain.setPassword(SERVICE_NAME, key, value);
};

export const getSecret = async (key: string): Promise<string | null> => {
    return await Keychain.getPassword(SERVICE_NAME, key);
};

export const deleteSecret = async (key: string): Promise<void> => {
    await Keychain.deletePassword(SERVICE_NAME, key);
};