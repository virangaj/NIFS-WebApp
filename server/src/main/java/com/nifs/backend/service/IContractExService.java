package com.nifs.backend.service;

import com.nifs.backend.dto.ContractExtensionDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IContractExService {
    ResponseEntity<?> createNewContractExtension(ContractExtensionDTO data);
}
