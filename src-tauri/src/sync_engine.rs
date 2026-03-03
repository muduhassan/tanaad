// This file implements the synchronization logic between shop and home devices.

use std::time::{Duration, Instant};
use tokio::time::sleep;
use rusqlite::{params, Connection};
use hmac::{Hmac, Mac, NewMac};
use sha2::Sha256;
use serde_json::json;

const SYNC_INTERVAL: Duration = Duration::from_secs(300); // 5 minutes
const BACKOFF_CAP: Duration = Duration::from_secs(900); // 15 minutes

pub struct SyncEngine {
    shop_db: Connection,
    home_url: String,
    pairing_secret: String,
}

impl SyncEngine {
    pub fn new(shop_db_path: &str, home_url: &str, pairing_secret: &str) -> Self {
        let shop_db = Connection::open(shop_db_path).expect("Failed to open shop database");
        Self {
            shop_db,
            home_url: home_url.to_string(),
            pairing_secret: pairing_secret.to_string(),
        }
    }

    pub async fn start_sync(&self) {
        loop {
            let start_time = Instant::now();
            if let Err(e) = self.sync().await {
                eprintln!("Sync error: {}", e);
            }
            let elapsed = start_time.elapsed();
            if elapsed < SYNC_INTERVAL {
                sleep(SYNC_INTERVAL - elapsed).await;
            }
        }
    }

    async fn sync(&self) -> Result<(), Box<dyn std::error::Error>> {
        let unsynced_records: Vec<(String, String)> = self.fetch_unsynced_records()?;
        if unsynced_records.is_empty() {
            return Ok(());
        }

        let payload = json!({
            "records": unsynced_records,
        });

        let signature = self.sign_payload(&payload.to_string());
        let response = reqwest::Client::new()
            .post(&self.home_url)
            .header("X-Signature", signature)
            .json(&payload)
            .send()
            .await?;

        if response.status().is_success() {
            self.mark_records_as_synced()?;
        } else {
            let backoff_duration = self.calculate_backoff_duration().await;
            sleep(backoff_duration).await;
        }

        Ok(())
    }

    fn fetch_unsynced_records(&self) -> Result<Vec<(String, String)>, rusqlite::Error> {
        let mut stmt = self.shop_db.prepare("SELECT id, data FROM outbox WHERE synced = 0")?;
        let records = stmt.query_map(params![], |row| {
            let id: String = row.get(0)?;
            let data: String = row.get(1)?;
            Ok((id, data))
        })?;
        records.collect()
    }

    fn mark_records_as_synced(&self) -> Result<(), rusqlite::Error> {
        self.shop_db.execute("UPDATE outbox SET synced = 1 WHERE synced = 0", [])?;
        Ok(())
    }

    fn sign_payload(&self, payload: &str) -> String {
        let mut mac = Hmac::<Sha256>::new_varkey(self.pairing_secret.as_bytes()).expect("HMAC can take key of any size");
        mac.update(payload.as_bytes());
        hex::encode(mac.finalize().into_bytes())
    }

    async fn calculate_backoff_duration(&self) -> Duration {
        // Implement exponential backoff logic here
        BACKOFF_CAP
    }
}