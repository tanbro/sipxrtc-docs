# 快速开始

在这一章，我们以腾讯云实时音视频(TRTC)为例，从零开始构建一个简单的程序：这个程序配合腾讯云官方的 [Web Demo][] 实现一对一以及多人 RTC 与手机呼叫的互通。

其工作步骤是：

1. 使用腾讯云 [Web Demo][]{target="_blank"} 进入 TRTC 房间。
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

    登录[实时音视频控制台][]{target="_blank"}:

      1. 新建或者使用选择一个现有应用用作本次体验
      1. 记录这个应用的 `SDKAppID` 与密钥（`Key`）备用

      1. 在[实时音视频控制台][]{target="_blank"} 中，打开 *开发辅助* ➡️ [*UserSig生成&校验*](https://console.cloud.tencent.com/trtc/usersigtool){target="_blank"} 页面

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

1. 用浏览器(推荐使用 Chrome)访问 TRTC 检测页面(<https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html>{target="_blank"})，进行设备支持检测，确保检测通过。

1. 用通过检测的浏览器打开腾讯云官方 [Web Demo][]{target="_blank"} (<https://web.sdk.qcloud.com/trtc/webrtc/demo/quick-demo-js/index.html>)。打开后，请仔细阅读页面的说明。

    [Web Demo][]{target="_blank"} 页面初始化成功之后，会自动分配 `UserId` 和 `RoomId`，当然我们也可以手动修改。

    !!! warning
        [Web Demo][]{target="_blank"} 的 `UserId` **一定不要** 和我们之前在 [实时音视频控制台][]{target="_blank"} 准备的用户混淆，一定要填写**不一样的用户名**。

        这是因为：电话到 TRTC 的互通需要两种不同的 TRTC 用户，一种作为普通的用户进行互联网音视频收发，而另一个（此例中名为`"telephone"`的）是 [SIPx][] 在后台收发电话音频流的特殊用户。

    `SDKAppId` 和 `SecretKey` 是必须手动填写的，我们将之前从 [实时音视频控制台][]{target="_blank"} 中记录下来的相应数据填在这里。

      在下文的程序代码中，我们使用以下变量表示上面步骤中提及的数据:

      | :material-variable: 变量 | :material-note-text-outline: 说明 |
      | ------------------------ | --------------------------------- |
      | `TRTC_ROOM_ID`           | TRTC 房间 ID                      |

## API 签名

[签名算法](signature.md) 这一章详细说明了如何对 [SIPx][] WebAPI 进行签名。

在按照此章节的说明生成签名之后，我们使用以下变量表示得到的签名数据:

| :material-variable: 变量 |              :material-variable-box: 值              | :material-note-text-outline: 说明 |
| ------------------------ | ---------------------------------------------------- | --------------------------------- |
| `API_KEY`                | `#!js "23456789"`                                    | [SIPx][] 分配的 API Key           |
| `API_SECRET`             | `#!js "k69x50j0"`                                    | [SIPx][] 分配的 API Key Secret    |
| `EXPIRE_AT`              | `#!js "1893456000"`                                  | 签名过期时间戳                    |
| `SIGNATURE`              | `#!js "d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk"` | 签名的密文                        |

!!! attention
    实际编写程序时，请将上面的举例的签名数据替换成真实有效的值。

## 调用 API

[SIPx][] 的 OpenAPI 接口 `/v2205/trtc/startup` 用于发起针对 TRTC 的电话呼叫。

我们向这个接口 POST 带有如下的 JSON 数据的 HTTP 请求：

<!-- markdownlint-disable code-block-style -->
```http title="HTTP Request"
POST /v2205/trtc/startup?api_key=23456789&expire_at=1672531200&signature=d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk HTTP/1.1
Host: api.sipx.cn
Content-Type: application/json

{
    "trtcParams": {
        "userId": "telephone",
        "userSig": "xxxxxxxx",
        "roomId": 8888
    },
    "phonenumber": "88888888888"
}
```
<!-- markdownlint-enable -->

[SIPx][] 收到这个请求后:

1. 读取 URL 的 Query string 进行签名验证。
1. 以 TRTC 用户 `"telephone"` 的身份进入 ID 为 `8888` 的房间。
1. 呼叫手机号码 `"88888888888"`（它不是真实存在的号码，仅用于举例）。
1. 将手机呼叫的音频传入 TRTC 房间，同时将房间内所有发言用户的音频混流后传给手机。

[SIPx] 在成功进入 TRTC 房间后，如果号码有效、呼叫可以启动，就回复这一 HTTP 请求，并在回复的内容数据中用 JSON 格式返回执行的结果 ID。
如：

<!-- markdownlint-disable code-block-style -->
```http title="HTTP Response"
HTTP/1.1 200 OK
Content-Type: application/json

{
    "id": "1d6bb77c"  // 此次呼叫的 ID
}
```
<!-- markdownlint-enable -->

!!! tips
    访问
    <https://static.sipx.cn/openapi/v2205/swagger-ui/>{target="_blank"}
    查看详细的 OpenAPI 定义

!!! attention
    实际调测时，请将上面的例子中的 ID、签名、用户名等数据替换成真实的值。

## 例子代码

以下是使用几种常见编程语言或开发工具调用该 WebAPI 的代码片段。

=== "cURL"

    ```bash
    --8<-- "snippets/trtc_startup.curl.sh"
    ```

=== "Node.JS"

    ```js
    --8<-- "snippets/trtc_startup.js"
    ```

=== "PHP"

    ```php
    --8<-- "snippets/trtc_startup.php"
    ```

=== "Python"

    !!! info
        以下代码**不兼容**老旧的 python2 标准

    ```py
    --8<-- "snippets/trtc_startup.py"
    ```

!!! attention
    注意要将例子代码中的 ID、签名、用户名、电话号码等数据替换成真实的值。

## 体验使用

回到 TRTC [Web Demo][]{target="_blank"} 页面，点击 `Join Room` 按钮，进入房间。

然后执行上一节的例子代码。执行成功后，[SIPx][] 将呼叫指定的电话，并将电话呼叫音频导入房间，浏览器和电话可进行通话。

可以邀请更多人通过 [Web Demo][]{target="_blank"} 进入房间，形成多客户端到电话的语音通话。

[Web Demo]: https://web.sdk.qcloud.com/trtc/webrtc/demo/quick-demo-js/index.html
[实时音视频控制台]: https://console.cloud.tencent.com/trtc
