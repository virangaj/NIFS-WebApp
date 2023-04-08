package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.serviceImplementation.transport.TravelRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/travel-request")
public class TravelRequestController {

    final
    TravelRequestService travelRequestService;

    public TravelRequestController(TravelRequestService travelRequestService) {
        this.travelRequestService = travelRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTravelRequest(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewTravelRequest(@RequestBody TravelRequestDTO data){
        return travelRequestService.createNewTravelRequest(data);
    }
}
