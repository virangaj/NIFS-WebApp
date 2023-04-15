package com.nifs.backend.controller.admin;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.AccomodationDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.serviceImplementation.transport.AccomodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/accomodation")
public class AccomodationController {

    final
    AccomodationService accomodationService;

    final
    JwtService jwtService;

    public AccomodationController(AccomodationService accomodationService, JwtService jwtService) {
        this.accomodationService = accomodationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewAccomodationRequest(@RequestBody AccomodationDTO data){
        return ResponseEntity.ok(accomodationService.createNewAccomodationRequest(data));
    }
    @GetMapping
    public ResponseEntity<?> getAllcreateNewAccomodationRequestRequest(@RequestParam(required = false) String division){
        return ResponseEntity.ok(accomodationService.getAllAccomodationRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(accomodationService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(accomodationService.putDirectorApproval(approval, resId, user));
    }
}
