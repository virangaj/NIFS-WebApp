package com.nifs.backend.controller.library;

import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.serviceImplementation.library.ArticleRequestService;
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
    public ResponseEntity<?> getAllArticleRequests(){
        return ResponseEntity.ok("success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewArticleRequest(@RequestBody ArticleRequestDTO data){
        return articleRequestService.createNewArticleRequest(data);
    }


}
