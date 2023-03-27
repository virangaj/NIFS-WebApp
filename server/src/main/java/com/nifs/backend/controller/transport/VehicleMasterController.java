package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.VehicleMasterDTO;
import com.nifs.backend.service.transport.IVehicleMasterService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/vehicle-master")
public class VehicleMasterController {

    private final IVehicleMasterService vehicleMasterService;

    public VehicleMasterController(IVehicleMasterService vehicleMasterService) {
        this.vehicleMasterService = vehicleMasterService;
    }

    @GetMapping
    public ResponseEntity<?> getAllVehicle(){
        return ResponseEntity.ok("success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewVehicle(@RequestBody VehicleMasterDTO data){
        return vehicleMasterService.createNewVehicle(data);
    }
}
