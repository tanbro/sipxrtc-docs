import hmac
from base64 import urlsafe_b64encode
from hashlib import sha256

API_KEY = b'23456789'
API_SECRET = b'k69x50j0'
EXPIRE_AT = b'1893456000'

digest = hmac.new(API_SECRET, API_KEY + EXPIRE_AT, sha256).digest()
signature = urlsafe_b64encode(digest).rstrip(b'=')

print('Signature: {}'.format(signature.decode()))
