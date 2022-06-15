import java.util.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.lang3.StringUtils;

class SignatureSnippet {
    public static void main(String args[]) throws Exception {

        String API_KEY = "23456789";
        String API_SECRET = "k69x50j0";
        String EXPIRE_AT = "1893456000";

        String algorithm = "HmacSHA256";
        byte[] key = API_SECRET.getBytes();
        byte[] msg = (API_KEY + EXPIRE_AT).getBytes();

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
