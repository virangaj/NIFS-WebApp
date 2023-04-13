package com.nifs.backend.serviceImplementation.library;

import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.repository.library.ArticleRequestRepository;
import com.nifs.backend.service.library.IArticleRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            ArticleRequest created = articleRequestRepository.save(articleRequest);

            return ResponseEntity.ok(created);


        }

        return null;
    }

    @Override
    public List<ArticleRequestDTO> getAllArticleRequests() {

        List<ArticleRequest> ar = new ArrayList<>();

        ar = articleRequestRepository.findAll();

        List<ArticleRequestDTO> arDTO = new ArrayList<>();

        for (ArticleRequest a : ar){
            ArticleRequestDTO arDTOSsingle = new ArticleRequestDTO(a.getDocumentNo(),a.getEpfNo(),a.getDesignationId(),a.getDivisionId(),a.getHod(),a.getDate(),a.getNameOfJournal(),a.getPublishYear(),a.getVolume(),a.getIssue(),a.getPages(),a.getWebLink(), a.getRemark());
            arDTO.add(arDTOSsingle);
        }

        return arDTO;
    }
}
