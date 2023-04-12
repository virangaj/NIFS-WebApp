package com.nifs.backend.service.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ContractExtensionDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IContractExService {
    ResponseEntity<?> createNewContractExtension(ContractExtensionDTO data);

    Object getAllContractExtension(String division);

    Object putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);
}
