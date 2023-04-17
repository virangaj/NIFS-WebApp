package com.nifs.backend.controller.transport;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.service.transport.ITravelRequestService;
import com.nifs.backend.serviceImplementation.transport.TravelRequestService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transport/travel-request")
public class TravelRequestController {

    final
    ITravelRequestService travelRequestService;

    final
    JwtService jwtService;

    public TravelRequestController(TravelRequestService travelRequestService, JwtService jwtService) {
        this.travelRequestService = travelRequestService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewTravelRequest(@RequestBody TravelRequestDTO data) throws MessagingException {
        return ResponseEntity.ok(travelRequestService.createNewTravelRequest(data));
    }
    @GetMapping
    public ResponseEntity<?> getAllTravelRequest(@RequestParam(required = false) String division){
        return ResponseEntity.ok(travelRequestService.getAllTravelRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(travelRequestService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(travelRequestService.putDirectorApproval(approval, resId, user));
    }



}
