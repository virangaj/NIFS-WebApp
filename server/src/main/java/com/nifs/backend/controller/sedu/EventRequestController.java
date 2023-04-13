package com.nifs.backend.controller.sedu;

import com.nifs.backend.dto.sedu.FacilityDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sedu/event-master")
@CrossOrigin
public class EventRequestController {


    // crete new event
    @PostMapping("/add")
    boolean createFacility(@RequestBody FacilityDTO facData, @AuthenticationPrincipal UserDetails userDetails) {
        String user = userDetails.getUsername();
        return true;
    }
}
