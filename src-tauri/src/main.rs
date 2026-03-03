// This file serves as the entry point for the Rust backend, initializing the Tauri application.

use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, Manager};

fn main() {
    // Create a system tray menu item
    let tray_menu_item = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray = SystemTray::new().with_menu(tauri::SystemTrayMenu::new().add_item(tray_menu_item));

    // Build the Tauri application
    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                if id.as_str() == "quit" {
                    app.exit(0);
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}