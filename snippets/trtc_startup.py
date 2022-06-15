import http.client
import json
from urllib.parse import urlencode

# 腾讯云的 TRTC 参数
# SIPX 使用这里指定的 TRTC APP 与 User 传递电话呼叫的音频流
TRTC_APP_ID = 8888888
TRTC_USER_ID = 'telephone'
TRTC_USER_SIG = 'xxxxxxxx'
TRTC_ROOM_ID = 8888

# SIPX 的 API 签名参数
API_KEY = '23456789'
EXPIRE_AT = '1893456000'
SIGNATURE = 'd7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk'

conn = http.client.HTTPSConnection('api.sipx.cn')
path = '/v2205/trtc/startup'
qs = urlencode({
    'api_key': API_KEY,
    'expire_at': EXPIRE_AT,
    'signature': SIGNATURE,
})
headers = {
    'Content-Type': 'application/json'
}
body = json.dumps({
    'trtcParams': {
        'sdkAppId': TRTC_APP_ID,
        'userId': TRTC_USER_ID,
        'userSig': TRTC_USER_SIG,
        'roomId': TRTC_ROOM_ID,
    },
    'phonenumber': '18888888888'
})
conn.request('POST', f'{path}?{qs}', body, headers)
res = conn.getresponse()
data = res.read()

print(res.status, res.reason, data)
