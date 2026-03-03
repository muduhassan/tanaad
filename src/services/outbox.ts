import { OutboxEntry } from '../models/outboxEntry';
import { getDatabase } from './db';
import { v4 as uuidv4 } from 'uuid';

class OutboxService {
    private db: any;

    constructor() {
        this.db = getDatabase();
    }

    async addEntry(entry: OutboxEntry): Promise<void> {
        const newEntry = {
            ...entry,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
        };
        await this.db.transaction('rw', this.db.outbox, async () => {
            await this.db.outbox.add(newEntry);
        });
    }

    async getEntries(): Promise<OutboxEntry[]> {
        return await this.db.outbox.toArray();
    }

    async clearEntries(): Promise<void> {
        await this.db.outbox.clear();
    }
}

export const outboxService = new OutboxService();