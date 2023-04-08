package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.TransportCostDTO;
import com.nifs.backend.model.transport.TransportCost;
import com.nifs.backend.repository.transport.TransportCostRepository;
import com.nifs.backend.service.transport.ITransportCostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class TransportCostService implements ITransportCostService {


    final
    TransportCostRepository transportCostRepository;

    public TransportCostService(TransportCostRepository transportCostRepository) {
        this.transportCostRepository = transportCostRepository;
    }


    @Override
    public ResponseEntity<?> createNewTransportCost(TransportCostDTO data) {

        log.info("Data from the Client " + data.getDocumentNo());

        if(transportCostRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            TransportCost transportCost = TransportCost
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .hod(data.getHod())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .project(data.getProject())
                    .tourDate(data.getTourDate())
                    .sourceOfFunding(data.getSourceOfFunding())
                    .modeOfTravel(data.getModeOfTravel())
                    .vehicleType(data.getVehicleType())
                    .driverName(data.getDriverName())
                    .vehicleNo(data.getVehicleNo())
                    .estimatedKM(data.getEstimatedKM())
                    .ratePerKM(data.getRatePerKM())
                    .totalCost(data.getTotalCost())
                    .startReading(data.getStartReading())
                    .endReading(data.getEndReading())
                    .remark(data.getRemark())

                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            TransportCost created = transportCostRepository.save(transportCost);

            return ResponseEntity.ok(created);

        }


        return null;
    }
}
