package com.nifs.backend.SEDU.Facility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/sedu/facility")
public class FacilityController {

    @Autowired
    private FacilityService facService;


    @PostMapping
    String createFacility(@RequestBody Facility facData) {
        return facService.createFacility(facData);
    }

    @GetMapping("/newid")
    String returnFacilityId() {
        return facService.returnNewFacilityId();
    }

//    get facility by id
    @GetMapping("/{facilityId}")
    Optional<Facility> returnFacility(@PathVariable String facilityId){
        return facService.returnFacility(facilityId);
    }
    @GetMapping
    List<Facility> getAll() {
        return facService.getAll();
    }
}
