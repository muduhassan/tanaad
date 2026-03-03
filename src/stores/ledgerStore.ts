import { makeAutoObservable } from "mobx";

class LedgerStore {
    neighborInventory = [];
    neighborCash = [];
    customerVault = [];
    shopOperations = [];
    dailyPreset = [];
    queuedEntries = 0;

    constructor() {
        makeAutoObservable(this);
    }

    addNeighborInventory(item) {
        this.neighborInventory.push(item);
    }

    addNeighborCash(entry) {
        this.neighborCash.push(entry);
    }

    addCustomerVault(entry) {
        this.customerVault.push(entry);
    }

    addShopOperation(operation) {
        this.shopOperations.push(operation);
    }

    addDailyPreset(preset) {
        this.dailyPreset.push(preset);
    }

    incrementQueuedEntries() {
        this.queuedEntries += 1;
    }

    decrementQueuedEntries() {
        if (this.queuedEntries > 0) {
            this.queuedEntries -= 1;
        }
    }

    resetQueuedEntries() {
        this.queuedEntries = 0;
    }
}

const ledgerStore = new LedgerStore();
export default ledgerStore;