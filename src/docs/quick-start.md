# 快速开始

在这一章，我们以腾讯云实时音视频(TRTC)为例，从零开始构建一个简单的应用场景：
调用 [SIPx][] 接口，结合腾讯云官方 [Web Demo][]{target="_blank"}，实现一对一以及多人 RTC 与手机呼叫的互通。

其工作步骤是：

1. 使用腾讯云 [Web Demo][]{target="_blank"} 进入 TRTC 房间。
1. 执行例子代码，调用 [SIPx][] 的 API。
1. [SIPx][] 呼叫手机(本例中使用 [linphone][]{target="_blank"} 模拟手机呼叫)，建立手机与 TRTC 房间的音频交换。
1. 手机用户和浏览器用户开始一对一音频通话。
1. ( *可选* ) 邀请更多的人使用 使用腾讯云 [Web Demo][]{target="_blank"} 进入这个房间，进行多人音视频对话。手机用户以仅音频模式参与多人音视音频对话。

## 准备工作

1. 一台主流配置的 PC 或 Mac 计算机，作为普通的 TRTC 音视频客户端:
    - 配有：摄像头，麦克风，头戴式耳机(不推荐使用外放音源，以防回声噪音)

    - 安装 Chrome, Firefox, Edge, Safari 等主流 Browser 的较新版本(只需安装其中之一)

        浏览器要同时具备接收（播放）与发送（上麦）能力。详情请参考 <https://cloud.tencent.com/document/product/647/17249>{target="_blank"}

1. 另一台主流配置的 PC 或 Mac 计算机，在这台电脑上安装并配置 [linphone][] 用于模拟手机:

    该计算机应配有：麦克风，头戴式耳机(不推荐使用外放音源，以防回声噪音)

    !!! note
        [linphone][]{target="_blank"} 是功能较为齐全的 GPL 授权开源 SIP “软电话”。
        它可用来代替真实的 VoIP 线路、网关、服务进行简便快速的呼叫体验。

        我们需要配置 [linphone][]{target="_blank"} 向 [SIPx][] 进行 SIP 注册。
        当 [SIPx][] 呼叫手机时，根据注册信息，呼叫这台电脑上的 [linphone][]{target="_blank"}。
        [linphone][]{target="_blank"} 振铃时，我们用它接听并进行通话——这样就可以模拟电话呼叫了。

    !!! tips
        如果您已经有了 SIP 线路/网关/服务，完全可以直接这些 VoIP 设施注册到 [SIPx][]，而不必用 [linphone][]{target="_blank"} 模拟。

        在这种情况下，[SIPx][] 呼叫真实的 VoIP 设施，再由 VoIP 设施呼叫手机。
        此时，可**忽略**这一小节关于 [linphone][]{target="_blank"} 配置的说明。

    !!! important
        SIP 注册的主要参数：

        - 注册用户名: [SIPx][] 为开发者账户分配的 `api_key`
        - 注册密码: [SIPx][] 为开发者账户分配的 `api_secret`
        - 注册服务器地址: `sip1.sipx.cn`
        - 传输协议: `UDP`

        ---

        > ⚠️ ==**请注意妥善保管密码！**==

        ---

        > ℹ️ 如果您不知道 `api_key`、`api_secret`， 或者没有 [SIPx][] 的开发者账户，请按照网站上的联系方式咨询我们。

    1. 访问 [linphone][]{target="_blank"} 官网 <https://linphone.org>{target="_blank"}，下载适用于目标平台的软件包，并安装。

    1. 运行 [linphone][]{target="_blank"}，打开其设置菜单，进行配置:

        - *SIP 账户* 页，点击 *添加账户*，填写这些选项:
            - *主 SIP 账户设置*:
                - *SIP 地址*: `sip:${api_key}@sip1.sipx.cn`
                - *SIP 服务器地址*: `sip:sip1.sipx.cn`
                - *交通工具*: `UDP`
                - *注册*: 启用
            - *NAT 和防火墙*:
                - *启用 ICE*: 不启用

            ![img](../images/linphone-options-account.png)

            点击确定按钮，[linphone][]{target="_blank"} 将尝试以 `api_key` 为 ID 注册到 [SIPx][]，并在收到注册回复后弹出密码输入窗口。
            此时，将 `api_secret` 的内容输入到密码输入框，并点击确定。

        - *音频* 页:

            选择可用的播放和捕获设备，并启用以下音频编解码器: *PCMU*, *PCMA*, *G729*

        - *通话和聊天* 页:
            - *通话* ➡️ *加密*: 选择 *无*

        - *网络* 页:
            - *传输* ➡️ *允许 IPv6*: 不启用
            - *NAT 和防火墙* ➡️ *启用 ICE*: 不启用

1. 确保已开通腾讯云 TRTC

    登录[实时音视频控制台][]{target="_blank"}:

      1. 新建或者使用选择一个现有应用用作本次体验
      1. 记录这个应用的 `SDKAppID` 与密钥（`Key`）备用

      1. 在[实时音视频控制台][]{target="_blank"} 中，打开 *开发辅助* ➡️ [*UserSig生成&校验*](https://console.cloud.tencent.com/trtc/usersigtool){target="_blank"} 页面

          1. 设置用户名，如 `"telephone"`（此处仅用于举例，可使用任何有效名称）。
              在后面的例子代码中， [SIPx][] 后台以这个用户的身份从/向 TRTC 房间收/发音频数据。
          1. 点击 *生成签名(UserSig)*， 生成用户 `"telephone"` 的签名(`UserSig`)，记录下来备用。

    在下文的程序代码中，我们使用以下变量表示上面步骤中提及的数据:

    | :material-variable: 变量 | :material-note-text-outline: 说明 |
    | ------------------------ | --------------------------------- |
    | `TRTC_APP_ID`            | TRTC 应用（`SDKAppID`）           |
    | `TRTC_SECRET_KEY`        | TRTC 密钥（`Key`）                |
    | `TRTC_USER_ID`           | TRTC 用户（`UserID`）             |
    | `TRTC_USER_SIG`          | TRTC 签名（`UserSig`）            |

1. 在第一台计算机上用浏览器(推荐使用 Chrome)访问 TRTC 检测页面(<https://web.sdk.qcloud.com/trtc/webrtc/demo/detect/index.html>{target="_blank"})，进行设备支持检测，确保检测通过。

1. 在第一台计算机上用通过检测的浏览器打开腾讯云官方 [Web Demo][]{target="_blank"} (<https://web.sdk.qcloud.com/trtc/webrtc/demo/quick-demo-js/index.html>{target="_blank"})。打开后，请仔细阅读页面的说明。

    [Web Demo][]{target="_blank"} 页面初始化成功之后，会自动分配 `UserId` 和 `RoomId`，当然我们也可以手动修改。

    !!! warning
        [Web Demo][]{target="_blank"} 的 `UserId` **一定不要** 和我们之前在 [实时音视频控制台][]{target="_blank"} 准备的用户混淆，一定要填写**不一样的用户名**。

        这是因为我们的应用场景需要使用两种不同的 TRTC 用户：
        一种作为普通的用户进行互联网音视频收发，它与 [SIPx][] 无关；
        而另一个（此例中名为`"telephone"`的）是 [SIPx][] 后台用于收发音频流的特殊用户。

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

<!-- markdownlint-disable line-length -->
!!! important
    这里的 `userId` 与 `userSig` 参数，来自我们在 [实时音视频控制台][]{target="_blank"} 中，为 [SIPx][] 专门分配的用户。[SIPx][] 使用这个用户进行 RTC 与电话之间的音频交换。在本例中，该用户名为 `telephone`。

    `roomId` 来自 [Web Demo][]{target="_blank"} 中的房间ID（例中的 `8888` 仅用于示例，不代表实际情况）。我们需要让 [SIPx][] 使用的 `telephone` 用户和 [Web Demo][]{target="_blank"} 中的普通用户进入同一个房间，方可实现声音互通。
<!-- markdownlint-enable -->

[SIPx][] 收到这个请求后:

1. 读取 URL 的 Query string 进行签名验证。
1. 以 TRTC 用户 `telephone` （仅用于示例，不代表实际情况）的身份进入 ID 为 `8888` （仅用于示例，不代表实际情况）的 TRTC 房间。
1. 呼叫手机号码 `88888888888`（它不是真实存在的号码，仅用于举例，不代表实际情况）。
1. 将手机呼叫的音频传入 TRTC 房间，同时将房间内所有发言用户的音频混流后传给手机。

[SIPx] 在成功进入 TRTC 房间后，如果号码有效、呼叫可以启动，就对这一 HTTP 请求进行回复，并在内容数据中用 JSON 格式返回执行的结果 ID。
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

<!-- markdownlint-disable line-length -->
!!! tips
    访问 <https://static.sipx.cn/openapi/v2205/swagger-ui/>{target="_blank"} 查看详细的 OpenAPI 定义
<!-- markdownlint-enable -->

!!! attention
    实际调测时，请将上面的例子中的 ID、签名、用户名等数据替换成真实的值。

## 例子代码

以下是使用几种常见编程语言或开发工具调用该 WebAPI 的代码片段。

<!-- markdownlint-disable no-space-in-code -->
=== "cURL"
    ```bash
    --8<-- "snippets/trtc_startup.curl.sh"
    ```

=== "Java"
    ```java
    --8<-- "snippets/trtc_startup.java"
    ```

=== "JavaScript(Browser)"
    ```js
    --8<-- "snippets/trtc_startup.browser.js"
    ```

=== "JavaScript(Node.js)"
    ```js
    --8<-- "snippets/trtc_startup.node.js"
    ```

=== "PHP"
    ``` php
    --8<-- "snippets/trtc_startup.php"
    ```

=== "PowerShell"
    ```powershell
    --8<-- "snippets/trtc_startup.ps1"
    ```

=== "Python"
    ```py
    --8<-- "snippets/trtc_startup.py"
    ```
<!-- markdownlint-enable -->

!!! attention
    注意要将例子代码中的 ID、签名、用户名、电话号码等数据替换成真实的值。

## 体验使用

回到第一台电脑的 TRTC [Web Demo][]{target="_blank"} 页面，点击 *Join Room* 按钮，进入房间。

然后执行上一节的例子代码。执行成功后，[SIPx][] 将呼叫第二台计算机上的 [linphone][]。
在 [linphone][] 收到 SIP 呼叫后，我们选择接听。
[SIPx][] 会将电话呼叫和 TRTC 房间的音频进行交换。
这样，浏览器和 [linphone][] 就可进行通话了。

可以邀请更多人通过 [Web Demo][]{target="_blank"} 进入房间，形成多 RTC 客户端到电话的语音通话。

[Web Demo]: https://web.sdk.qcloud.com/trtc/webrtc/demo/quick-demo-js/index.html
[实时音视频控制台]: https://console.cloud.tencent.com/trtc
