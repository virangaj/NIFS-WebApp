package com.nifs.backend.Admin.Locations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin/locations")
@CrossOrigin
public class LocationController {

    @Autowired
    LocationService locService;

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

    //    add locations
    @PostMapping
    private Boolean createLocation(@RequestBody Locations venLocData){
        return locService.createLocation(venLocData);
    }


//    update location
    @PutMapping("/update/{locationid}")
    private Boolean updateLocationData(@PathVariable String locationid, @RequestBody Locations locData){
        return locService.updateLocationData(locationid, locData);
    }


//delete location
    @DeleteMapping("/delete/{id}")
    private Boolean deleteLocation(@PathVariable String id){
        return locService.deleteLocation(id);
    }
}
