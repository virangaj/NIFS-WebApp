package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.dto.procument.GatePassDTO;
import com.nifs.backend.model.procument.GatePass;
import com.nifs.backend.repository.procument.GatePassRepository;
import com.nifs.backend.service.procument.IGatePassService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class GatePassService implements IGatePassService {

    final
    GatePassRepository gatePassRepository;

    public GatePassService(GatePassRepository gatePassRepository) {
        this.gatePassRepository = gatePassRepository;
    }

    @Override
    public ResponseEntity<?> createNewGatePass(GatePassDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(gatePassRepository.findByDocumentNoEquals(data.getDocumentNo())==null){


            GatePass gatePass = GatePass
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .locationAfterRemoval(data.getLocationAfterRemoval())
                    .purposeOfRemoval(data.getPurposeOfRemoval())
                    .dateOfRemoval(data.getDateOfRemoval())
                    .expectedReturnDate(data.getExpectedReturnDate())
                    .remark(data.getRemark())
                    .itemName(data.getItemName())
                    .itemType(data.getItemType())
                    .quantity(data.getQuantity())
                    .inventoryNumber(data.getInventoryNumber())
                    .description(data.getDescription())
                    .currentLocation(data.getCurrentLocation())
                    .officerInChargeName(data.getOfficerInChargeName())
                    .nameOfOfficerOutsideIncharge(data.getNameOfOfficerOutsideIncharge())
                    .resultOfVerificationBySecurityOfficer(data.getResultOfVerificationBySecurityOfficer())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            GatePass created = gatePassRepository.save(gatePass);

            return ResponseEntity.ok(created);

        }

        return null;
    }


}
