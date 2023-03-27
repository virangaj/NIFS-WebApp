package com.nifs.backend.service.transport;

import com.nifs.backend.dto.transport.VehicleMasterDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IVehicleMasterService {

    ResponseEntity<?> createNewVehicle(VehicleMasterDTO data);
}
