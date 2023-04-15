package com.nifs.backend.controller.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.dto.common.OvertimeDTO;
import com.nifs.backend.serviceImplementation.common.OverTimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/common/overtime")
public class OverTimeController {


    final
    OverTimeService overTimeService;

    public OverTimeController(OverTimeService overTimeService) {
        this.overTimeService = overTimeService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewOverTime(@RequestBody OvertimeDTO data) {
        return overTimeService.createNewOverTime(data);
    }

    @GetMapping
    public ResponseEntity<?> getAllOverTimeRequests(@RequestParam(required = false) String division){

        return ResponseEntity.ok(overTimeService.getAllOverTimeRequests(division));
    }


    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(overTimeService.putHodApproval(approval, resId, user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(overTimeService.putDirectorApproval(approval, resId, user));
    }
}
