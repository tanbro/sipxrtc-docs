# 快速开始

在这一章，我们以腾讯云实时音视频(TRTC)为例，从零开始构建一个简单的程序：这个程序配合腾讯云官方的 [Web Demo][] 实现一对一以及多人 RTC 与手机呼叫的互通。

其工作步骤是：

1. 使用腾讯云 [Web Demo][] 进入 TRTC 房间。
1. 执行这个例子程序，调用 [SIPx][] 的 API。
1. 等待 [SIPx][] 后台将呼叫手机，它会把呼叫的音频加入上一步骤中的 TRTC 房间。
1. 手机用户和浏览器用户开始一对一音频通话。
1. ( *可选* ) 邀请更多的人使用腾讯云官方的浏览器例子客户端进入这个房间，进行多人音视频对话。手机用户可以仅音频模式参与多人视频对话。

## 准备工作

1. 一台主流配置的 PC 或 Mac 电脑:
    - 配有摄像头，麦克风，耳机或音箱

    - 安装 Chrome, Firefox, Edge, Safari 等主流 Browser 的较新版本

        浏览器要同时具备接收（播放）与发送（上麦）能力。详情请参考 <https://cloud.tencent.com/document/product/647/17249>

1. 确保已开通腾讯云 TRTC

    登录[实时音视频控制台][]:

      1. 新建或者使用选择一个现有应用用作本次体验
      1. 记录这个应用的 `SDKAppID` 与密钥（`Key`）备用

      1. 在[实时音视频控制台][]中，打开 *开发辅助* ➡️ [*UserSig生成&校验*](https://console.cloud.tencent.com/trtc/usersigtool) 页面

          1. 设置用户名，如 `"telephone"`（此处仅用于举例，可使用任何有效名称）。
              在后面的例子代码中， [SIPx][] 用这个用户向 TRTC 房间收发电话的音频数据。
          1. 点击 *生成签名(UserSig)*， 生成用户 `"telephone"` 的签名(`UserSig`)，记录下来备用。

    在下文的程序代码中，我们使用以下变量表示上面步骤中提及的数据:

    | :material-variable: 变量 | :material-note-text-outline: 说明 |
    | ------------------------ | --------------------------------- |
    | `TRTC_APP_ID`            | TRTC 应用（`SDKAppID`）           |
    | `TRTC_SECRET_KEY`        | TRTC 密钥（`Key`）                |
    | `TRTC_USER_ID`           | TRTC 用户（`UserID`）             |
    | `TRTC_USER_SIG`          | TRTC 签名（`UserSig`）            |

1. 用浏览器(推荐使用 Chrome)访问 TRTC 检测页面(<https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html>)，进行设备支持检测，确保检测通过。

1. 用通过检测的浏览器打开腾讯云官方 [Web Demo][] (<https://web.sdk.qcloud.com/trtc/webrtc/demo/quick-demo-js/index.html>)。打开后，请仔细阅读页面的说明。

    [Web Demo][] 页面初始化成功之后，会自动分配 `UserId` 和 `RoomId`，当然我们也可以手动修改。

    !!! warning
        [Web Demo][] 的 `UserId` **一定不要** 和我们之前在[实时音视频控制台][]准备的用户混淆，一定要填写**不一样的用户名**。

        这是因为：电话到 TRTC 的互通需要两种不同的 TRTC 用户，一种作为普通的用户进行互联网音视频收发，而另一个（此例中名为`"telephone"`的）是 [SIPx][] 在后台收发电话音频流的特殊用户。

    `SDKAppId` 和 `SecretKey` 是必须手动填写的，我们将之前从 [实时音视频控制台][] 中记录下来的相应数据填在这里。

      在下文的程序代码中，我们使用以下变量表示上面步骤中提及的数据:

      | :material-variable: 变量 | :material-note-text-outline: 说明 |
      | ------------------------ | --------------------------------- |
      | `TRTC_ROOM_ID`           | TRTC 房间 ID                      |

## SIPx WebAPI 签名

本文档的 [签名算法](signature.md) 章节详细说明了如何对 WebAPI 进行签名。

在按照此章节的说明生成签名之后，我们使用以下变量表示签名相关数据:

| :material-variable: 变量 | :material-note-text-outline: 说明 |
| ------------------------ | --------------------------------- |
| `api_key`                | [SIPx][] 分配的 API Key           |
| `api_secret`             | [SIPx][] 分配的 API Key Secret    |
| `expire_at`              | 签名过期时间戳                    |
| `signature`              | 签名的密文                        |

## 调用 SIPx 的 WebAPI

我们编写一个简单的命令行程序，让它调用 SIPx 的 TRTC 呼叫开始接口。

!!! tips
    可访问 <https://static.sipx.cn/openapi/v2205/swagger-ui/> 查看详细的 OpenAPI 定义

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

[Web Demo]: https://web.sdk.qcloud.com/trtc/webrtc/demo/quick-demo-js/index.html
[实时音视频控制台]: https://console.cloud.tencent.com/trtc
