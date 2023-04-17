package com.nifs.backend.service.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.dto.procument.GatePassDTO;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IGatePassService {

    GatePassDTO createNewArticleRequest(GatePassDTO data) throws MessagingException;

    List<GatePassDTO> getAllArticleRequests(String division);


    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
