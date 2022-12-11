package com.nifs.backend.SEDU.VenueMaster;

import com.nifs.backend.SEDU.Charges.Charges;
import com.nifs.backend.SEDU.Facility.Facility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/sedu/venuemaster")
@RestController
@CrossOrigin
public class VenueMasterController {

    @Autowired
    private VenueMasterService venueService;

    @GetMapping("/newid")
    private String returnNewVenueId() {
        return venueService.returnNewVenueId();
    }

//    get venue by id
    @GetMapping("/{venueId}")
    Optional<VenueMaster> returnVenue(@PathVariable String venueId){
        return venueService.returnVenue(venueId);
    }
    @GetMapping()
    private List<VenueMaster> getAll() {
        return venueService.getAll();
    }

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
    @PutMapping("/{venue_id}/addcharge")
    private VenueMaster addCharge(@PathVariable String venue_id, @RequestBody Charges[] chargeData) {
        return venueService.addCharge(venue_id, chargeData);
    }



    @DeleteMapping("/delete/{venue_id}")
    private Boolean deleteVenue(@PathVariable String venue_id) {
        return venueService.deleteVenue(venue_id);
    }

    @PutMapping("/remove/facility/{venueId}")
    private VenueMaster removeFacility(@PathVariable String venueId, @RequestBody Facility facData){
        return venueService.removeFacility(venueId, facData);
    }


}
