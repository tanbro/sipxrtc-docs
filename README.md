# SIPx Docs

[sipx][] 的开发手册文档站，地址是： <https://sipx.cn/docs/develop-guide/>

使用 mkdocs material 制作。

## 关于开源

> 该项目、代码不可用于商业目的；如需进行商业应用，请联系作者。该项目允许个人学习，修改和使用。基于该项目开发的项目、代码需要开放源代码，且在项目的根目录提供该文件并注明变更。不得利用该项目申请专利、著作权或任何其它资质、权利；不得将该项目用于商标或商业文件，也不得暗示使用。该项目的作者与拥有者不承担使用其后带来的义务，也不承诺提供后期维护。广州市和声信息技术有限公司拥有该项目的全部权利以及该协议的最终解释权。

通过这个项目，学习者可以了解:

1. 使用 Markdown 编写文档站点
1. 一些无服务器的静态站使用方法

## Deploy

HOST 在腾讯云 COS 静态站点，访问地址 static.sipx.cn/docs.

在 `.env` 写好腾讯云账户的 `TENCENT_SECRET_ID`, `TENCENT_SECRET_KEY`， 以及 Bucket 的 `REGION` (`ap-guangzhou`)，

然后执行:

```bash
npx serverless deploy
```

[sipx]: https://sipx.cn/ "实现互联网音视频和SIP话路的互联互通"
