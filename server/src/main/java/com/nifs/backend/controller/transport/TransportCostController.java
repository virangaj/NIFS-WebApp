package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.TransportCostDTO;
import com.nifs.backend.serviceImplementation.transport.TransportCostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/transport-cost")
public class TransportCostController {

    final
    TransportCostService transportCostService;

    public TransportCostController(TransportCostService transportCostService) {
        this.transportCostService = transportCostService;
    }


    @GetMapping
    public ResponseEntity<?> getAllTransportCost(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewTransportCost(@RequestBody TransportCostDTO data){
        return transportCostService.createNewTransportCost(data);
    }
}
