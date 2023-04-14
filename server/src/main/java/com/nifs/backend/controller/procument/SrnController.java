package com.nifs.backend.controller.procument;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import com.nifs.backend.dto.procument.SrnDTO;
import com.nifs.backend.serviceImplementation.procument.SrnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/procument/srn")
public class SrnController {

    final
    SrnService srnService;

    final
    JwtService jwtService;

    public SrnController(SrnService srnService, JwtService jwtService) {
        this.srnService = srnService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewSrn(@RequestBody SrnDTO data){
        return ResponseEntity.ok(srnService.createNewSrn(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllSrns(@RequestParam(required = false) String division){
        return ResponseEntity.ok(srnService.getAllSrns(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(srnService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(srnService.putDirectorApproval(approval, resId, user));
    }


}
