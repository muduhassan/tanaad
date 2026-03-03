// This file handles the HTTP server functionality for the home device.

use axum::{
    extract::{Extension, Json},
    response::IntoResponse,
    routing::{get, post},
    Router,
};
use serde_json::json;
use std::sync::Arc;
use tokio::sync::Mutex;

#[derive(Clone)]
struct AppState {
    // Shared state can be added here (e.g., database connection, configuration)
}

pub async fn run_server(state: Arc<Mutex<AppState>>) {
    let app = Router::new()
        .route("/sync", post(sync_handler))
        .route("/status", get(status_handler))
        .layer(Extension(state));

    // Start the server
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn sync_handler(Json(payload): Json<serde_json::Value>, Extension(state): Extension<Arc<Mutex<AppState>>>) -> impl IntoResponse {
    // Handle sync requests from the shop device
    // Process the payload and respond accordingly
    let response = json!({
        "status": "success",
        "message": "Data synced successfully"
    });
    (axum::http::StatusCode::OK, Json(response))
}

async fn status_handler(Extension(state): Extension<Arc<Mutex<AppState>>>) -> impl IntoResponse {
    // Return the status of the home device
    let response = json!({
        "status": "online",
        "message": "Home device is operational"
    });
    (axum::http::StatusCode::OK, Json(response))
}