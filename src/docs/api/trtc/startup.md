# 启动呼叫

## 概述

该接口用于启动腾讯云实时音视频(TRTC) 到 SIP 电话的呼叫。

拨打电话，并将电话呼叫以腾讯云 TRTC 用户的身份(仅音频)加入到房间。

房间内的其它 TRTC 用户会听到电话的声音；电话的被叫方也会听到房间中其它用户的声音。

## 请求

- `Method`: `POST`
- `Path`: `/trtc/startup`
- `Content-Type`: `application/json`

- `Body`

    JSON 数据结构[^1]：

    | :material-variable: 属性 | :material-alpha-t-box: 数据类型 | :material-null: 默认值 | :material-note-text-outline: 说明 |
    | ------------------------ | ------------------------------- | ---------------------- | --------------------------------- |
    | `phonenumber`❗           | `string`                        |                        | 要拨打的电话号码                  |
    | `ttl`                    | `integer`                       | `1800`                 | 呼叫的最大允许时间（秒）          |
    | `trtcParams`❗            | `object`                        |                        | 腾讯云 TRTC 进房参数              |
    | ↪️`sdkAppId`❗            | `integer`                       |                        | 腾讯云 TRTC 的应用ID              |
    | ↪️`userSig`❗             | `string`                        |                        | 腾讯云 TRTC 的用户签名            |
    | ↪️`roomId`❗              | `integer`                       |                        | 腾讯云 TRTC 的房间号码            |
    | ↪️`userId`❗              | `string`                        |                        | 腾讯云 TRTC 的用户标识            |
    | `callStateNotifyUrl`     | `string`                        |                        | 呼叫状态 Web callback URL         |

    样例:

    ```json
    {
        "phonenumber": "88888888888",
        "ttl": 60,
        "trtcParams": {
            "sdkAppId": 1,
            "userSig": "ABCDEFGHIJKLMNOP",
            "roomId": 1,
            "userId": "A"
        },
        "callStateNotifyUrl": "http://example.com"
    }
    ```

## 回复

JSON 数据结构[^1]：

| :material-variable: 属性 | :material-alpha-t-box: 数据类型 | :material-null: 默认值 | :material-note-text-outline: 说明 |
| ------------------------ | ------------------------------- | ---------------------- | --------------------------------- |
| `id`❗                    | `string`                        |                        | 呼叫 ID                           |

样例:

```json
{
    "id": "a0f93afd"
}
```

[^1]:
    !!! info "符号说明"
        - ❗: 必须提供
        - ↪️: 隶属于上一级对象的属性
