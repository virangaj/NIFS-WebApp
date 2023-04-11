package com.nifs.backend.controller.admin;

import com.nifs.backend.dto.admin.InsuranceClaimDTO;
import com.nifs.backend.serviceImplementation.admin.InsuranceClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/insurance-claim")
public class InsuranceClaimController {

    final
    InsuranceClaimService insuranceClaimService;

    public InsuranceClaimController(InsuranceClaimService insuranceClaimService) {
        this.insuranceClaimService = insuranceClaimService;
    }

    @GetMapping
    public ResponseEntity<?> getAllInsuranceRequests(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewInsuranceClaimRequest(@RequestBody InsuranceClaimDTO data){
        return insuranceClaimService.createNewInsuranceClaimRequest(data);
    }
}
