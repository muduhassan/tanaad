# Database Schema Documentation for Shop Guard – The Floating Ledger

This document outlines the database schema used in the Shop Guard application. The schema is designed to support the various functionalities of the application, including transaction tracking, synchronization, and user management.

## Tables

### 1. Transactions

- **Description**: Stores all transaction records for the shop.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for each transaction.
  - `type` (TEXT): Type of transaction (e.g., "borrowed", "lent", "expense", "deposit").
  - `amount` (REAL): Amount involved in the transaction.
  - `created_at` (DATETIME): Timestamp of when the transaction was created.
  - `updated_at` (DATETIME): Timestamp of the last update to the transaction.
  - `status` (TEXT): Status of the transaction (e.g., "pending", "approved", "rejected").
  - `note` (TEXT, Nullable): Optional note associated with the transaction.
  - `ledger_type` (TEXT): Type of ledger this transaction belongs to (e.g., "Neighbor Inventory", "Neighbor Cash", "Customer Vault", "Shop Operations", "Daily Preset").

### 2. Outbox

- **Description**: Queues unsynced records for synchronization with the home device.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for each outbox entry.
  - `transaction_id` (UUID, Foreign Key): Reference to the transaction being queued.
  - `created_at` (DATETIME): Timestamp of when the outbox entry was created.
  - `status` (TEXT): Status of the outbox entry (e.g., "queued", "sent", "failed").
  - `retry_count` (INTEGER): Number of attempts made to sync this entry.

### 3. Users

- **Description**: Stores user information for authentication and role management.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for each user.
  - `username` (TEXT, Unique): Username for the user.
  - `password_hash` (TEXT): Hashed password for authentication.
  - `role` (TEXT): Role of the user (e.g., "staff", "admin").
  - `language` (TEXT): Preferred language of the user (e.g., "en", "so").
  - `created_at` (DATETIME): Timestamp of when the user was created.
  - `updated_at` (DATETIME): Timestamp of the last update to the user record.

### 4. Settings

- **Description**: Stores application settings, including alarm times and daily preset prices.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for each setting.
  - `key` (TEXT, Unique): Key for the setting (e.g., "milk_alarm_time", "bread_alarm_time").
  - `value` (TEXT): Value of the setting.
  - `updated_at` (DATETIME): Timestamp of the last update to the setting.

## Indexes

- **Transactions**:
  - Index on `created_at` for efficient querying of recent transactions.
  - Index on `ledger_type` for filtering transactions by ledger type.

- **Outbox**:
  - Index on `status` for quick access to queued entries.

- **Users**:
  - Index on `username` for fast user lookup during authentication.

- **Settings**:
  - Index on `key` for quick access to specific settings.

## Constraints

- All UUID fields are required and must be unique.
- Foreign key constraints ensure referential integrity between `Outbox` and `Transactions`.
- Unique constraints on `username` in the `Users` table to prevent duplicate accounts.

This schema is designed to be efficient and scalable, supporting the core functionalities of the Shop Guard application while ensuring data integrity and security.