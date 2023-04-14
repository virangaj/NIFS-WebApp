package com.nifs.backend.controller.library;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.JournalRequestDTO;
import com.nifs.backend.serviceImplementation.library.JournalRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library/journal-request")
public class JournalRequestController {

    final
    JournalRequestService journalRequestService;

    final
    JwtService jwtService;

    public JournalRequestController(JournalRequestService journalRequestService, JwtService jwtService) {
        this.journalRequestService = journalRequestService;
        this.jwtService = jwtService;
    }


    @PostMapping("/add")
    public ResponseEntity<?> createNewJournalRequest(@RequestBody JournalRequestDTO data){
        return ResponseEntity.ok(journalRequestService.createNewJournalRequest(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllJournalRequests(@RequestParam(required = false) String division){
        return ResponseEntity.ok(journalRequestService.getAllJournalRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(journalRequestService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(journalRequestService.putDirectorApproval(approval, resId, user));
    }
}
