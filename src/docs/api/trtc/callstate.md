# 呼叫状态

## 概述

开发者可以主动查询指定呼叫 ID 的状态，也可以在发起呼叫时指定 `callStateNotifyUrl`，用于接收呼叫状态回调通知。

## 主动查询呼叫状态

该接口用于获取腾讯云实时音视频(TRTC) 到 SIP 电话的呼叫状态。

!!! attention
    如果呼叫已经结束，服务器有可能返回 `404 Not Found`

### 请求

- `Method`: `GET`
- `Path`: `/trtc/callstate`

- `URL` 参数[^1]:

| :material-variable: 参数 | :material-note-text-outline: 说明 |
| ------------------------ | --------------------------------- |
| `id`❗                    | 呼叫 ID                           |

### 回复

JSON 数据结构[^1]：

| :material-variable: 属性 | :material-alpha-t-box: 数据类型 | :material-null: 默认值 | :material-note-text-outline: 说明 |
| ------------------------ | ------------------------------- | ---------------------- | --------------------------------- |
| `data`❗                  | `string`                        |                        | 呼叫信息行数据                    |
| `done`❗                  | `boolean`                       |                        | 呼叫是否已经完结(拆线)            |

样例[^2]:

```js
{
  "data": 
    "2022-06-11T22:22:41.909837+08:00 1 CALLING 0\n" +
    "2022-06-11T22:22:42.505195+08:00 3 EARLY 180 Ringing\n" +
    "2022-06-11T22:22:46.758498+08:00 3 EARLY 183 Session Progress\n" +
    "2022-06-11T22:22:50.400547+08:00 4 CONNECTING 200 OK\n" +
    "2022-06-11T22:22:50.402426+08:00 5 CONFIRMED 200 OK\n" +
    "2022-06-11T22:23:38.690629+08:00 6 DISCONNCTD 200 Normal call clearing\n",
  "done": true
}
```

## 呼叫状态 Web 回调

如果发起呼叫时，设置了 `callStateNotifyUrl` 属性，[SIPx][] 会在呼叫状态发生变化时向该 URL POST 呼叫信息 JSON 数据。

!!! attention
    [SIPx][] 进行呼叫状态 Web 回调时，**不**采取失败重试。

举个例子：
如果发起呼叫时，指定 `callStateNotifyUrl` 属性为 `http://example.com/callstate?id=foo.baz`。
那么，当呼叫发起时，[SIPx][]就会向这个地址发送这样的 POST 请求:

```http
POST /callstate?id=foo.baz HTTP/1.1
Host: example.com
Content-Type: application/json

{
    "timestamp": 1654957418.690629,
    "state": 1,
    "state_text": "CALLING",
    "status_code": 0,
    "reason": ""
}
```

这个例子中的 JSON 数据，与上一节例中获取到的呼叫状态的第一行的平面文本数据是相对应的。

## 数据格式

主动查询和状态回调的呼叫状态数据的格式有以下不同：

- 当主动查询呼叫状态时，服务器返回从呼叫启动时开始的所有状态变化的列表，每一行表示一次呼叫状态变化；

    而当接收呼叫状态回调时，每次只推送一条当前状态变化数据，使用 JSON 格式。

- 主动查询呼叫状态时，每行数据都是是空格分隔的平面文本；

    而当接收呼叫状态回调时，数据使用 JSON 格式。

- 当主动查询呼叫状态时，时间是ISO 8601 格式字符串；

    而当接收呼叫状态回调时，时间是用浮点数表示的 Unix Epoch 时间戳。

主动查询得到的行数据形如：

```log
2022-06-11T22:22:41.909837+08:00 1 CALLING 0
2022-06-11T22:22:42.505195+08:00 3 EARLY 180 Ringing
2022-06-11T22:22:46.758498+08:00 3 EARLY 183 Session Progress
2022-06-11T22:22:50.400547+08:00 4 CONNECTING 200 OK
2022-06-11T22:22:50.402426+08:00 5 CONFIRMED 200 OK
2022-06-11T22:23:38.690629+08:00 6 DISCONNCTD 200 Normal call clearing
```

1. 第`1`个空格之前是： ISO 8601 格式的时间
1. 第`1`个空格到第`2`个空格之间是：呼叫状态枚举值
1. 第`2`个空格到第`3`个空格之间是：呼叫状态文本
1. 第`3`个空格到第`4`个空格之间是：SIP Status Code
1. 第`4`个空格之后(可以为空)：SIP Status Text

而 Web 回调推送的 JSON 对象形如：

```json
{
    "timestamp": 1654957418.690629,
    "state": 1,
    "state_text": "CALLING",
    "status_code": 0,
    "reason": ""
}
```

如果发生了 `n` 次呼叫状态变化，则进行 `n` 次 Web 回调。
其JSON 数据格式定义如下表[^1]：

| :material-variable: 属性 | :material-alpha-t-box: 数据类型 | :material-note-text-outline: 说明 |
| ------------------------ | ------------------------------- | --------------------------------- |
| `timestamp`❗             | `number`                        | Unix 时间戳                       |
| `state`❗                 | `integer`                       | 呼叫状态枚举值                    |
| `state_text`❗            | `string`                        | 呼叫状态文本                      |
| `status_code`❗           | `string`                        | SIP Status Code                   |
| `reason`                 | `string`                        | SIP Status Text                   |

呼叫状态的枚举值/文本定义表:

| :material-variable: 枚举 | :material-alpha-t-box: 文本 | :material-note-text-outline: 说明 |
| ------------------------ | --------------------------- | --------------------------------- |
| `1`                      | `CALLING`                   | 呼出开始                          |
| {--`2`--}                | {--`INCOMING`--}            | {--呼入邀请--}                    |
| `3`                      | `EARLY`                     | 早媒体                            |
| `4`                      | `CONNECTING`                | 连接                              |
| `5`                      | `CONFIRMED`                 | 接通                              |
| `6`                      | `DISCONNCTD`                | 拆线                              |

[^1]:
    !!! info "符号说明"
        - ❗: 必须提供
        - ↪️: 隶属于上一级对象的属性

[^2]:
    为了表现多行文本，此处所书并非真正有效的 JSON 格式字符串。
