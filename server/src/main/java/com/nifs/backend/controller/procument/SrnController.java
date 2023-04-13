package com.nifs.backend.controller.procument;

import com.nifs.backend.dto.procument.SrnDTO;
import com.nifs.backend.serviceImplementation.procument.SrnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/procument/srn")
public class SrnController {

    final
    SrnService srnService;

    public SrnController(SrnService srnService) {
        this.srnService = srnService;
    }

    @GetMapping
    public ResponseEntity<?> getAllSrn(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createSrn(@RequestBody SrnDTO data){
        return srnService.createNewSrn(data);
    }
}
