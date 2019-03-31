package com.example.bike.Sendmesg;

import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
import org.springframework.stereotype.Service;

@Service
public class Sendmesglmp implements Sendmesg {


    @Override
    public Boolean sendmesg(String value, String phone, String SMS) {
        boolean FLG = true;
        DefaultProfile profile = DefaultProfile.getProfile(
                "default",          // 地域ID
                      // RAM账号的AccessKey ID
                "RjLbXyduymIHu5MIDs5iXhcwEAVt81"); // RAM账号Access Key Secret
        IAcsClient client = new DefaultAcsClient(profile);
        CommonRequest request = new CommonRequest();
        //request.setProtocol(ProtocolType.HTTPS);
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");
        request.putQueryParameter("PhoneNumbers", phone);
        request.putQueryParameter("SignName", "深度单车");
        request.putQueryParameter("TemplateCode", SMS);//SMS_162521754 SMS_161595011
        request.putQueryParameter("TemplateParam", "{\"code\":\""+value+"\"}");

        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
            System.out.println("response.getData()");
        } catch (Exception e) {
            e.printStackTrace();
            FLG =false;

        }
        return FLG;

    }
}
