package com.nifs.backend.serviceImplementation.library;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.dto.library.JournalRequestDTO;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.model.library.JournalRequest;
import com.nifs.backend.repository.library.JournalRequestRepository;
import com.nifs.backend.service.library.IJournalRequestService;
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
public class JournalRequestService implements IJournalRequestService {


    final
    JournalRequestRepository journalRequestRepository;

    final
    ModelMapper modelMapper;

    public JournalRequestService(JournalRequestRepository journalRequestRepository, ModelMapper modelMapper) {
        this.journalRequestRepository = journalRequestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public JournalRequestDTO createNewJournalRequest(JournalRequestDTO data) {

        log.info("Data from the Client " + data.getDocumentNo());

        if(journalRequestRepository.findByDocumentNoEquals(data.getDocumentNo())== null){

            JournalRequest journalRequest = JournalRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .project(data.getProject())
                    .vote(data.getVote())
                    .journalName(data.getJournalName())
                    .date(data.getDate())
                    .periodOfRequest(data.getPeriodOfRequest())
                    .totalAmountDue(data.getTotalAmountDue())
                    .currencyType(data.getCurrencyType())
                    .ISSN_No(data.getISSN_No())
                    .type(data.getType())
                    .methodOfPayment(data.getMethodOfPayment())
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            journalRequestRepository.save(journalRequest);

            return modelMapper.map(journalRequest,JournalRequestDTO.class);

        }

        return null;
    }

    @Override
    public List<JournalRequestDTO> getAllJournalRequests(String division) {
        try {
            List<JournalRequest> journalRequests = new ArrayList<>();

            if (division == null){
                journalRequests = journalRequestRepository.findAllByOrderByCreatedOnDesc();
            }else {
                journalRequests = journalRequestRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return journalRequests.stream()
                    .map(request -> modelMapper.map(request, JournalRequestDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("HOD Journal Request : requested");
            resId.forEach(id->{
                journalRequestRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
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
            log.info("Director Journal Request : requested");
            resId.forEach(id->{
                journalRequestRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }


}
