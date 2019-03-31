package com.example.bike.services;


import com.example.bike.Sendmesg.Sendmesg;
import com.example.bike.bikeservice.var.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class Userservicelmp implements Userservice {
    private final Sendmesg sendmesg;
    private final StringRedisTemplate stringRedisTemplate;


    @Autowired
    public Userservicelmp(StringRedisTemplate stringRedisTemplate, Sendmesg sendmesg) {
        this.stringRedisTemplate = stringRedisTemplate;
        this.sendmesg = sendmesg;
    }

    @Override
    public String sendMsgs(User user) {
       //调用腾讯云的短信API向用户发送短行
        //发送短信之前需要生成一个随机的数字4位
        //将发送的手机号座位key，将验证码value保存到redis

        boolean status = true;
        String code = (int)(Math.random()*10000) +"";
        String SMS = "SMS_161595011";
        String phone = user.getPhone();
        sendmesg.sendmesg(code,phone,SMS);
        //将验证码和手机号存入redis数据库
        stringRedisTemplate.opsForValue().set(user.getPhone(),code,500, TimeUnit.SECONDS);

//返回验证码给调用程序
        return code;
   }
}
