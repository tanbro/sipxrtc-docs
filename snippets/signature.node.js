const crypto = require("crypto");

const API_KEY = "23456789";
const API_SECRET = "k69x50j0";
const EXPIRE_AT = "1893456000";

const hmac = crypto.createHmac("sha256", API_SECRET);
hmac.update(API_KEY);
hmac.update(EXPIRE_AT);
const digest = hmac.digest("base64");

const signature = digest
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/\=+$/, "");

console.log(`Signature: ${signature}`);
