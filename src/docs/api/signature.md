# 签名算法

[SIPx][] 为每个开发者账户分配一个全局唯一的 `api_key` 用于身份识别，同时分配相对应的 `api_secret` 用于加密验证。

开发者调用 [SIPx][] 的 WebAPI 时，**必须**在**每一个** HTTP 请求的 URL query string 中附加签名参数。

## 参数列表

签名的相关 URL 参数是:

| :material-variable: 参数 | :material-note-text-outline: 说明 |
| ------------------------ | --------------------------------- |
| `api_key`                | [SIPx][] 分配的 API Key           |
| `api_secret`             | [SIPx][] 分配的 API Key Secret    |
| `expire_at`              | 签名过期时间戳                    |
| `signature`              | 签名的密文                        |

!!! important
    `expire_at` 是 Unix Epoch 时间戳整数值，在 URL query string 中使用十进制数字的 ASCII 字符串表示。

    当 [SIPx][] 收到 WebAPI 请求时，如果时间戳晚于后台服务器的当前时间，则拒绝服务。

    所以，开发者应使用合理的过期时间:

    - 过短的过期时间可能因不同计算机之前的时间误差导致意料之外的服务拒绝
    - 过长的过期时间则有更大的安全风险

    建议开发者为己方的服务器配置授时服务，使用1到2小时的签名过期时长。

## 算法步骤说明

签名的算法步骤是这样的：

1. 进行 `HMAC-SHA256` 计算：
    - 以 `api_secret` ==字符串== 为密钥
    - 依次将以下数据作为待加密对象传入加密函数:
        1. `api_key` ==字符串==
        1. 以十进制数字 ==字符串== 表示的 `expire_at` 时间戳整数
1. 对 `HMAC` digest 结果进行 BASE64 编码
1. 对 BASE64 编码后的结果进行 URL 安全处理，方法是:
    - 用 `"-"` 替换掉 `"+"`
    - 用 `"_"` 替换掉 `"/"`
    - 去掉 BASE64 结果字串的填充字符 `"="`

得到的结果就是签名字符串。

该算法可用以下伪代码表示:

<!-- markdownlint-disable code-block-style -->
```py
mac = hmac_sha256(key=api_secret)
mac.update(api_key)
mac.update(expire_at)
data = mac.digest()
signature = base64_encode(data).replace('-', '+').replace('_', '/').trim_end('=')
```
<!-- markdownlint-enable -->

假设 [SIPx][] 为开发者分配的 `api` 密钥对是:

| :material-variable: 参数 | :material-variable-box: 值 |
| ------------------------ | -------------------------- |
| `API_KEY`                | `"23456789"`               |
| `API_SECRET`             | `"k69x50j0"`               |

另假设签名过期在 UTC 时间 2030年1月1日0点(`2030-01-01T00:00:00+00:00`)，其 Unix Epoch 时间戳是 `1893456000`。

<!-- markdownlint-disable-next-line -->
那么，得到的签名结果会是 `d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk`，对应的 WebAPI 请求 URL query string 部分应是:

<!-- markdownlint-disable code-block-style -->
```linenums="0"
?api_key=23456789&expire_at=1672531200&signature=d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk
```
<!-- markdownlint-enable -->

## 例子代码

以下是几种常见语言的签名算法实现代码片段。

<!-- markdownlint-disable no-space-in-code -->
=== "Java"
    ```java
    --8<-- "snippets/signature.java"
    ```

=== "JavaScript(Browser)"
    ```js
    --8<-- "snippets/signature.browser.js"
    ```

=== "JavaScript(Node.js)"
    ```js
    --8<-- "snippets/signature.node.js"
    ```

=== "PHP"
    ```php
    --8<-- "snippets/signature.php"
    ```

=== "Python"
    ```py
    --8<-- "snippets/signature.py"
    ```
<!-- markdownlint-enable -->

## 安全说明

!!! important

    - 注意妥善保存 `API_SECRET`。
    - 不要设置过长的过期时间，1到2小时是推荐的取值范围。
    - 生产环境中，不推荐在客户端计算签名，尤其不推荐在通用浏览器中计算。
      这会带来时差问题和密钥泄露风险。
