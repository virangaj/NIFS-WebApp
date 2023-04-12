package com.nifs.backend.service.library;

import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.model.library.ArticleRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IArticleRequestService {

    ResponseEntity<?> createNewArticleRequest(ArticleRequestDTO data);
}
