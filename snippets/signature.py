import hmac
from base64 import urlsafe_b64encode
from hashlib import sha256

api_key = b'23456789'
api_secret = b'k69x50j0'
expire_at = b'1893456000'

digest = hmac.new(api_secret, api_key + expire_at, sha256).digest()
signature = urlsafe_b64encode(digest).rstrip(b'=')

print('Signature: {}'.format(signature.decode()))
