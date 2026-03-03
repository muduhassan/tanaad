#!/bin/bash

# Build the Tauri application
npm run build

# Navigate to the Tauri directory
cd src-tauri

# Build the installer for the application
cargo tauri build

# Move the installer to the root directory
mv target/release/bundle/tauri/*.exe ../installer/nsis/ || true
mv target/release/bundle/tauri/*.pkg ../installer/mac/ || true

# Notify user of completion
echo "Installer built successfully and moved to the installer directory."