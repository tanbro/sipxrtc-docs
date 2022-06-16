$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")

$body = "{`
    `"trtcParams`": {`
        `"userId`": `"telephone`",`
        `"userSig`": `"eJwtzE0LgkAUheH-Muuw69gMJbRoyohKCkZo48aYW91SG9SkD-rvmbo8zwvnw6KtdmosmM*4A2zQbjKYV3SilitM0V7uOfaxNLfEWjLMd0cAUgKHcVfwaanAxoUQHAA6rSj7mxQeeBNX9FrSufnWuniliQrKgzyq3TIK64fQksfDVbA2Gb*G*-diNlcbrUKYsu8PZkUyoA__`",`
        `"roomId`": 1001`
        },`
        `"phonenumber`": `"18602015268`"`
    }"

$response = Invoke-RestMethod `
'https://api.sipx.cn/v2205/trtc/startup?api_key=23456789&expire_at=1672531200&signature=d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk' `
-Method 'POST' -Headers $headers -Body $body

$response | ConvertTo-Json
