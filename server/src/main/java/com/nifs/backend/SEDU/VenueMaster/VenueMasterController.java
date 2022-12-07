package com.nifs.backend.SEDU.VenueMaster;

import com.nifs.backend.SEDU.Charges.Charges;
import com.nifs.backend.SEDU.Facility.Facility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/sedu/venuemaster")
@RestController
@CrossOrigin
public class VenueMasterController {

    @Autowired
    private VenueMasterService venueService;

    @GetMapping("/newid")
    private String returnVenueId(){
        return venueService.returnVenueId();
    }

//    put facilities
    @PutMapping("/{venue_id}/addfacility")
    private VenueMaster addFacility(
            @PathVariable String venue_id,
            @RequestBody Facility[] facData)
            {
        return venueService.addFacility(venue_id, facData);
    }

//    put charges
    @PutMapping("/{venue_id}/addcharge")
    private VenueMaster addCharge(
            @PathVariable String venue_id,
            @RequestBody Charges[] chargeData
            ){
        return venueService.addCharge(venue_id, chargeData);
    }
    @PostMapping
    private Boolean createVenue(@RequestBody VenueMaster venueData){
        return venueService.createVenue(venueData);
    }

    @GetMapping()
    private List<VenueMaster> getAll(){
        return venueService.getAll();
    }
}
