package com.example.bike;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Usercontroller {

    @RequestMapping("/user/genCode")
    @ResponseBody
    public String genVerifyCode(String iscode,String phone){
        System.out.println(iscode);
        return "sdddddddd";

    }

}
