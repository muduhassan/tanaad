-- SQL script to initialize the database schema for the Shop Guard Floating Ledger application

-- Create the transactions table to store all ledger entries
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'pending',
    note TEXT
);

-- Create the outbox table to store unsynced records
CREATE TABLE outbox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions (id)
);

-- Create indexes for faster querying
CREATE INDEX idx_transactions_uuid ON transactions (uuid);
CREATE INDEX idx_outbox_transaction_id ON outbox (transaction_id);

-- Create the settings table to store application settings
CREATE TABLE settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES ('milk_alarm_time', '09:00');
INSERT INTO settings (key, value) VALUES ('bread_alarm_time', '10:30');
INSERT INTO settings (key, value) VALUES ('snooze_duration', '15'); -- in minutes

-- Create the ledgers table to categorize different types of entries
CREATE TABLE ledgers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default ledger categories
INSERT INTO ledgers (name) VALUES ('Neighbor Inventory');
INSERT INTO ledgers (name) VALUES ('Neighbor Cash');
INSERT INTO ledgers (name) VALUES ('Customer Vault');
INSERT INTO ledgers (name) VALUES ('Shop Operations');
INSERT INTO ledgers (name) VALUES ('Daily Preset');

-- Create the alarms table to manage operational alarms
CREATE TABLE alarms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    time TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active'
);