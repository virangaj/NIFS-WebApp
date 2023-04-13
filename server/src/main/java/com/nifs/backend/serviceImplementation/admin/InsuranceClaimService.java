package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.dto.admin.InsuranceClaimDTO;
import com.nifs.backend.model.admin.InsuranceClaim;
import com.nifs.backend.repository.admin.InsuranceClaimRepository;
import com.nifs.backend.service.admin.IInsuranceClaimService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class InsuranceClaimService implements IInsuranceClaimService {

    final
    InsuranceClaimRepository insuranceClaimRepository;

    public InsuranceClaimService(InsuranceClaimRepository insuranceClaimRepository) {
        this.insuranceClaimRepository = insuranceClaimRepository;
    }

    @Override
    public ResponseEntity<?> createNewInsuranceClaimRequest(InsuranceClaimDTO data) {


        log.info("Data from the Client " + data.getDocumentNo());

        if(insuranceClaimRepository.findByDocumentNoEquals(data.getDocumentNo())==null){
            InsuranceClaim insuranceClaim = InsuranceClaim
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .remark(data.getRemark())
                    .claimPaidDate(data.getClaimPaidDate())
                    .spectacleClaimDate(data.getSpectacleClaimDate())
                    .noOfClaims(data.getNoOfClaims())
                    .claimAmount(data.getClaimAmount())
                    .totalBillAmount(data.getTotalBillAmount())
                    .paidClaimAmount(data.getPaidClaimAmount())
                    .notPaidClaimAmount(data.getNotPaidClaimAmount())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            InsuranceClaim created = insuranceClaimRepository.save(insuranceClaim);

            return ResponseEntity.ok(created);
        }

        return null;
    }
}
