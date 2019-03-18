package com.example.bike;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.xml.ws.RequestWrapper;
//标记这个类用于接收请求和响应用户的一个控制器
//加上@controller 后，Spring容器就会对他实例化
//@author aikermerry


@Controller
public class controller {
    //加上映射的地址
    @RequestMapping("/hello")
    //使返回以Jsion形式返回，就不需要刷新页面就可以更新
    @ResponseBody
    public String hello(@RequestBody bike bike)
    {
        return "hello ：";

    }
}
