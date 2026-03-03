import { Outbox } from './outbox';
import { sendToHome } from './tauri-api';
import { getKeychainSecret } from './keychain';
import { v4 as uuidv4 } from 'uuid';

class SyncService {
    private outbox: Outbox;

    constructor() {
        this.outbox = new Outbox();
    }

    async syncData() {
        const unsyncedRecords = await this.outbox.getUnsyncedRecords();
        if (unsyncedRecords.length === 0) {
            return;
        }

        const pairingSecret = await getKeychainSecret('pairingSecret');
        const syncPayload = {
            records: unsyncedRecords,
            secret: pairingSecret,
        };

        try {
            await sendToHome(syncPayload);
            await this.outbox.clearUnsyncedRecords();
        } catch (error) {
            console.error('Sync failed:', error);
            // Handle retry logic or error logging as needed
        }
    }

    queueRecord(record: any) {
        const recordWithId = { ...record, id: uuidv4() };
        this.outbox.addRecord(recordWithId);
    }
}

export const syncService = new SyncService();