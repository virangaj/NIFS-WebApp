package com.nifs.backend.controller.admin;


import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.service.admin.IResignationReqService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/resignation")
public class ResignationReqController {

    @Autowired
    private IResignationReqService resignationReqService;

    @Autowired
    JwtService jwtService;


    @PostMapping
    public ResponseEntity<?> createResignationRequest(@RequestBody ResignationRequestDTO data) throws MessagingException {

        return ResponseEntity.ok(resignationReqService.createResignationRequest(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllResignationRequests(@RequestParam(required = false) String division){

        return ResponseEntity.ok(resignationReqService.getAllResignationRequests(division));
    }




    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(resignationReqService.putHodApproval(approval, resId, user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(resignationReqService.putDirectorApproval(approval, resId, user));
    }
}
