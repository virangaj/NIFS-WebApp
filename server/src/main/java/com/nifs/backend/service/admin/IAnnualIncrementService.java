package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.AnnualIncrementDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IAnnualIncrementService {

    ResponseEntity<?> createNewAnnualIncrementRequest(AnnualIncrementDTO data);
}
