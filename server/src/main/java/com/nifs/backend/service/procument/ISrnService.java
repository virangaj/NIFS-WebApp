package com.nifs.backend.service.procument;

import com.nifs.backend.dto.procument.SrnDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface ISrnService {

    ResponseEntity<?> createNewSrn(SrnDTO data);
}
