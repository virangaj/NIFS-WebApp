package com.nifs.backend.service.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.AccomodationDTO;
import com.nifs.backend.dto.admin.InsuranceClaimDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IInsuranceClaimService {

    InsuranceClaimDTO createNewInsuranceClaimRequest(InsuranceClaimDTO data);

    List<InsuranceClaimDTO> getAllInsuranceClaimRequests(String division);

    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);


}
