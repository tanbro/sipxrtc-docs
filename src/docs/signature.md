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

!!! Note
    `expire_at` 是 Unix Epoch 时间戳，在 URL query string 中应使用十进制 ASCII 字符串表示。

    当 [SIPx][] 收到 WebAPI 请求时，如果时间戳晚于后台服务器的当前时间，则拒绝服务。

    所以，开发者应使用合理的过期时间:

    - 过短的过期时间可能因不同计算机之前的时间误差导致意料之外的服务拒绝
    - 过长的过期时间则有更大的安全风险

    建议开发者为己方的服务器正确设置授时服务，使用1到2小时的签名过期时长。

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
1. 去掉 BASE64 结果字串的填充字符 `"="`，得到的结果就是签名字符串。

该算法可用以下伪代码表示:

<!-- markdownlint-disable code-block-style -->
```py title="签名算法伪代码"
h = hmac_sha256(key=api_secret)
h.update(api_key)
h.update(expire_at)
d = h.digest()
s = urlsafe_base64_encode(d)
result = s.rstrip("=")
```
<!-- markdownlint-enable code-block-style -->

假设 [SIPx][] 为开发者分配的 `api` 密钥对是:

| :material-variable: 参数 | :material-variable-box: 值 |
| ------------------------ | -------------------------- |
| `api_key`                | `"23456789"`               |
| `api_secret`             | `"k69x50j0"`               |

另假设签名过期在 UTC 时间 2023年1月1日0点(`2023-01-01T00:00:00+00:00`)，其 Unix Epoch 时间戳是 `1672531200`。

那么，得到的签名结果会是 `VUUnKfDFh3ACTPP-vafVo_nwAP6PZ2HOZznBOviWfNE`，
而 WebAPI 请求的 URL query string 部分应是:

<!-- markdownlint-disable code-block-style -->
```title="带有签名参数的 URL Query String 部分"
?api_key=23456789&expire_at=1672531200&signature=VUUnKfDFh3ACTPP-vafVo_nwAP6PZ2HOZznBOviWfNE
```
<!-- markdownlint-enable code-block-style -->

## 代码实现举例

以下是几种常见语言的签名算法实现代码片段。

### JavaScript

<!-- markdownlint-disable code-block-style -->
```js title="Node.js"
--8<-- "snippets/signature-node.js"
```
<!-- markdownlint-enable code-block-style -->

<!-- markdownlint-disable code-block-style -->
```js title="Browser"
--8<-- "snippets/signature-browser.js"
```
<!-- markdownlint-enable code-block-style -->

### Python

<!-- markdownlint-disable code-block-style -->
```py
--8<-- "snippets/signature.py"
```
<!-- markdownlint-enable code-block-style -->

### PHP

<!-- markdownlint-disable code-block-style -->
```py
--8<-- "snippets/signature.php"
```
<!-- markdownlint-enable code-block-style -->
