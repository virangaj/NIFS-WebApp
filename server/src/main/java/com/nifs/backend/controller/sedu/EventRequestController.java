package com.nifs.backend.controller.sedu;

import com.nifs.backend.dto.sedu.EventRequestDTO;
import com.nifs.backend.service.sedu.IEventRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sedu/event-master")
@CrossOrigin
public class EventRequestController {


    @Autowired
    IEventRequestService eventRequestService;

    // crete new event
    @PostMapping("/add")
    boolean createNewEventRequest(@RequestBody EventRequestDTO eventData, @AuthenticationPrincipal UserDetails userDetails) {
        String user = userDetails.getUsername();
        return eventRequestService.createNewEventRequest(eventData, user);
    }
}
