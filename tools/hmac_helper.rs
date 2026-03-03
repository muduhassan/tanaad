// This file contains a Rust program for handling HMAC operations.

use hmac::{Hmac, Mac, NewMac};
use sha2::Sha256;
use std::convert::TryInto;

pub type HmacSha256 = Hmac<Sha256>;

pub fn generate_hmac(key: &[u8], data: &[u8]) -> Result<Vec<u8>, &'static str> {
    let mut mac = HmacSha256::new_varkey(key).map_err(|_| "Invalid key length")?;
    mac.update(data);
    Ok(mac.finalize().into_bytes().to_vec())
}

pub fn verify_hmac(key: &[u8], data: &[u8], expected_hmac: &[u8]) -> Result<bool, &'static str> {
    let mut mac = HmacSha256::new_varkey(key).map_err(|_| "Invalid key length")?;
    mac.update(data);
    mac.verify(expected_hmac).map_err(|_| "HMAC verification failed")?;
    Ok(true)
}