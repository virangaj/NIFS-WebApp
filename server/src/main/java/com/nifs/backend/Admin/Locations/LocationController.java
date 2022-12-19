package com.nifs.backend.Admin.Locations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin/locations")
@CrossOrigin
public class LocationController {

    @Autowired
    LocationService venLocService;

//    get all locations
    @GetMapping
    private List<Locations> returnAllLocations(){
        return venLocService.returnAllLocations();
    }

//    get new id
    @GetMapping("/newid")
    private String returnNewLocationId(){
        return venLocService.returnNewLocationId();
    }

    //    add locations
    @PostMapping
    private Boolean createLocation(@RequestBody Locations venLocData){
        return venLocService.createLocation(venLocData);
    }


//    update location
    @PutMapping("/update/{locationid}")
    private Boolean updateLocationData(@PathVariable String locationid, @RequestBody Locations locData){
        return venLocService.updateLocationData(locationid, locData);
    }
}
