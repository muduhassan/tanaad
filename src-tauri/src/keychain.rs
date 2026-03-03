// This file provides functions for securely storing and retrieving secrets in the Rust backend.

use std::collections::HashMap;
use std::sync::Mutex;
use tauri::Manager;

lazy_static::lazy_static! {
    static ref KEYCHAIN: Mutex<HashMap<String, String>> = Mutex::new(HashMap::new());
}

pub fn set_secret(key: &str, value: &str) {
    let mut keychain = KEYCHAIN.lock().unwrap();
    keychain.insert(key.to_string(), value.to_string());
}

pub fn get_secret(key: &str) -> Option<String> {
    let keychain = KEYCHAIN.lock().unwrap();
    keychain.get(key).cloned()
}

pub fn remove_secret(key: &str) {
    let mut keychain = KEYCHAIN.lock().unwrap();
    keychain.remove(key);
}