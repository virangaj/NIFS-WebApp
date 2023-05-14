package com.nifs.backend.controller;

import com.nifs.backend.model.Charges;
import com.nifs.backend.model.Facility;
import com.nifs.backend.model.VenueCharge;
import com.nifs.backend.model.VenueMaster;
import com.nifs.backend.service.IVenueMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/sedu/venuemaster")
@RestController
@CrossOrigin
public class VenueMasterController {

    @Autowired
    private IVenueMasterService venueService;

    //get new venue id
    @GetMapping("/newid")
    private String returnNewVenueId() {
        return venueService.returnNewVenueId();
    }

//    get venue by id
    @GetMapping("/{venueId}")
    Optional<VenueMaster> returnVenue(@PathVariable String venueId){
        return venueService.returnVenue(venueId);
    }

    //return all charges
    @GetMapping("/allcharges")
    private List<VenueCharge> returnAllCharges(){
        return venueService.returnAllCharges();
    }

   //return all charges by id
    @GetMapping("/allcharges/{id}")
    private Optional<VenueCharge> returnAllChargesById(@PathVariable int id){
        return venueService.returnAllChargesById(id);
    }

// get all venues
    @GetMapping
    private List<VenueMaster> getAll() {
        return venueService.getAll();
    }

    //create new venue
    @PostMapping
    private Boolean createVenue(@RequestBody VenueMaster venueData) {
        return venueService.createVenue(venueData);
    }
    //    put facilities
    @PutMapping("/{venue_id}/addfacility")
    private VenueMaster addFacility(@PathVariable String venue_id, @RequestBody Facility[] facData) {
        return venueService.addFacility(venue_id, facData);
    }

//    update venue
    @PutMapping("update/{venue_id}")
    private Boolean updateVenue(@PathVariable String venue_id, @RequestBody VenueMaster venueData) {
        return venueService.updateVenue(venue_id, venueData);
    }

    //    put charges
    @PostMapping("/{venue_id}/addcharge")
    private Boolean addCharge(@PathVariable String venue_id, @RequestBody Charges[] chargeData) {
        return venueService.addCharge(venue_id, chargeData);
    }


//delete venue
    @DeleteMapping("/delete/{venue_id}")
    private Boolean deleteVenue(@PathVariable String venue_id) {
        return venueService.deleteVenue(venue_id);
    }

    //remove facility
    @PutMapping("/remove/facility/{venueId}")
    private VenueMaster removeFacility(@PathVariable String venueId, @RequestBody Facility facData){
        return venueService.removeFacility(venueId, facData);
    }




}
