package com.nifs.backend.SEDU.VenueLocation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sedu/venuelocation")
@CrossOrigin
public class VenueLocationController {

    @Autowired VenueLocationService venLocService;

//    get all locations
    @GetMapping
    private List<VenueLocation> returnAllLocations(){
        return venLocService.returnAllLocations();
    }

//    get new id
    @GetMapping("/newid")
    private String returnNewLocationId(){
        return venLocService.returnNewLocationId();
    }

    //    add locations
    @PostMapping
    private Boolean createLocation(@RequestBody VenueLocation venLocData){
        return venLocService.createLocation(venLocData);
    }


//    update location
    @PutMapping("/update/{locationid}")
    private Boolean updateLocationData(@PathVariable String locationid, @RequestBody VenueLocation venlocData){
        return venLocService.updateLocationData(locationid, venlocData);
    }
}
