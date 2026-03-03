# Shop Guard – The Floating Ledger

## Overview
Shop Guard is a lightweight, offline-first application designed for small shops to manage their inventory, cash exchanges, customer deposits, and operational expenses. The application consists of two modes: Shop Device and Home Device, allowing seamless synchronization of data between the two.

## Features
- **Floating Bubble UI**: A compact, draggable interface for quick access to essential functions.
- **Operational Alarms**: Admin-managed alarms for timely reminders about inventory and expenses.
- **Hourly Checkpoints**: Regular prompts to ensure no expenses are overlooked.
- **Five Interaction Pillars**: Manage Neighbor Inventory, Neighbor Cash, Customer Vault, Shop Operations, and Daily Preset costs.
- **Excel/CSV Import**: Easily import item lists for quick setup.
- **Offline Functionality**: All data is stored locally first and synced when the internet is available.
- **Telegram Alerts**: Receive notifications directly from the shop device, even when the home PC is off.
- **Bilingual Support**: Fully supports English and Somali for staff interactions.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd shop-guard-floating-ledger
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Build the application:
   ```
   npm run build
   ```
5. Create the installer:
   ```
   npm run tauri build
   ```

## Usage
1. **First Run**: Upon launching the application, select the device role (Shop Device or Home Device).
2. **Shop Device**: Use the floating bubble to add entries, respond to alarms, and manage daily operations.
3. **Home Device**: Access the admin dashboard to manage settings, approve expenses, and view daily summaries.

## Development
- The project is built using Tauri for the desktop application framework, with a Rust backend and a React frontend.
- The application uses SQLite for local data storage, ensuring data is encrypted and secure.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.