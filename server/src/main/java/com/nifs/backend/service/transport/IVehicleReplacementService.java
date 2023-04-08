package com.nifs.backend.service.transport;

import com.nifs.backend.dto.transport.VehicleReplacementDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IVehicleReplacementService {

    ResponseEntity<?> createNewVehicleReplacement(VehicleReplacementDTO data);
}
