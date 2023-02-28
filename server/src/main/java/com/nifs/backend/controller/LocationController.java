package com.nifs.backend.controller;

import com.nifs.backend.dto.LocationDTO;
import com.nifs.backend.service.ILocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin/locations")
@CrossOrigin
public class LocationController {

    @Autowired
    ILocationService locService;

//    get all locations
    @GetMapping
    private List<LocationDTO> returnAllLocations(){
        return locService.returnAllLocations();
    }

//    get new id
    @GetMapping("/newid")
    private String returnNewLocationId(){
        return locService.returnNewLocationId();
    }

    //get location by id
    @GetMapping("/{id}")
    private LocationDTO returnLocationById(@PathVariable String id){
        return locService.returnLocationById(id);
    }


    //    add locations
    @PostMapping
    private Boolean createLocation(@RequestBody LocationDTO venLocData){
        return locService.createLocation(venLocData);
    }


//    update location
    @PutMapping("/update/{locationid}")
    private Boolean updateLocationData(@PathVariable String locationid, @RequestBody LocationDTO locData){
        return locService.updateLocationData(locationid, locData);
    }


//delete location
    @DeleteMapping("/delete/{id}")
    private Boolean deleteLocation(@PathVariable String id){
        return locService.deleteLocation(id);
    }
}
