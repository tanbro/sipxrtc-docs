import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import javax.json.Json;
import javax.json.JsonObject;

class TrtcStartupSnippet {
    public static void main(String args[]) throws Exception {

        // 腾讯云的 TRTC 参数
        // SIPX 使用这里指定的 TRTC APP 与 User 传递电话呼叫的音频流
        // 请替换成你实际拥有的 ID 与签名
        Integer TRTC_APP_ID = 8888888;
        String TRTC_USER_ID = "telephone";
        String TRTC_USER_SIG = "xxxxxxxx";
        Integer TRTC_ROOM_ID = 8888;

        // SIPX 的 API 签名参数
        // 请替换成你实际拥有的 ID 与签名
        String API_KEY = "23456789";
        String EXPIRE_AT = "1893456000";
        String SIGNATURE = "d7vG2xBURXT-M-BdmFcCLYTHIh1chSo6SG3KT9SNhMk";

        // SIPx 服务器地址
        String server = "https://api.sipx.cn";
        String path = "/v2205/trtc/startup";
        // Query 部分带有签名参数的 URL
        String url = String.format(
                "%s%s?api_key=%s&expire_at=%s&signature=%s",
                server, path, API_KEY, EXPIRE_AT, SIGNATURE);

        String body = Json.createObjectBuilder()
                .add("trtcParams", Json.createObjectBuilder()
                        .add("sdkAppId", TRTC_APP_ID)
                        .add("userId", TRTC_USER_ID)
                        .add("userSig", TRTC_USER_SIG)
                        .add("roomId", TRTC_ROOM_ID))
                .add("phonenumber", "88888888888")
                .build().toString();

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .header("Content-Type", "application/json")
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}
