import { invoke } from '@tauri-apps/api';

export const tauriApi = {
  async addEntry(entry) {
    return await invoke('add_entry', { entry });
  },

  async getEntries() {
    return await invoke('get_entries');
  },

  async syncData() {
    return await invoke('sync_data');
  },

  async getSettings() {
    return await invoke('get_settings');
  },

  async updateSettings(settings) {
    return await invoke('update_settings', { settings });
  },

  async sendTelegramAlert(message) {
    return await invoke('send_telegram_alert', { message });
  },

  async importItems(data) {
    return await invoke('import_items', { data });
  },

  async getPendingApprovals() {
    return await invoke('get_pending_approvals');
  },

  async approveEntry(entryId) {
    return await invoke('approve_entry', { entryId });
  },

  async rejectEntry(entryId) {
    return await invoke('reject_entry', { entryId });
  },
};