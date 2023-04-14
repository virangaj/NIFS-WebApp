package com.nifs.backend.controller.sedu;

import com.nifs.backend.dto.sedu.EventRequestDTO;
import com.nifs.backend.service.sedu.IEventRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("sedu/event-master")
@CrossOrigin
public class EventRequestController {


    @Autowired
    IEventRequestService eventRequestService;

    // crete new event
    @PostMapping("/add")
    ResponseEntity<?> createNewEventRequest(@RequestBody EventRequestDTO data, @AuthenticationPrincipal UserDetails userDetails) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try{
            String user = userDetails.getUsername();

            String message = eventRequestService.createNewEventRequest(data, user);
            map.put("status", 1);
            map.put("code", 200);
            map.put("message", message);

            return new ResponseEntity<>(map, HttpStatus.OK);
        }
         catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", 0);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
}
