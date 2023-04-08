package com.nifs.backend.service.procument;

import com.nifs.backend.dto.procument.QuotationRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IQuotationRequestService {

    ResponseEntity<?> createNewQuotationRequest(QuotationRequestDTO data);
}
