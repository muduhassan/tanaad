#!/bin/bash

# This script registers the Shop Guard application to start automatically on macOS.

APP_NAME="Shop Guard"
APP_PATH="/Applications/Shop Guard.app"

# Check if the application exists
if [ ! -d "$APP_PATH" ]; then
  echo "Application not found at $APP_PATH"
  exit 1
fi

# Create a plist file for launchd
PLIST_FILE="$HOME/Library/LaunchAgents/com.shopguard.plist"

cat <<EOL > "$PLIST_FILE"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.shopguard</string>
    <key>ProgramArguments</key>
    <array>
        <string>$APP_PATH/Contents/MacOS/Shop Guard</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
EOL

# Load the new plist file
launchctl load "$PLIST_FILE"

echo "$APP_NAME has been registered to start automatically on login."