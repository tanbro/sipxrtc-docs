const https = require("https");
const querystring = require("node:querystring");

// 腾讯云的 TRTC 参数
// SIPX 使用这里指定的 TRTC APP 与 User 传递电话呼叫的音频流
// 请替换成你实际拥有的 ID 与签名
const TRTC_APP_ID = 8888888;
const TRTC_USER_ID = "telephone";
const TRTC_USER_SIG = "xxxxxxxx";
const TRTC_ROOM_ID = 8888;

// SIPX 的 API 签名参数
// 请替换成你实际拥有的 ID 与签名
const API_KEY = "23456789";
const EXPIRE_AT = "1893456000";
const SIGNATURE = "d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk";

// 签名参数
let qs = querystring.stringify({
  api_key: API_KEY,
  expire_at: EXPIRE_AT,
  signature: SIGNATURE,
});

let options = {
  method: "POST",
  // SIPx 服务器地址
  hostname: "api.sipx.cn",
  path: `/v2205/trtc/startup?${qs}`,
  headers: {
    "Content-Type": "application/json",
  },
};

let req = https.request(options, (res) => {
  let chunks = [];

  res.on("data", (chunk) => {
    chunks.push(chunk);
  });

  res.on("end", (chunk) => {
    let body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", (error) => {
    console.error(error);
  });
});

let payload = JSON.stringify({
  trtcParams: {
    sdkAppId: TRTC_APP_ID,
    userId: TRTC_USER_ID,
    userSig: TRTC_USER_SIG,
    roomId: TRTC_ROOM_ID,
  },
  phonenumber: "18888888888",
});

req.write(payload);
req.end();
