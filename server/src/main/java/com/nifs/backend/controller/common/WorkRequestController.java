package com.nifs.backend.controller.common;

import com.nifs.backend.dto.common.WorkRequestDTO;
import com.nifs.backend.serviceImplementation.common.WorkRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/common/work-request")
public class WorkRequestController {

    final
    WorkRequestService workRequestService;

    public WorkRequestController(WorkRequestService workRequestService) {
        this.workRequestService = workRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllWorkRequests(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewWorkRequest(@RequestBody WorkRequestDTO data){
        return workRequestService.createNewWorkRequest(data);
    }
}
