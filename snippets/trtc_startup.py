import json
from urllib.parse import urlencode
from urllib.request import Request, urlopen

# 腾讯云的 TRTC 参数
# SIPX 使用这里指定的 TRTC APP 与 User 传递电话呼叫的音频流
# 请替换成你实际拥有的 ID 与签名
TRTC_APP_ID = 8888888
TRTC_USER_ID = 'telephone'
TRTC_USER_SIG = 'xxxxxxxx'
TRTC_ROOM_ID = 8888

# SIPX 的 API 签名参数
# 请替换成你实际拥有的 ID 与签名
API_KEY = '23456789'
EXPIRE_AT = '1893456000'
SIGNATURE = 'd7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk'

# SIPx 服务器地址
server = 'https://api.sipx.cn'
path = '/v2205/trtc/startup'
# 签名参数
qs = urlencode({
    'api_key': API_KEY,
    'expire_at': EXPIRE_AT,
    'signature': SIGNATURE,
})

req = Request(
    f'{server}{path}?{qs}',
    method='POST',
    headers={
        'Content-Type': 'application/json'
    },
    data=json.dumps({
        'trtcParams': {
            'sdkAppId': TRTC_APP_ID,
            'userId': TRTC_USER_ID,
            'userSig': TRTC_USER_SIG,
            'roomId': TRTC_ROOM_ID,
        },
        'phonenumber': '88888888888'
    }).encode(),
)

with urlopen(req) as res:
    print(res.status, res.read())
