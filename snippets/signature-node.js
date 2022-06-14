const crypto = require("crypto");

const api_key = "23456789";
const api_secret = "k69x50j0";
const expire_at = "1672531200";

const hmac = crypto.createHmac("sha256", api_secret);
hmac.update(api_key);
hmac.update(expire_at);
const digest = hmac.digest("base64");

const signature = digest
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/\=+$/, "");

console.log(`Signature: ${signature}`);
