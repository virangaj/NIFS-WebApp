package com.nifs.backend.repository.library;

import com.nifs.backend.model.library.ArticleRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ArticleRequestRepository extends JpaRepository<ArticleRequest,String> {

    @Query("select c from ArticleRequest c where c.documentNo = ?1")
    ArticleRequest findByDocumentNoEquals(String documentNo);

}
