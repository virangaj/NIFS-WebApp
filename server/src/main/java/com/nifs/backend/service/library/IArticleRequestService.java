package com.nifs.backend.service.library;

import com.nifs.backend.dto.library.ArticleRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IArticleRequestService {

    ResponseEntity<?> createNewArticleRequest(ArticleRequestDTO data);

}
