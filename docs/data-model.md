# Data Model Documentation for Shop Guard – The Floating Ledger

## Overview
The data model for the Shop Guard application is designed to support the various functionalities required for managing shop operations, including inventory tracking, cash exchanges, customer deposits, operating costs, and recurring expenses. The model is built using an encrypted SQLite database to ensure data security and integrity.

## Database Tables

### 1. Transactions Table
- **Purpose**: Store all transaction records across different ledgers.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for each transaction.
  - `type` (TEXT): Type of transaction (e.g., "Neighbor Inventory", "Neighbor Cash", "Customer Vault", "Shop Operations", "Daily Preset").
  - `amount` (REAL): Amount involved in the transaction.
  - `timestamp` (DATETIME): Date and time when the transaction occurred.
  - `note` (TEXT, Nullable): Optional note for additional details.
  - `status` (TEXT): Status of the transaction (e.g., "Pending", "Approved", "Rejected").
  - `user_id` (UUID): Identifier for the user who made the transaction.

### 2. Outbox Table
- **Purpose**: Queue unsynced records for synchronization with the home device.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for each outbox entry.
  - `transaction_id` (UUID): Reference to the transaction being queued.
  - `created_at` (DATETIME): Timestamp when the entry was created.
  - `attempts` (INTEGER): Number of sync attempts made for this entry.
  - `status` (TEXT): Current status of the outbox entry (e.g., "Pending", "Sent", "Failed").

### 3. Users Table
- **Purpose**: Store user information for authentication and role management.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for each user.
  - `username` (TEXT): Username for login.
  - `password_hash` (TEXT): Hashed password for security.
  - `role` (TEXT): Role of the user (e.g., "Staff", "Admin").
  - `language` (TEXT): Preferred language for the user interface (e.g., "en", "so").

### 4. Settings Table
- **Purpose**: Store application settings, including alarm times and daily preset prices.
- **Fields**:
  - `id` (UUID, Primary Key): Unique identifier for each setting.
  - `key` (TEXT): Setting key (e.g., "milk_alarm_time", "bread_alarm_time").
  - `value` (TEXT): Value associated with the setting.

## Indexes
- **Transactions Table**:
  - Index on `timestamp` for efficient querying of transaction history.
  - Index on `user_id` for tracking user-specific transactions.

- **Outbox Table**:
  - Index on `status` to quickly identify unsynced records.

- **Users Table**:
  - Unique index on `username` to ensure no duplicate usernames.

## Constraints
- All UUID fields are required and must be unique.
- The `amount` field in the Transactions table must be greater than or equal to zero.
- The `status` field in the Transactions and Outbox tables must be one of the predefined values.

## Conclusion
This data model provides a robust foundation for the Shop Guard application, ensuring that all necessary data is captured securely and efficiently. The use of UUIDs for primary keys enhances the uniqueness and scalability of the application, while the encrypted SQLite database ensures that sensitive information is protected.