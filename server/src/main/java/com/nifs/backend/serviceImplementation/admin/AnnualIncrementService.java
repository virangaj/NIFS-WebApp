package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.dto.admin.AnnualIncrementDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.repository.admin.AnnualIncrementRepository;
import com.nifs.backend.service.admin.IAnnualIncrementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class AnnualIncrementService implements IAnnualIncrementService {

    final
    AnnualIncrementRepository annualIncrementRepository;

    public AnnualIncrementService(AnnualIncrementRepository annualIncrementRepository) {
        this.annualIncrementRepository = annualIncrementRepository;
    }

    @Override
    public ResponseEntity<?> createNewAnnualIncrementRequest(AnnualIncrementDTO data) {

        log.info("Data from the Client " + data.getDocumentNo());

        if(annualIncrementRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            AnnualIncrement annualIncrement = AnnualIncrement
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .remark(data.getRemark())
                    .date(data.getDate())
                    .noOfLeaves(data.getNoOfLeaves())
                    .salaryScale(data.getSalaryScale())
                    .presentSalary(data.getPresentSalary())
                    .newSalary(data.getNewSalary())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            AnnualIncrement created = annualIncrementRepository.save(annualIncrement);

            return ResponseEntity.ok(created);


        }

        return null;
    }
}
