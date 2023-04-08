package com.nifs.backend.service.transport;

import com.nifs.backend.dto.transport.ReplacementRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IReplacementRequestService {

    ResponseEntity<?> createNewReplacementRequest(ReplacementRequestDTO data);
}
