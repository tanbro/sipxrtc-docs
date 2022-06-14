const api_key = "23456789";
const api_secret = "k69x50j0";
const expire_at = "1672531200";

const enc = new TextEncoder("utf-8");
const algorithm = { name: "HMAC", hash: "SHA-256" };

const key = await crypto.subtle.importKey(
  "raw",
  enc.encode(api_secret),
  algorithm,
  false,
  ["sign", "verify"]
);
const digest = await crypto.subtle.sign(
  algorithm.name,
  key,
  enc.encode(api_key + expire_at)
);

const signature = btoa(String.fromCharCode(...new Uint8Array(digest)))
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/\=+$/, "");

console.log(`Signature: ${signature}`);
