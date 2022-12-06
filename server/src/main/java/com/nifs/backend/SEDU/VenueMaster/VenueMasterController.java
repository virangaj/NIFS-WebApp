package com.nifs.backend.SEDU.VenueMaster;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/sedu/venuemaster")
@RestController
@CrossOrigin
public class VenueMasterController {

    @Autowired
    private VenueMasterService venueService;


    @GetMapping()
    private List<VenueMaster> getAll(){
        return venueService.getAll();
    }
}
