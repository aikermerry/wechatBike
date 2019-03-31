package com.example.bike.controller;


import com.example.bike.Sendmesg.Sendmesg;
import com.example.bike.bikeservice.var.User;
import com.example.bike.bikeservice.var.saveUser;
import com.example.bike.services.Userservice;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Usercontroller {
    private final Sendmesg sendmesg;
    private final MongoTemplate mongoTemplate;
    private final Userservice services;

    @Autowired
    public Usercontroller(Userservice services, MongoTemplate mongoTemplate, Sendmesg sendmesg) {
        this.services = services;
        this.mongoTemplate = mongoTemplate;
        this.sendmesg = sendmesg;
    }

    @RequestMapping("/user/genCode")
    @ResponseBody
    public String genVerifyCode(User user){


        String b = services.sendMsgs(user);
        //返回验证码
        return b;

    }
    @RequestMapping("/user/save")
    @ResponseBody
    public boolean saveUser(@RequestBody saveUser saveUser){
        boolean flg = true;
        try {
            mongoTemplate.insert(saveUser,"userInfo");
        }catch (Exception e){
            e.printStackTrace();
            flg = false;
        }

        return flg;

    }
    @RequestMapping("/user/save/charge")
    @ResponseBody
    public boolean charge(@RequestBody saveUser saveUser){
        boolean flg=true;


        try {
            mongoTemplate.updateFirst(new Query(Criteria.where("phone").is(saveUser.getPhone())), new Update().set("despit", saveUser.getDespit()), "userInfo");
        }catch (Exception e)
        {
            System.out.println(e);
            flg = false;
        }
        String value = saveUser.getPhone();

        if (flg){//发送通知消息注册成功
            String SMS = "SMS_162521754";//SMS_162199750
            final Boolean sendmesg = this.sendmesg.sendmesg(value, saveUser.getPhone(), SMS);
        }

        return flg;

    }
    @RequestMapping("/user/save/charge/InfoSave")
    @ResponseBody
    public boolean saveIDmesg(@RequestBody saveUser saveUser){
        boolean flg = true;
        try {
            Update update = new Update();
            update.set("Username",saveUser.getName());
            update.set("Idcard",saveUser.getIdc_id());
            update.set("nickname",saveUser.getNickname());
            update.set("city",saveUser.getCity());
            update.set("nickname",saveUser.getNickname());

           UpdateResult result= mongoTemplate.updateFirst(new Query(Criteria.where("phone").is(saveUser.getPhone())),update , "userInfo");
            System.out.println(result.getModifiedCount());
             if (result.getModifiedCount()==1) {
                 System.out.println(result.getModifiedCount());
             }else {
                 flg = false;
             }
        }catch (Exception e)
        {
            System.out.println(e.toString());
            flg = false;
        }
        return flg;


    }




}
