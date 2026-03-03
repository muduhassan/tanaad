// This file manages database interactions, including SQLite operations.

use rusqlite::{params, Connection, Result};
use sqlcipher::SqlCipher;

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new(db_path: &str, password: &str) -> Result<Self> {
        let conn = Connection::open(db_path)?;
        SqlCipher::new(&conn).set_passphrase(password)?;
        Ok(Database { conn })
    }

    pub fn initialize(&self) -> Result<()> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY,
                uuid TEXT NOT NULL UNIQUE,
                amount REAL NOT NULL,
                category TEXT NOT NULL,
                created_at TEXT NOT NULL
            )",
            [],
        )?;
        
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS outbox (
                id INTEGER PRIMARY KEY,
                uuid TEXT NOT NULL UNIQUE,
                data TEXT NOT NULL,
                created_at TEXT NOT NULL
            )",
            [],
        )?;
        
        Ok(())
    }

    pub fn add_transaction(&self, uuid: &str, amount: f64, category: &str) -> Result<()> {
        self.conn.execute(
            "INSERT INTO transactions (uuid, amount, category, created_at) VALUES (?1, ?2, ?3, datetime('now'))",
            params![uuid, amount, category],
        )?;
        Ok(())
    }

    pub fn add_to_outbox(&self, uuid: &str, data: &str) -> Result<()> {
        self.conn.execute(
            "INSERT INTO outbox (uuid, data, created_at) VALUES (?1, ?2, datetime('now'))",
            params![uuid, data],
        )?;
        Ok(())
    }

    pub fn get_outbox(&self) -> Result<Vec<(String, String)>> {
        let mut stmt = self.conn.prepare("SELECT uuid, data FROM outbox")?;
        let outbox_iter = stmt.query_map([], |row| {
            Ok((row.get(0)?, row.get(1)?))
        })?;

        let mut outbox = Vec::new();
        for entry in outbox_iter {
            outbox.push(entry?);
        }
        Ok(outbox)
    }

    pub fn clear_outbox(&self) -> Result<()> {
        self.conn.execute("DELETE FROM outbox", [])?;
        Ok(())
    }
}