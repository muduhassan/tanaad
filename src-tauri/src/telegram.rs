// This file contains functions for sending Telegram alerts from the Rust backend.

use reqwest::Client;
use serde_json::json;
use std::error::Error;

pub struct TelegramClient {
    bot_token: String,
    chat_id: String,
    client: Client,
}

impl TelegramClient {
    pub fn new(bot_token: String, chat_id: String) -> Self {
        let client = Client::new();
        TelegramClient { bot_token, chat_id, client }
    }

    pub async fn send_message(&self, message: &str) -> Result<(), Box<dyn Error>> {
        let url = format!("https://api.telegram.org/bot{}/sendMessage", self.bot_token);
        let payload = json!({
            "chat_id": self.chat_id,
            "text": message,
        });

        self.client.post(&url)
            .json(&payload)
            .send()
            .await?;

        Ok(())
    }
}