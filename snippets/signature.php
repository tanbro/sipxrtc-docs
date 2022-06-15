<?php
$api_key = '23456789';
$api_secret = 'k69x50j0';
$expire_at = '1893456000';

$digest = hash_hmac('sha256', $api_key . $expire_at, $api_secret);

$digest_b64 = base64_encode(hex2bin($digest));
$signature = rtrim(strtr($digest_b64, '+/', '-_'), '=');

echo 'Signature: ' . $signature . "\n";
?>