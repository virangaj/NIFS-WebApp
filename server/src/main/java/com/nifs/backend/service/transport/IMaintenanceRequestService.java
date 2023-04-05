package com.nifs.backend.service.transport;

import com.nifs.backend.dto.transport.MaintenanceRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IMaintenanceRequestService {

    ResponseEntity<?> createNewMaintenanceRequest(MaintenanceRequestDTO data);
}
