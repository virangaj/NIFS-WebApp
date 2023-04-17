package com.nifs.backend.controller.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.dto.common.WorkRequestDTO;
import com.nifs.backend.service.common.IWorkRequestService;
import com.nifs.backend.serviceImplementation.common.WorkRequestService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/common/work-request")
public class WorkRequestController {

   private final IWorkRequestService workRequestService;

    public WorkRequestController(IWorkRequestService workRequestService) {
        this.workRequestService = workRequestService;
    }


    @PostMapping("/add")
    public ResponseEntity<?> createNewWorkRequest(@RequestBody WorkRequestDTO data) throws MessagingException {
        return workRequestService.createNewWorkRequest(data);
    }

    @GetMapping
    public ResponseEntity<?> getAllWorkRequests(@RequestParam(required = false) String division){

        return ResponseEntity.ok(workRequestService.getAllWorkRequests(division));
    }


    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(workRequestService.putHodApproval(approval, resId, user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam(required = true) RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(workRequestService.putDirectorApproval(approval, resId, user));
    }
}
