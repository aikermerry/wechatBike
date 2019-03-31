package com.example.bike.bikeservice;

import com.example.bike.bikeservice.var.bike;

import java.util.List;

public interface bikerservice {
    void save(bike bike);

   public List<bike> getBikes(double longitude, double latitude);
}
