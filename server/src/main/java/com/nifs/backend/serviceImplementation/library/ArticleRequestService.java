package com.nifs.backend.serviceImplementation.library;

import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.repository.library.ArticleRequestRepository;
import com.nifs.backend.service.library.IArticleRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class ArticleRequestService implements IArticleRequestService {

    final
    ArticleRequestRepository articleRequestRepository;

    public ArticleRequestService(ArticleRequestRepository articleRequestRepository) {
        this.articleRequestRepository = articleRequestRepository;
    }


    @Override
    public ResponseEntity<?> createNewArticleRequest(ArticleRequestDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(articleRequestRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            ArticleRequest articleRequest = ArticleRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .employee(data.getEmployee())
                    .designation(data.getDesignation())
                    .division(data.getDivision())
                    .headOfLibrary(data.getHeadOfLibrary())
                    .nameOfJournal(data.getNameOfJournal())
                    .year(data.getYear())
                    .remarks(data.getRemarks())
                    .date(data.getDate())
                    .volume(data.getVolume())
                    .issue(data.getIssue())
                    .pages(data.getPages())
                    .webLink(data.getWebLink())
                    .attachment(data.getAttachment())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            ArticleRequest created = articleRequestRepository.save(articleRequest);
            return ResponseEntity.ok(created);

        }

        return null;
    }
}
