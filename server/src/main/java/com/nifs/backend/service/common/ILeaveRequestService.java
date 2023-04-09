package com.nifs.backend.service.common;

import com.nifs.backend.dto.common.LeaveRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface ILeaveRequestService {

    ResponseEntity<?> createNewLeaveRequest(LeaveRequestDTO date);
}
