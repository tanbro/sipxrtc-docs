curl --request POST \
'https://api.sipx.cn/v2205/trtc/startup?api_key=23456789&expire_at=1672531200&signature=d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk' \
--header 'Content-Type: application/json' \
--data-raw '{
    "trtcParams": {
        "userId": "telephone",
        "userSig": "xxxxxxxx",
        "roomId": 8888
    },
    "phonenumber": "88888888888"
}'
