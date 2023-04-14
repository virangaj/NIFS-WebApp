package com.nifs.backend.service.library;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.model.library.ArticleRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IArticleRequestService {

    ArticleRequestDTO createNewArticleRequest(ArticleRequestDTO data);

    List<ArticleRequestDTO> getAllArticleRequests(String division);


    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);



}
