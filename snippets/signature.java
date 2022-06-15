import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.lang3.StringUtils;

class SignatureSnippet {
    public static void main(String args[]) throws Exception {

        String api_key = "23456789";
        String api_secret = "k69x50j0";
        String expire_at = "1893456000";

        String algorithm = "HmacSHA256";
        byte[] key = api_secret.getBytes();
        byte[] msg = (api_key + expire_at).getBytes();

        Mac mac = Mac.getInstance(algorithm);
        SecretKeySpec secretKeySpec = new SecretKeySpec(key, algorithm);
        mac.init(secretKeySpec);
        byte[] digest = mac.doFinal(msg);

        byte[] b64Bytes = Base64.getEncoder().encode(digest);
        String b64Str = new String(b64Bytes);
        String signature = StringUtils.stripEnd(b64Str.replace('+', '-').replace('/', '_'), "=");

        System.out.format("Signature: %s\n", signature);
    }
}
