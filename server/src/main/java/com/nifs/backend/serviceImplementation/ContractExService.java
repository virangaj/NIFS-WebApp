package com.nifs.backend.serviceImplementation;

import com.nifs.backend.dto.ContractExtensionDTO;
import com.nifs.backend.service.IContractExService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ContractExService implements IContractExService {
    @Override
    public ResponseEntity<?> createNewContractExtension(ContractExtensionDTO data) {
        return null;
    }
}
