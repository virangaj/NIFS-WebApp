package com.nifs.backend.controller.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.dto.common.LeaveRequestDTO;
import com.nifs.backend.serviceImplementation.common.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/common/leave-request")
public class LeaveRequestController {

    final
    LeaveRequestService leaveRequestService;

    public LeaveRequestController(LeaveRequestService leaveRequestService) {
        this.leaveRequestService = leaveRequestService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewLeaveRequest(@RequestBody LeaveRequestDTO data) {
        return leaveRequestService.createNewLeaveRequest(data);
    }
    @GetMapping
    public ResponseEntity<?> getAllLeaveRequests(@RequestParam(required = false) String division){

        return ResponseEntity.ok(leaveRequestService.getAllLeaveRequests(division));
    }


    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(leaveRequestService.putHodApproval(approval, resId, user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(leaveRequestService.putDirectorApproval(approval, resId, user));
    }
}
