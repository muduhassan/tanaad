import axios from 'axios';
import { getSecret } from './keychain';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

export interface TelegramConfig {
  botToken: string;
  chatId: string;
}

export class TelegramClient {
  private config: TelegramConfig | null = null;

  constructor() {
    this.loadConfig();
  }

  private async loadConfig() {
    const botToken = await getSecret('telegram_bot_token');
    const chatId = await getSecret('telegram_chat_id');

    if (botToken && chatId) {
      this.config = { botToken, chatId };
    }
  }

  public async sendMessage(message: string): Promise<void> {
    if (!this.config) {
      console.error('Telegram configuration not loaded.');
      return;
    }

    const url = `${TELEGRAM_API_URL}${this.config.botToken}/sendMessage`;
    const payload = {
      chat_id: this.config.chatId,
      text: message,
      parse_mode: 'Markdown',
    };

    try {
      await axios.post(url, payload);
    } catch (error) {
      console.error('Failed to send message to Telegram:', error);
    }
  }
}