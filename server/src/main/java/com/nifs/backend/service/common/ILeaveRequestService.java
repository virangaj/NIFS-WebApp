package com.nifs.backend.service.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.common.LeaveRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ILeaveRequestService {

    ResponseEntity<?> createNewLeaveRequest(LeaveRequestDTO date);

    Object getAllLeaveRequests(String division);

    Object putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
