# 快速开始

在这一章，我们以腾讯云实时音视频(TRTC)为例，从零开始构建一个简单命令行应用。

这个应用将配合腾讯云官方的 Web Demo 进行一对一以及多人 RTC 到手机音视频对话。

其工作步骤是：

1. 使用腾讯云 Web Demo 进入 TRTC 房间。
1. 执行这个例子程序，调用 [SIPx][] 的 API。
1. 等待 [SIPx][] 后台将呼叫手机，它会把呼叫的音频加入上一步骤中的 TRTC 房间。
1. 手机用户和浏览器用户开始一对一音频通话。
1. ( *可选* ) 邀请更多的人使用腾讯云官方的浏览器例子客户端进入这个房间，进行多人音视频对话。手机用户可以仅音频模式参与多人视频对话。

## 准备工作

- 一台主流配置的 PC 或 Mac 电脑:
    - 配有网络摄像头和麦克风

    - 安装 Chrome, Firefox, Edge, Safari 等主流 Browser 的较新版本

        要求同时满足接收（播放）与发送（上麦）能力，参考 <https://cloud.tencent.com/document/product/647/17249>

- 确保已开通腾讯云 TRTC

    - 登录[实时音视频控制台](https://console.cloud.tencent.com/trtc)

        新建或者使用选择一个现有应用用作本次体验，然后记录下这个应用的 `SDKAppID` 与密钥（`Key`）备用

- 用浏览器(推荐使用 Chrome)访问[TRTC 检测页面](https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html)，进行设备支持检测。

- 打开腾讯云官方的 Web Demo <https://web.sdk.qcloud.com/trtc/webrtc/demo/quick-demo-js/index.html>

    打开后，请仔细阅读页面的说明。

    Demo 页面初始化成功之后，会自动分配 `UserId` 和 `RoomId`，当然我们也可以手动修改。
    `SDKAppId` 和 `SecretKey` 是必须手动填写的，我们将从 TRTC 控制台或缺的 ID 和 Key 填在这里。

## 调用 SIPx 的 WebAPI

我们编写一个简单的命令行程序，让它调用 SIPx 的 TRTC 呼叫开始接口。

!!! tips
    可访问 <https://static.sipx.cn/openapi/v2205/swagger-ui/> 查看具体的 OpenAPI 定义

=== "Python"

    ```python
    import http.client
    import json
    
    conn = http.client.HTTPSConnection("api.sipx.cn")
    payload = json.dumps({
      "trtcParams": {
        "sdkAppId": 123,
        "userId": "telephone",
        "userSig": "xxxxxx",
        "roomId": 456
      },
      "phonenumber": "13987654321"
    })
    headers = {
      'Content-Type': 'application/json'
    }
    conn.request("POST", "/v2205/trtc/startup", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(data)
    ```

=== "Node.JS"

    ```js
    const https = require('follow-redirects').https;
    const fs = require('fs');
    
    let options = {
      'method': 'POST',
      'hostname': 'api.sipx.cn',
      'path': '/v2205/trtc/startup',
      'headers': {
        'Content-Type': 'application/json'
      }
    };
    
    let req = https.request(options, (res) => {
      let chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", (chunk) => {
        let body = Buffer.concat(chunks);
        console.log(body.toString());
      });
    
      res.on("error", function (error) {
        console.error(error);
      });
    });
    
    let postData = JSON.stringify({
      "trtcParams": {
        "sdkAppId": 123,
        "userId": "telephone",
        "userSig": "xxxxxx",
        "roomId": 405
      },
      "phonenumber": "13987654321"
    });
    
    req.write(postData);    
    req.end();
    ```

=== "PHP"

    ```php
    <?php
    
    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://api.sipx.cn/v2205/trtc/startup',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>'{
          "trtcParams": {
            "sdkAppId": 123,
            "userId": "telephone",
            "userSig": "xxxxxx",
            "roomId": 456
          },
          "phonenumber": "13987654321"
    }',
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
      ),
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    echo $response;
    ```
