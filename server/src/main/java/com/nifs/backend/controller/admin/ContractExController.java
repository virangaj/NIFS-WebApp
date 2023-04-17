package com.nifs.backend.controller.admin;


import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.service.admin.IContractExService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/contract-extension")
public class ContractExController {


    @Autowired
    private IContractExService contractExService;


    @PostMapping("/add")
    public ResponseEntity<?> createNewContractExtension(@RequestBody ContractExtensionDTO data) throws MessagingException {
        return contractExService.createNewContractExtension(data);
    }

    @GetMapping
    public ResponseEntity<?> getAllContractExtension(@RequestParam(required = false) String division){

        return ResponseEntity.ok(contractExService.getAllContractExtension(division));
    }


    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(contractExService.putHodApproval(approval, resId, user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(contractExService.putDirectorApproval(approval, resId, user));
    }

}
