package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.repository.admin.ContractExRepository;
import com.nifs.backend.service.admin.IContractExService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class ContractExService implements IContractExService {
    @Autowired
    private ContractExRepository contractExRepository;

    @Override
    public ResponseEntity<?> createNewContractExtension(ContractExtensionDTO data) {
        log.info("Data from the client" + data.getDocumentNo());

        if(contractExRepository.findByDocumentNoEquals(data.getDocumentNo()) == null){

           ContractExtension contractExtension = ContractExtension
                   .builder()
                   .documentNo(data.getDocumentNo())
                   .designationId(data.getDesignationId())
                   .hod(data.getHod())
                   .date(data.getDate())
                   .epfNo(data.getEpfNo())
                   .remark(data.getRemark())
                   .divisionId(data.getDivisionId())
                   .createdBy(data.getEpfNo())
                   .createdOn(new Date())
                   .build();

           ContractExtension created = contractExRepository.save(contractExtension);


           return ResponseEntity.ok(created);
        }

        return null;
    }
}
