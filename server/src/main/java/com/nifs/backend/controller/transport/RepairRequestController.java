package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.RepairRequestDTO;
import com.nifs.backend.serviceImplementation.transport.RepairRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/repair-request")
public class RepairRequestController {

    final
    RepairRequestService repairRequestService;

    public RepairRequestController(RepairRequestService repairRequestService) {
        this.repairRequestService = repairRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllRepairRequest(){
        return ResponseEntity.ok("success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewRepairRequest(@RequestBody RepairRequestDTO data){
        return repairRequestService.createNewRepairRequest(data);
    }
}
