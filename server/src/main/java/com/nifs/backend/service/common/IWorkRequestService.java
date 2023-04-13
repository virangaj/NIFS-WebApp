package com.nifs.backend.service.common;

import com.nifs.backend.dto.common.WorkRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IWorkRequestService {

    ResponseEntity<?> createNewWorkRequest(WorkRequestDTO data);
}
