package com.nifs.backend.controller.common;

import com.nifs.backend.dto.common.LeaveRequestDTO;
import com.nifs.backend.serviceImplementation.common.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/common/leave-request")
public class LeaveRequestController {

    final
    LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllLeaveRequests(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewLeaveRequest(@RequestBody LeaveRequestDTO  data){
        return leaveRequestService.createNewLeaveRequest(data);
    }
}
