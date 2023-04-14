package com.nifs.backend.serviceImplementation.library;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.model.transport.TravelRequest;
import com.nifs.backend.repository.library.ArticleRequestRepository;
import com.nifs.backend.service.library.IArticleRequestService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ArticleRequestService implements IArticleRequestService {


    final
    ArticleRequestRepository articleRequestRepository;

    final
    ModelMapper modelMapper;

    public ArticleRequestService(ArticleRequestRepository articleRequestRepository, ModelMapper modelMapper) {
        this.articleRequestRepository = articleRequestRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public ArticleRequestDTO createNewArticleRequest(ArticleRequestDTO data) {

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

            articleRequestRepository.save(articleRequest);

            return modelMapper.map(articleRequest,ArticleRequestDTO.class);


        }

        return null;
    }

    @Override
    public List<ArticleRequestDTO> getAllArticleRequests(String division) {
        try {
            List<ArticleRequest> articleRequests = new ArrayList<>();

            if (division == null){
                articleRequests = articleRequestRepository.findAllByOrderByCreatedOnDesc();
            }else {
                articleRequests = articleRequestRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return articleRequests.stream()
                    .map(request -> modelMapper.map(request, ArticleRequestDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("HOD Article Request : requested");
            resId.forEach(id->{
                articleRequestRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Article Request : requested");
            resId.forEach(id->{
                articleRequestRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }


}
