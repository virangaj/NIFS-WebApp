package com.nifs.backend.controller.transport;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.transport.TransportCostDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.serviceImplementation.transport.TransportCostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transport/transport-cost")
public class TransportCostController {

    final
    TransportCostService transportCostService;

    final
    JwtService jwtService;

    public TransportCostController(TransportCostService transportCostService, JwtService jwtService) {
        this.transportCostService = transportCostService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewTransportCostRequest(@RequestBody TransportCostDTO data){
        return ResponseEntity.ok(transportCostService.createNewTransportCost(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllTransportCostRequests(@RequestParam(required = false) String division){
        return ResponseEntity.ok(transportCostService.getAllTravelRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(transportCostService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(transportCostService.putDirectorApproval(approval, resId, user));
    }
}
