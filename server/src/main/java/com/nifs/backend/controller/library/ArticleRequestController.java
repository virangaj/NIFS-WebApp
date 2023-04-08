package com.nifs.backend.controller.library;

import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.serviceImplementation.library.ArticleRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/library/article-request")
public class ArticleRequestController {


    final
    ArticleRequestService articleRequestService;

    public ArticleRequestController(ArticleRequestService articleRequestService) {
        this.articleRequestService = articleRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllArticleRequest(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewArticleRequest(@RequestBody ArticleRequestDTO data){
        return articleRequestService.createNewArticleRequest(data);
    }
}
