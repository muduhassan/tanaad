# Implementation Plan for Shop Guard – The Floating Ledger

## Overview
This document outlines the implementation plan for the Shop Guard – The Floating Ledger application, detailing the steps required to develop, test, and deploy the system. The application consists of two main components: the Shop Device and the Home Device, each with specific functionalities and requirements.

## Goals
- Develop a lightweight, offline-first application that operates efficiently on slow PCs.
- Ensure seamless synchronization between the Shop Device and Home Device.
- Implement a user-friendly interface that supports both English and Somali.
- Provide robust security measures for data storage and communication.

## Implementation Steps

### 1. Project Setup
- Initialize the project repository and set up version control.
- Configure the Rust and TypeScript environments.
- Set up the Tauri framework for building the desktop application.

### 2. Database Design
- Design the SQLite database schema with the following tables:
  - Transactions
  - Outbox (for unsynced records)
- Implement SQLCipher for database encryption.

### 3. User Interface Development
- Create the main application layout using React.
- Develop the following components:
  - Bubble (draggable overlay)
  - Floating Panel (for staff actions)
  - Login and PIN Entry screens
  - Admin Dashboard (for home device)
  - Ledger components (Neighbor Inventory, Neighbor Cash, Customer Vault, Shop Operations, Daily Preset)
- Implement internationalization using react-i18next.

### 4. Backend Development
- Implement the Rust backend with the following functionalities:
  - HTTP server for the Home Device.
  - Sync engine for data synchronization between devices.
  - Telegram integration for alerts.
  - Keychain management for secure storage of secrets.

### 5. Synchronization Logic
- Develop the synchronization engine to handle:
  - Local data storage and queuing of unsynced records.
  - Event-driven triggers for syncing when the Home Device is reachable.
  - Idempotency checks to prevent duplicate records.

### 6. Alarm and Checkpoint System
- Implement the operational alarms for Milk and Bread deliveries.
- Develop the hourly checkpoint system to prompt staff for expense entries.

### 7. Testing
- Conduct unit tests for individual components and services.
- Perform integration tests to ensure synchronization works as expected.
- Test the application under various scenarios, including offline mode and network recovery.

### 8. Deployment
- Create a single USB installer for easy installation on shop PCs.
- Ensure the application auto-starts on system boot for both Shop and Home Devices.

### 9. Documentation
- Write comprehensive user documentation covering installation, usage, and troubleshooting.
- Prepare a blueprint verification report to confirm all requirements are met.

### 10. Maintenance and Updates
- Plan for regular updates to address bugs and introduce new features based on user feedback.
- Monitor application performance and make optimizations as necessary.

## Conclusion
This implementation plan serves as a roadmap for the development of the Shop Guard – The Floating Ledger application. By following these steps, we aim to create a robust, user-friendly, and efficient system that meets the needs of shop owners and staff.