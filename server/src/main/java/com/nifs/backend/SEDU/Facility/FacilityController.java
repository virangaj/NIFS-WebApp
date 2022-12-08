package com.nifs.backend.SEDU.Facility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    List<Facility> getAll() {
        return facService.getAll();
    }
}
