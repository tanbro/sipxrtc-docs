# API 说明

[SIPx][] 的 API 是 OpenAPI 样式的 RESTful WebAPI， 它遵照 OpenAPI `3.0` 标准。

它的入口 URL 格式是这样的:

```linenums="0" hl_lines="1"
https://api.sipx.cn/v2205/boo/foo/baz
        \________/  \___/ \_________/
            |         |        |
            A         B        C
```

- `A`: API 服务器地址

    [SIPx][] 的 API 服务器地址为 `api.sipx.cn`，它接受 HTTP 1.1 安全连接

- `B`: 接口版本

    用于不同版本接口的共存。目前的版本是 `v2205`。当新的功能需求无法与原有接口定义兼容时，我们将发布新的API，同时保留原版本。

- `C`: API 功能路径

    WebAPI 的 Path 路径。[SIPx][] 为每个功能接口定义了不同的路径。

`v2205` 的 OpenAPI 定义文件访问地址是: <https://sipx.cn/docs/openapi/v2205/openapi.json>{target=_blank}。

我们还提供了该定义文件的 Swagger 图形界面，它的访问地址是: <https://sipx.cn/docs/openapi/v2205/swagger-ui>{target=_blank}。

直接阅读 OpenAPI 定义可以了解到开发说明中缺少的细节。
