package com.nifs.backend.service.procument;

import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IQuotationSummaryService {

    ResponseEntity<?> createNewQuotationSummary(QuotationSummaryDTO data);
}
