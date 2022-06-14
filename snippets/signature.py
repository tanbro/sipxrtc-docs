import hmac
from base64 import urlsafe_b64encode

api_key = '23456789'
api_secret = 'k69x50j0'
expire_at = 1672531200

h = hmac.new(api_secret.encode(), digestmod='sha256')
h.update(api_key.encode())
h.update(str(expire_at).encode())
digest = h.digest()

signature = urlsafe_b64encode(digest).decode().rstrip('=')

print(f'Signature: {signature}')
