package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.ContractExtensionDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IContractExService {
    ResponseEntity<?> createNewContractExtension(ContractExtensionDTO data);
}
