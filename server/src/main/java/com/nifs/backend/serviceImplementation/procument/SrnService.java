package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.dto.procument.SrnDTO;
import com.nifs.backend.model.procument.Srn;
import com.nifs.backend.repository.procument.SrnRepository;
import com.nifs.backend.service.procument.ISrnService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class SrnService implements ISrnService {


    final
    SrnRepository srnRepository;

    public SrnService(SrnRepository srnRepository) {
        this.srnRepository = srnRepository;
    }

    @Override
    public ResponseEntity<?> createNewSrn(SrnDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(srnRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            Srn srn = Srn
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .project(data.getProject())
                    .srnType(data.getSrnType())
                    .itemType(data.getItemType())
                    .purchaseType(data.getPurchaseType())
                    .estimatedValue(data.getEstimatedValue())
                    .vote(data.getVote())
                    .fundAllocationForTheProject(data.getFundAllocationForTheProject())
                    .description(data.getDescription())
                    .googleLink(data.getGoogleLink())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            Srn created = srnRepository.save(srn);

            return ResponseEntity.ok(created);

        }
        return null;
    }
}
