package com.nifs.backend.serviceImplementation.library;

import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.repository.library.ArticleRequestRepository;
import com.nifs.backend.service.library.IArticleRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

        log.info("Data from the Client " + data.getDocumentNo());

        if (articleRequestRepository.findByDocumentNoEquals(data.getDocumentNo())== null){

            ArticleRequest articleRequest = ArticleRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .nameOfJournal(data.getNameOfJournal())
                    .publishYear(data.getPublishYear())
                    .volume(data.getVolume())
                    .issue(data.getIssue())
                    .pages(data.getPages())
                    .webLink(data.getWebLink())
                    .ISSN_No(data.getISSN_No())
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            ArticleRequest created = articleRequestRepository.save(articleRequest);

            return ResponseEntity.ok(created);


        }

        return null;
    }
}
