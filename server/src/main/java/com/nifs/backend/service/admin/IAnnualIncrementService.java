package com.nifs.backend.service.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.AnnualIncrementDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IAnnualIncrementService {

    AnnualIncrementDTO createNewAnnualIncrement(AnnualIncrementDTO data) throws MessagingException;

    List<AnnualIncrementDTO> getAllAnnualIncrementRequests(String division);

    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);


}
