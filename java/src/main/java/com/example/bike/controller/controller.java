package com.example.bike.controller;

import com.example.bike.bikeservice.bikerservice;
import com.example.bike.bikeservice.var.bike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
//标记这个类用于接收请求和响应用户的一个控制器
//加上@controller 后，Spring容器就会对他实例化
//@author aikermerry


@Controller
public class controller {
    private final bikerservice bikerservice;

    @Autowired
    public controller(bikerservice bikerservice) {
        this.bikerservice = bikerservice;
    }

    //加上映射的地址
    @RequestMapping("/bikes")
    //使返回以Jsion形式返回，就不需要刷新页面就可以更新
    @ResponseBody
    public String bikes(@RequestBody bike bike)
    {
        bikerservice.save(bike);


        return "ok";

    }
    @RequestMapping("/bikes/getBikes")
    @ResponseBody
    public List<bike> getBikes(bike bike){

        return  bikerservice.getBikes(bike.getLongitude(),bike.getLatitude());

    }

}
