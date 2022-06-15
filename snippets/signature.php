<?php
$API_KEY = '23456789';
$API_SECRET = 'k69x50j0';
$EXPIRE_AT = '1893456000';

$digest = hash_hmac('sha256', $API_KEY . $EXPIRE_AT, $API_SECRET);

$digest_b64 = base64_encode(hex2bin($digest));
$signature = rtrim(strtr($digest_b64, '+/', '-_'), '=');

echo 'Signature: ' . $signature . "\n";
?>