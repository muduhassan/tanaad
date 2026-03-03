// This file implements the heartbeat functionality for monitoring device status.

use std::time::{Duration, Instant};
use tokio::time::interval;
use tokio::sync::mpsc;
use crate::db;
use crate::telegram;

const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(300); // 5 minutes

pub struct Heartbeat {
    sender: mpsc::Sender<()>,
}

impl Heartbeat {
    pub fn new() -> Self {
        let (sender, mut receiver) = mpsc::channel(32);
        let heartbeat = Heartbeat { sender };

        tokio::spawn(async move {
            let mut interval = interval(HEARTBEAT_INTERVAL);
            let mut last_heartbeat = Instant::now();

            loop {
                interval.tick().await;

                if last_heartbeat.elapsed() >= HEARTBEAT_INTERVAL {
                    // Record heartbeat in the local database
                    db::record_heartbeat().await;

                    // Send heartbeat to home device if reachable
                    if let Err(e) = heartbeat.send_heartbeat().await {
                        eprintln!("Failed to send heartbeat: {}", e);
                    }

                    last_heartbeat = Instant::now();
                }

                // Check for shutdown signal
                if receiver.try_recv().is_ok() {
                    break;
                }
            }
        });

        heartbeat
    }

    async fn send_heartbeat(&self) -> Result<(), Box<dyn std::error::Error>> {
        // Logic to send heartbeat to home device
        // This could involve checking network status and sending the heartbeat
        // via the sync engine or directly to the home receiver.

        // Example: telegram::send_alert("Heartbeat sent from shop device").await?;
        Ok(())
    }
}