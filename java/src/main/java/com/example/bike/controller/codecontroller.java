package com.example.bike.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class codecontroller {
    private final StringRedisTemplate stringRedisTemplate;

    @Autowired
    public codecontroller(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    @RequestMapping("/user/check")
    @ResponseBody
    public String checkcode(String phone){
        System.out.println(phone);
        String VAR =stringRedisTemplate.opsForValue().get(phone);
        System.out.println("获取到的："+VAR);
        //返回验证码校验充regit中取得的值

        return VAR;


    }
}
