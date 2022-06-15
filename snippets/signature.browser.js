const API_KEY = "23456789";
const API_SECRET = "k69x50j0";
const EXPIRE_AT = "1893456000";

const enc = new TextEncoder("utf-8");
const algorithm = { name: "HMAC", hash: "SHA-256" };

const key = await crypto.subtle.importKey(
  "raw",
  enc.encode(API_SECRET),
  algorithm,
  false,
  ["sign", "verify"]
);
const digest = await crypto.subtle.sign(
  algorithm.name,
  key,
  enc.encode(API_KEY + EXPIRE_AT)
);

const signature = btoa(String.fromCharCode(...new Uint8Array(digest)))
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/\=+$/, "");

console.log(`Signature: ${signature}`);
