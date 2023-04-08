package com.nifs.backend.serviceImplementation.library;

import com.nifs.backend.dto.library.JournalRequestDTO;
import com.nifs.backend.model.library.JournalRequest;
import com.nifs.backend.repository.library.JournalRequestRepository;
import com.nifs.backend.service.library.IJournalRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class JournalRequestService implements IJournalRequestService {


    final
    JournalRequestRepository journalRequestRepository;

    public JournalRequestService(JournalRequestRepository journalRequestRepository) {
        this.journalRequestRepository = journalRequestRepository;
    }

    @Override
    public ResponseEntity<?> createNewJournalRequest(JournalRequestDTO data) {

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

            JournalRequest created = journalRequestRepository.save(journalRequest);

            return ResponseEntity.ok(created);

        }

        return null;
    }
}
