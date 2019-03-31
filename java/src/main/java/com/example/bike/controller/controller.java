package com.example.bike.controller;

import com.example.bike.bikeservice.bikerservice;
import com.example.bike.bikeservice.var.bike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Metrics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
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
    private final MongoTemplate mongoTemplate;
    private final bikerservice bikerservice;

    @Autowired
    public controller(bikerservice bikerservice, MongoTemplate mongoTemplate) {
        this.bikerservice = bikerservice;
        this.mongoTemplate = mongoTemplate;
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
    public List<GeoResult<bike>> getBikes(double longitude,double latitude){

       // return  bikerservice.getBikes(bike.getLongitude(),bike.getLatitude());

        NearQuery nearQuery = NearQuery.near(longitude,latitude);
        nearQuery.maxDistance(0.2, Metrics.KILOMETERS);
        GeoResults<bike> result = mongoTemplate.geoNear(nearQuery.query(new Query(Criteria.where("status").is(1)).limit(20)),bike.class);
        return result.getContent();

    }

}
