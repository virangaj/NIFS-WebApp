package com.nifs.backend.controller.common;

import com.nifs.backend.dto.common.PaymentRequestDTO;
import com.nifs.backend.serviceImplementation.common.PaymentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/common/payment-request")
public class PaymentRequestController {

    final
    PaymentRequestService paymentRequestService;

    public PaymentRequestController(PaymentRequestService paymentRequestService) {
        this.paymentRequestService = paymentRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllPaymentRequests(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewPaymentRequest(@RequestBody PaymentRequestDTO data){
        return paymentRequestService.createNewPaymentRequest(data);
    }
}
