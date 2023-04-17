package com.nifs.backend.service.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.common.WorkRequestDTO;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IWorkRequestService {

    ResponseEntity<?> createNewWorkRequest(WorkRequestDTO data) throws MessagingException;

    Object getAllWorkRequests(String division);

    Object putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
