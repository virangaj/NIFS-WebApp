package com.nifs.backend.service.transport;

import com.nifs.backend.dto.transport.VehicleRepairDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IVehicleRepairService {

    ResponseEntity<?> createNewVehicleRepair(VehicleRepairDTO data);
}
