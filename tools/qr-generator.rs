// This file contains a Rust program for generating QR codes.

use qrcode::{QrCode, Version, EcLevel};
use image::Luma;
use std::fs::File;
use std::io::BufWriter;

pub fn generate_qr_code(data: &str, file_path: &str) -> Result<(), Box<dyn std::error::Error>> {
    // Create a QR code from the provided data
    let code = QrCode::with_version(data.as_bytes(), Version::Normal(Version::default()), EcLevel::L)?;

    // Convert the QR code to an image
    let image = code.render::<Luma<u8>>().build();

    // Save the image to the specified file path
    let file = File::create(file_path)?;
    let ref mut buf = BufWriter::new(file);
    image.save(buf)?;

    Ok(())
}