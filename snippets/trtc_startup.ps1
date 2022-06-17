$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")

$body = "{`
    `"trtcParams`": {`
        `"sdkAppId`": 8888888,
        `"userId`": `"telephone`",`
        `"userSig`": `"xxxxxxxx`",`
        `"roomId`": 8888`
        },`
        `"phonenumber`": `"88888888888`"`
    }"

$response = Invoke-RestMethod `
'https://api.sipx.cn/v2205/trtc/startup?api_key=23456789&expire_at=1672531200&signature=d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk' `
-Method 'POST' -Headers $headers -Body $body

$response | ConvertTo-Json
