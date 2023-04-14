package com.nifs.backend.service.library;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.dto.library.JournalRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IJournalRequestService {

    JournalRequestDTO createNewJournalRequest(JournalRequestDTO data);

    List<JournalRequestDTO> getAllJournalRequests(String division);


    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
