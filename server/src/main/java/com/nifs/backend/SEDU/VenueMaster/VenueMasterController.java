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
    private String returnNewVenueId() {
        return venueService.returnNewVenueId();
    }

    //    put facilities
    @PutMapping("/{venue_id}/addfacility")
    private VenueMaster addFacility(@PathVariable String venue_id, @RequestBody Facility[] facData) {
        return venueService.addFacility(venue_id, facData);
    }

    //    put charges
    @PutMapping("/{venue_id}/addcharge")
    private VenueMaster addCharge(@PathVariable String venue_id, @RequestBody Charges[] chargeData) {
        return venueService.addCharge(venue_id, chargeData);
    }

    @PostMapping
    private Boolean createVenue(@RequestBody VenueMaster venueData) {
        return venueService.createVenue(venueData);
    }

    @DeleteMapping("/delete/{venue_id}")
    private Boolean deleteVenue(@PathVariable String venue_id) {
        return venueService.deleteVenue(venue_id);
    }

    @GetMapping()
    private List<VenueMaster> getAll() {
        return venueService.getAll();
    }
}
