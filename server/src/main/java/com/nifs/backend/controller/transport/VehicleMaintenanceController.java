package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.VehicleReplacementDTO;
import com.nifs.backend.service.transport.IVehicleReplacementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/vehicle-maintenance")
public class VehicleMaintenanceController {

    final
    IVehicleReplacementService vehicleReplacementService;


    public VehicleMaintenanceController(IVehicleReplacementService vehicleReplacementService) {
        this.vehicleReplacementService = vehicleReplacementService;
    }

    @GetMapping
    public ResponseEntity<?> getAllVehicleMaintenance(){
        return ResponseEntity.ok("success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewVehicleMaintenance(@RequestBody VehicleReplacementDTO data){
        return vehicleReplacementService.createNewVehicleReplacement(data);
    }


}
