# 结束呼叫

## 概述

该接口用于 结束腾讯云实时音视频(TRTC) 到 SIP 电话的呼叫。

调用后，将正在进行的呼叫拆线，无论其处于何种状态；同时将对应的 TRTC 用户移出房间。

> note:
    - 如果电话呼叫断线，[SIPx][] 会将对应的 TRTC 用户移出房间。
    - 如果 TRTC 用户被移出或者房间被解散，[SIPx][] 会将对应的电话挂断。

所以，我们实际上只需通过 TRTC 的房间 API，即可“优雅的”结束呼叫。

!!! summary
    <!-- markdownlint-disable-next-line -->
    因此，推荐的方式是使用 TRTC [服务端 API 的房间管理相关接口](https://cloud.tencent.com/document/product/647/37078#.E6.88.BF.E9.97.B4.E7.AE.A1.E7.90.86.E7.9B.B8.E5.85.B3.E6.8E.A5.E5.8F.A3){target=_blank} ，**移出用户**或者**解散房间**，而**不是**使用本章节所述的“结束呼叫”接口。

## 请求

- `Method`: `POST`
- `Path`: `/trtc/shutdown`
- `Content-Type`: `application/json`

- `Body`

    JSON 数据结构[^1]：

    | :material-variable: 属性 | :material-alpha-t-box: 数据类型 | :material-null: 默认值 | :material-note-text-outline: 说明 |
    | ------------------------ | ------------------------------- | ---------------------- | --------------------------------- |
    | `id`❗                    | `string`                        |                        | 要结束的呼叫 ID                   |

    样例:

    ```json
    {
        "id": "a0f93afd"
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
