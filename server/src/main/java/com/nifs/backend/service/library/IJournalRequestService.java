package com.nifs.backend.service.library;

import com.nifs.backend.dto.library.JournalRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IJournalRequestService {

    ResponseEntity<?> createNewJournalRequest(JournalRequestDTO data);

}
