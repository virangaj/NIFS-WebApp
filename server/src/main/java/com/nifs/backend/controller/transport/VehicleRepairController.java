package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.VehicleRepairDTO;
import com.nifs.backend.service.transport.IVehicleRepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/vehicle-repair")
public class VehicleRepairController {

    final
    IVehicleRepairService vehicleRepairService;

    public VehicleRepairController(IVehicleRepairService vehicleRepairService) {
        this.vehicleRepairService = vehicleRepairService;
    }

    @GetMapping
    public ResponseEntity<?> getAllVehicleRepair(){
        return ResponseEntity.ok("success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewVehicleRepair(@RequestBody VehicleRepairDTO data){
        return vehicleRepairService.createNewVehicleRepair(data);
    }
}
