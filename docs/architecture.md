# Architecture of Shop Guard – The Floating Ledger

## Overview
Shop Guard – The Floating Ledger is a lightweight, offline-first application designed for small retail environments. It operates on two devices: a Shop Device and a Home Device, facilitating seamless data management and synchronization without relying on cloud services. The architecture is built to ensure low resource consumption, high availability, and robust security.

## Architecture Components

### 1. Shop Device
- **User Interface**: A compact, draggable bubble overlay that provides access to essential functionalities.
- **Local Database**: Utilizes an encrypted SQLite database (SQLCipher) to store transactions and an outbox for unsynced records.
- **Event-Driven Sync**: Implements a sync engine that queues records for synchronization with the Home Device when online.
- **Telegram Integration**: Directly sends alerts via Telegram, ensuring notifications are sent even when the Home Device is offline.
- **Operational Alarms**: Admin-managed alarms prompt staff for critical tasks, enhancing operational efficiency.

### 2. Home Device
- **Receiver Service**: An HTTP server that listens for incoming sync requests from the Shop Device.
- **Local Database**: Stores all synced records and provides an admin dashboard for monitoring and management.
- **Admin Dashboard**: A user-friendly interface for managing settings, viewing summaries, and approving transactions.
- **Pairing Mechanism**: Generates a secure pairing token and QR code for easy device pairing.

## Data Flow
1. **Data Entry**: Staff enter transactions on the Shop Device, which are immediately recorded in the local database.
2. **Queueing**: Unsynced records are queued in the outbox for later synchronization.
3. **Synchronization**: When the Shop Device detects an internet connection, it sends queued records to the Home Device.
4. **Alerting**: The Shop Device sends Telegram alerts based on operational status and alarms.

## Security
- **Data Encryption**: All sensitive data is encrypted using SQLCipher, ensuring data integrity and confidentiality.
- **Secrets Management**: Utilizes the OS keychain for storing sensitive information such as Telegram tokens and pairing secrets.
- **Transport Security**: Communication between devices is secured using HTTPS with TLS, and each sync request is signed with HMAC for authenticity.

## Performance Considerations
- **Resource Efficiency**: The Shop Device is optimized for low CPU and RAM usage, targeting idle CPU near 0% and RAM usage ≤ 250MB.
- **Event-Driven Architecture**: The application avoids tight polling loops, relying on event-driven triggers for operations like syncing and alarms.

## Internationalization
- The application supports English and Somali (Latin script) through the use of react-i18next, ensuring accessibility for diverse user groups.

## Conclusion
The architecture of Shop Guard – The Floating Ledger is designed to meet the specific needs of small retail environments, providing a robust, secure, and efficient solution for managing transactions and operational tasks. The offline-first approach, combined with seamless synchronization and alerting capabilities, ensures that shop staff can operate effectively without reliance on external servers or cloud services.