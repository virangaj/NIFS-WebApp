package com.nifs.backend.service.procument;

import com.nifs.backend.dto.procument.GatePassDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IGatePassService {

    ResponseEntity<?> createNewGatePass(GatePassDTO data);
}
