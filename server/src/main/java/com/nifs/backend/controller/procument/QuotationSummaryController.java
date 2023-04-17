package com.nifs.backend.controller.procument;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.QuotationRequestDTO;
import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import com.nifs.backend.serviceImplementation.procument.QuotationSummaryService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/procument/quotation-summary")
public class QuotationSummaryController {

    final
    QuotationSummaryService quotationSummaryService;

    final
    JwtService jwtService;

    public QuotationSummaryController(QuotationSummaryService quotationSummaryService, JwtService jwtService) {
        this.quotationSummaryService = quotationSummaryService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewQuotationSummary(@RequestBody QuotationSummaryDTO data) throws MessagingException {
        return ResponseEntity.ok(quotationSummaryService.createNewQuotationSummary(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllQuotationSummaries(@RequestParam(required = false) String division){
        return ResponseEntity.ok(quotationSummaryService.getAllQuotationSummaries(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(quotationSummaryService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(quotationSummaryService.putDirectorApproval(approval, resId, user));
    }

}
