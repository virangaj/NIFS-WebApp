package com.nifs.backend.controller.admin;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.AccomodationDTO;
import com.nifs.backend.dto.admin.AnnualIncrementDTO;
import com.nifs.backend.serviceImplementation.admin.AnnualIncrementService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/annual-increment-request")
public class AnnualIncrementController {

    final
    AnnualIncrementService annualIncrementService;

    final
    JwtService jwtService;

    public AnnualIncrementController(AnnualIncrementService annualIncrementService, JwtService jwtService) {
        this.annualIncrementService = annualIncrementService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewAccomodationRequest(@RequestBody AnnualIncrementDTO data) throws MessagingException {
        return ResponseEntity.ok(annualIncrementService.createNewAnnualIncrement(data));
    }
    @GetMapping
    public ResponseEntity<?> getAllcreateNewAccomodationRequestRequest(@RequestParam(required = false) String division){
        return ResponseEntity.ok(annualIncrementService.getAllAnnualIncrementRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(annualIncrementService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(annualIncrementService.putDirectorApproval(approval, resId, user));
    }
}
