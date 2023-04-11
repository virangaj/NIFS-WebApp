package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.InsuranceClaimDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IInsuranceClaimService {

    ResponseEntity<?> createNewInsuranceClaimRequest(InsuranceClaimDTO data);

}
