package com.nifs.backend.controller.procument;


import com.nifs.backend.dto.procument.QuotationRequestDTO;
import com.nifs.backend.serviceImplementation.procument.QuotationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/procument/quotation-request")
public class QuotationRequestController {

    final
    QuotationRequestService quotationRequestService;

    public QuotationRequestController(QuotationRequestService quotationRequestService) {
        this.quotationRequestService = quotationRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllQuotationRequests(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createQuotationRequest(@RequestBody QuotationRequestDTO data){
        return quotationRequestService.createNewQuotationRequest(data);
    }
}
