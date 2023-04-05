package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.RepairRequestDTO;
import com.nifs.backend.model.transport.RepairRequest;
import com.nifs.backend.repository.transport.RepairRequestRepository;
import com.nifs.backend.service.transport.IRepairRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class RepairRequestService implements IRepairRequestService {

    final
    RepairRequestRepository repairRequestRepository;


    public RepairRequestService(RepairRequestRepository repairRequestRepository) {
        this.repairRequestRepository = repairRequestRepository;
    }

    @Override
    public ResponseEntity<?> createNewRepairRequest(RepairRequestDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(repairRequestRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            RepairRequest repairRequest = RepairRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .employeeNo(data.getEmployeeNo())
                    .designation(data.getDesignation())
                    .division(data.getDivision())
                    .remarks(data.getRemarks())
                    .date(data.getDate())
                    .vehicleNo(data.getVehicleNo())
                    .attachment(data.getAttachment())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            RepairRequest created = repairRequestRepository.save(repairRequest);
            return ResponseEntity.ok(created);

        }

        return null;
    }
}
