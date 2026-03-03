// This file defines the API endpoints for communication between the frontend and backend.

use tauri::command;
use crate::db;
use crate::telegram;
use crate::keychain;
use crate::sync_engine;
use crate::pairing;

#[command]
pub async fn add_entry(entry: Entry) -> Result<(), String> {
    db::insert_entry(entry).map_err(|e| e.to_string())?;
    sync_engine::queue_sync().await;
    Ok(())
}

#[command]
pub async fn get_entries() -> Result<Vec<Entry>, String> {
    db::fetch_entries().map_err(|e| e.to_string())
}

#[command]
pub async fn send_telegram_alert(message: String) -> Result<(), String> {
    let token = keychain::get_telegram_token().map_err(|e| e.to_string())?;
    let chat_id = keychain::get_telegram_chat_id().map_err(|e| e.to_string())?;
    telegram::send_alert(&token, &chat_id, &message).await.map_err(|e| e.to_string())?;
    Ok(())
}

#[command]
pub async fn pair_devices(token: String) -> Result<(), String> {
    pairing::pair_with_token(token).map_err(|e| e.to_string())
}

// Additional API commands can be added here as needed.