package com.nifs.backend.controller.sedu;

import com.nifs.backend.dto.sedu.ResponseVenueMasterDTO;
import com.nifs.backend.dto.sedu.VenueMasterDTO;
import com.nifs.backend.model.sedu.VenueMaster;
import com.nifs.backend.service.sedu.IVenueMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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



// get all venues
    @GetMapping
    private List<ResponseVenueMasterDTO> getAll() {
        return venueService.getAll();
    }

    //create new venue
    @PostMapping
    private boolean createVenue(@RequestBody VenueMasterDTO venueData, @AuthenticationPrincipal UserDetails userDetails) {
        String user = userDetails.getUsername();
        return venueService.createVenue(venueData, user);
    }


//    update venue
    @PutMapping("update/{venue_id}")
    private Boolean updateVenue(@PathVariable String venue_id, @RequestBody VenueMaster venueData) {
        return venueService.updateVenue(venue_id, venueData);
    }



//delete venue
    @DeleteMapping("/delete/{venue_id}")
    private Boolean deleteVenue(@PathVariable String venue_id) {
        return venueService.deleteVenue(venue_id);
    }






}
