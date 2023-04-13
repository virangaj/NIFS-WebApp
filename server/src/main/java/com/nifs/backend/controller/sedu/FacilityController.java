package com.nifs.backend.controller.sedu;

import com.nifs.backend.dto.sedu.FacilityDTO;
import com.nifs.backend.service.sedu.IFacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/sedu/facility")
public class FacilityController {

    @Autowired
    private IFacilityService facService;




    @GetMapping("/newid")
    String returnFacilityId() {
        return facService.returnNewFacilityId();
    }

//    get facility by id
@GetMapping("/{facilityId}")
FacilityDTO returnFacility(@PathVariable String facilityId) {
    return facService.returnFacility(facilityId);
}

    @GetMapping()
    List<FacilityDTO> getAll() {
        return facService.getAll();
    }

//    create new facility
    @PostMapping("/add")
    FacilityDTO createFacility(@RequestBody FacilityDTO facData, @AuthenticationPrincipal UserDetails userDetails) {
        String user = userDetails.getUsername();
       return facService.createFacility(facData, user);
    }

//    update facility
    @PutMapping("/update/{facilityId}")
    Boolean updateFacility(@PathVariable String facilityId, @RequestBody FacilityDTO facData, @AuthenticationPrincipal UserDetails userDetails) {
        String user = userDetails.getUsername();
        return facService.updateFacility(facilityId, facData, user);
    }
}
