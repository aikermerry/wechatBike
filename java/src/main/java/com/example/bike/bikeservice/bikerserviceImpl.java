package com.example.bike.bikeservice;

import com.example.bike.bikeservice.var.bike;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class bikerserviceImpl implements bikerservice {
    private final MongoTemplate mongoTemplate;

    @Autowired
    public bikerserviceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void save(bike bike) {

        System.out.println( bike.getClass());
        mongoTemplate.insert(bike,"bikes");
    }

    @Override
    public List<bike> getBikes(double longitude, double latitude) {

        return   mongoTemplate.findAll(bike.class);

    }
}
