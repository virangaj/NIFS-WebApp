package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.VehicleReplacementDTO;
import com.nifs.backend.service.transport.IVehicleReplacementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/vehicle-replacement")
public class VehicleReplacementController {

    final
    IVehicleReplacementService vehicleReplacementService;

    public VehicleReplacementController(IVehicleReplacementService vehicleReplacementService) {
        this.vehicleReplacementService = vehicleReplacementService;
    }

    @GetMapping
    public ResponseEntity<?> getAllVehicleReplacement(){
        return ResponseEntity.ok("success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewVehicleReplacement(@RequestBody VehicleReplacementDTO data){
        return vehicleReplacementService.createNewVehicleReplacement(data);
    }
}
