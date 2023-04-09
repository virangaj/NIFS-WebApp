package com.nifs.backend.service.common;

import com.nifs.backend.dto.common.PaymentRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IPaymentRequestService {

    ResponseEntity<?> createNewPaymentRequest(PaymentRequestDTO data);
}
