// This file handles the installation process for the application.

use std::process::Command;

pub fn build_installer() -> Result<(), String> {
    // Define the command to build the installer
    let output = Command::new("cargo")
        .args(&["install", "--path", "."])
        .output()
        .map_err(|e| format!("Failed to execute command: {}", e))?;

    // Check if the command was successful
    if !output.status.success() {
        return Err(format!(
            "Installer build failed: {}",
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    Ok(())
}

pub fn register_autostart() -> Result<(), String> {
    // Logic to register the application to start automatically on system boot
    // This will vary based on the operating system
    #[cfg(target_os = "windows")]
    {
        // Windows-specific autostart registration logic
        let output = Command::new("powershell")
            .arg("New-Item")
            .arg("-Path")
            .arg("HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run")
            .arg("-Name")
            .arg("ShopGuard")
            .arg("-Value")
            .arg("C:\\Path\\To\\Your\\Application.exe")
            .output()
            .map_err(|e| format!("Failed to register autostart: {}", e))?;

        if !output.status.success() {
            return Err(format!(
                "Autostart registration failed: {}",
                String::from_utf8_lossy(&output.stderr)
            ));
        }
    }

    #[cfg(target_os = "macos")]
    {
        // macOS-specific autostart registration logic
        let output = Command::new("osascript")
            .arg("-e")
            .arg("tell application \"System Events\" to make new login item at end with properties {name:\"ShopGuard\", path:\"/Path/To/Your/Application.app\", hidden:false}")
            .output()
            .map_err(|e| format!("Failed to register autostart: {}", e))?;

        if !output.status.success() {
            return Err(format!(
                "Autostart registration failed: {}",
                String::from_utf8_lossy(&output.stderr)
            ));
        }
    }

    Ok(())
}