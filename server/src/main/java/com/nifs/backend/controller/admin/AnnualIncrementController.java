package com.nifs.backend.controller.admin;

import com.nifs.backend.dto.admin.AnnualIncrementDTO;
import com.nifs.backend.serviceImplementation.admin.AnnualIncrementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/annual-increment")
public class AnnualIncrementController {

    final
    AnnualIncrementService annualIncrementService;

    public AnnualIncrementController(AnnualIncrementService annualIncrementService) {
        this.annualIncrementService = annualIncrementService;
    }

    @GetMapping
    public ResponseEntity<?> getAllAnnualIncrementRequests(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewAnnualIncrement(@RequestBody AnnualIncrementDTO data){
        return annualIncrementService.createNewAnnualIncrementRequest(data);
    }
}
