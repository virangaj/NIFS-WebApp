package com.nifs.backend.controller.admin;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.InsuranceClaimDTO;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.serviceImplementation.admin.InsuranceClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/insurance-claim")
public class InsuranceClaimController {

    final
    InsuranceClaimService insuranceClaimService;

    final
    JwtService jwtService;

    public InsuranceClaimController(InsuranceClaimService insuranceClaimService, JwtService jwtService) {
        this.insuranceClaimService = insuranceClaimService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewInsuranceClaimRequest(@RequestBody InsuranceClaimDTO data){
        return ResponseEntity.ok(insuranceClaimService.createNewInsuranceClaimRequest(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllInsuranceClaimRequests(@RequestParam(required = false) String division){
        return ResponseEntity.ok(insuranceClaimService.getAllInsuranceClaimRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(insuranceClaimService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(insuranceClaimService.putDirectorApproval(approval, resId, user));
    }
}
