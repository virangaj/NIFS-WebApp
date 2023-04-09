package com.nifs.backend.controller.common;

import com.nifs.backend.dto.common.OvertimeDTO;
import com.nifs.backend.serviceImplementation.common.OverTimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/common/overtime")
public class OverTimeController {


    final
    OverTimeService overTimeService;

    public OverTimeController(OverTimeService overTimeService) {
        this.overTimeService = overTimeService;
    }

    @GetMapping
    public ResponseEntity<?> getAllOvertimeRequests(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewOvertimeRequest(@RequestBody OvertimeDTO data){
        return overTimeService.createNewOverTime(data);
    }
}
