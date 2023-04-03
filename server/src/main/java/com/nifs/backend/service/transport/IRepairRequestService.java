package com.nifs.backend.service.transport;

import com.nifs.backend.dto.transport.RepairRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IRepairRequestService {

    ResponseEntity<?> createNewRepairRequest(RepairRequestDTO data);

}
