// This file manages the pairing logic between devices.

use std::sync::{Arc, Mutex};
use serde::{Deserialize, Serialize};
use crate::keychain;
use crate::telegram;
use crate::db;
use crate::sync_engine;

#[derive(Serialize, Deserialize)]
pub struct PairingToken {
    pub token: String,
    pub pin: Option<String>,
}

pub struct PairingManager {
    token: String,
    pin: Option<String>,
}

impl PairingManager {
    pub fn new(token: String, pin: Option<String>) -> Self {
        Self { token, pin }
    }

    pub fn generate_pairing_token() -> PairingToken {
        let token = uuid::Uuid::new_v4().to_string();
        PairingToken {
            token,
            pin: None,
        }
    }

    pub fn save_pairing_token(&self) -> Result<(), String> {
        keychain::store("pairing_token", &self.token)
            .map_err(|e| format!("Failed to save pairing token: {}", e))?;
        if let Some(ref pin) = self.pin {
            keychain::store("pairing_pin", pin)
                .map_err(|e| format!("Failed to save pairing pin: {}", e))?;
        }
        Ok(())
    }

    pub fn validate_pairing(&self, received_token: &str) -> bool {
        self.token == received_token
    }

    pub fn notify_home(&self) {
        let message = format!("New device paired with token: {}", self.token);
        telegram::send_alert(&message);
    }
}

pub fn handle_pairing_request(token: &str, pin: Option<&str>) -> Result<(), String> {
    let stored_token = keychain::retrieve("pairing_token")
        .map_err(|e| format!("Failed to retrieve pairing token: {}", e))?;
    
    if stored_token == token {
        if let Some(stored_pin) = keychain::retrieve("pairing_pin").ok() {
            if let Some(pin) = pin {
                if stored_pin != pin {
                    return Err("Invalid PIN".to_string());
                }
            }
        }
        sync_engine::start_sync();
        Ok(())
    } else {
        Err("Invalid pairing token".to_string())
    }
}