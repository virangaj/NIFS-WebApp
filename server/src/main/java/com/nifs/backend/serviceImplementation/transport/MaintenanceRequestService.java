package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.MaintenanceRequestDTO;
import com.nifs.backend.model.transport.MaintenanceRequest;
import com.nifs.backend.repository.transport.MaintenanceRequestRepository;
import com.nifs.backend.service.transport.IMaintenanceRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class MaintenanceRequestService implements IMaintenanceRequestService {

    final
    MaintenanceRequestRepository maintenanceRequestRepository;

    public MaintenanceRequestService(MaintenanceRequestRepository maintenanceRequestRepository) {
        this.maintenanceRequestRepository = maintenanceRequestRepository;
    }


    @Override
    public ResponseEntity<?> createNewMaintenanceRequest(MaintenanceRequestDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(maintenanceRequestRepository.findByDocumentNoEquals(data.getDocumentNo())== null){

            MaintenanceRequest maintenanceRequest = MaintenanceRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .date(data.getDate())
                    .vehicleNo(data.getVehicleNo())
                    .workshop(data.getWorkshop())
                    .cost(data.getCost())
                    .description(data.getDescription())
                    .attachment(data.getAttachment())
                    .startMeterReading(data.getStartMeterReading())
                    .endMeterReading(data.getEndMeterReading())
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            MaintenanceRequest created = maintenanceRequestRepository.save(maintenanceRequest);
            return ResponseEntity.ok(created);
        }
        return null;
    }
}
