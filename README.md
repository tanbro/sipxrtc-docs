# SIPx Docs

SIPx 的文档站。

使用 mkdocs material 制作。

HOST 在腾讯云 COS 静态站点，访问地址 static.sipx.cn/docs.

## Deploy

在 `.env` 写好腾讯云账户的 `TENCENT_SECRET_ID`, `TENCENT_SECRET_KEY`， 以及 Bucket 的 `REGION` (`ap-guangzhou`)，

然后执行:

```bash
npx serverless deploy
```

目前只有 POSIX 下的构建脚本， Windows 下得手动构建上传。
