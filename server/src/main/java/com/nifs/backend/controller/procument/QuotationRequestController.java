package com.nifs.backend.controller.procument;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.GatePassDTO;
import com.nifs.backend.dto.procument.QuotationRequestDTO;
import com.nifs.backend.serviceImplementation.procument.QuotationRequestService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/procument/quotation-request")
public class QuotationRequestController {


    final
    QuotationRequestService quotationRequestService;

    final
    JwtService jwtService;

    public QuotationRequestController(QuotationRequestService quotationRequestService, JwtService jwtService) {
        this.quotationRequestService = quotationRequestService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewQuotationRequest(@RequestBody QuotationRequestDTO data) throws MessagingException {
        return ResponseEntity.ok(quotationRequestService.createNewQuotationRequest(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllQuotationRequests(@RequestParam(required = false) String division){
        return ResponseEntity.ok(quotationRequestService.getAllQuotationRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(quotationRequestService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(quotationRequestService.putDirectorApproval(approval, resId, user));
    }
}
