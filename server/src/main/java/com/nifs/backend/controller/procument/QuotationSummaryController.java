package com.nifs.backend.controller.procument;

import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import com.nifs.backend.serviceImplementation.procument.QuotationSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/procument/quotation-summary")
public class QuotationSummaryController {

    final
    QuotationSummaryService quotationSummaryService;

    public QuotationSummaryController(QuotationSummaryService quotationSummaryService) {
        this.quotationSummaryService = quotationSummaryService;
    }

    @GetMapping
    public ResponseEntity<?> getAllQuotationSummary(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createQuotationSummary(@RequestBody QuotationSummaryDTO data){
        return quotationSummaryService.createNewQuotationSummary(data);
    }

}
