package com.nifs.backend.controller.procument;

import com.nifs.backend.dto.procument.GatePassDTO;
import com.nifs.backend.serviceImplementation.procument.GatePassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/procument/gate-pass")
public class GatePassController {

    final
    GatePassService gatePassService;

    public GatePassController(GatePassService gatePassService) {
        this.gatePassService = gatePassService;
    }

    @GetMapping
    public ResponseEntity<?> getAllGatePass(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createGatePass(@RequestBody GatePassDTO data){
        return gatePassService.createNewGatePass(data);
    }
}
