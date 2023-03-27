package com.nifs.backend.controller.transport;

import com.nifs.backend.dto.transport.ReplacementRequestDTO;
import com.nifs.backend.service.transport.IReplacementRequestService;
import com.nifs.backend.serviceImplementation.transport.ReplacementRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transport/replacement-request")
public class ReplacementRequestController {

    final
    IReplacementRequestService replacementRequestService;

    public ReplacementRequestController(IReplacementRequestService replacementRequestService) {
        this.replacementRequestService = replacementRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllReplacementRequest(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewReplacementRequest(@RequestBody ReplacementRequestDTO data){
        return replacementRequestService.createNewReplacementRequest(data);
    }


}
