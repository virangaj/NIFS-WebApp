package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.admin.ResignationRequest;
import com.nifs.backend.repository.admin.ContractExRepository;
import com.nifs.backend.service.admin.IContractExService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ContractExService implements IContractExService {
    @Autowired
    private ContractExRepository contractExRepository;
    @Autowired
    private ModelMapper modelMapper;
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
                   .hodApproved(data.getHodApproved())
                   .dirApproved(data.getDirApproved())
                   .build();

           ContractExtension created = contractExRepository.save(contractExtension);


           return ResponseEntity.ok(created);
        }

        return null;
    }

    @Override
    public Object getAllContractExtension(String division) {
        try{
            List<ContractExtension> contractExtensions = new ArrayList<ContractExtension>();

            if (division == null) {
                contractExtensions = contractExRepository.findAllByOrderByCreatedOnDesc();

            }
            else {
                contractExtensions = contractExRepository.findByDivisionIdOrderByCreatedOnDesc(division);

            }
            return contractExtensions.stream()
                    .map(contract -> modelMapper.map(contract, ResignationRequestDTO.class))
                    .collect(Collectors.toList());
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public Object putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("HOD Resignation Request : requested");
            resId.forEach(id -> {
                contractExRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Resignation Request : requested");
            resId.forEach(id -> {
                contractExRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
