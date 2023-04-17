package com.nifs.backend.service.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.common.OvertimeDTO;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IOverTimeService {

    ResponseEntity<?> createNewOverTime(OvertimeDTO data) throws MessagingException;

    Object getAllOverTimeRequests(String division);

    Object putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
