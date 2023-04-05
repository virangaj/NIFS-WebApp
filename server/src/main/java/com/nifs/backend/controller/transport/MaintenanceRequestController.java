package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.MaintenanceRequestDTO;
import com.nifs.backend.serviceImplementation.transport.MaintenanceRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/maintenance-request")
public class MaintenanceRequestController {

    final
    MaintenanceRequestService maintenanceRequestService;

    public MaintenanceRequestController(MaintenanceRequestService maintenanceRequestService) {
        this.maintenanceRequestService = maintenanceRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllMaintenanceRequest(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewMaintenanceRequest(@RequestBody MaintenanceRequestDTO data){
        return maintenanceRequestService.createNewMaintenanceRequest(data);
    }

}
