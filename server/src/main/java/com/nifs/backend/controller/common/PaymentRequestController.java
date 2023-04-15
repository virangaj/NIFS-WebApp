package com.nifs.backend.controller.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.dto.common.PaymentRequestDTO;
import com.nifs.backend.serviceImplementation.common.PaymentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/common/payment-request")
public class PaymentRequestController {

    final
    PaymentRequestService paymentRequestService;

    public PaymentRequestController(PaymentRequestService paymentRequestService) {
        this.paymentRequestService = paymentRequestService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewPaymentRequest(@RequestBody PaymentRequestDTO data) {
        return paymentRequestService.createNewPaymentRequest(data);
    }

    @GetMapping
    public ResponseEntity<?> getAllPaymentRequests(@RequestParam(required = false) String division){

        return ResponseEntity.ok(paymentRequestService.getAllPaymentRequests(division));
    }


    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(paymentRequestService.putHodApproval(approval, resId, user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(paymentRequestService.putDirectorApproval(approval, resId, user));
    }
}
