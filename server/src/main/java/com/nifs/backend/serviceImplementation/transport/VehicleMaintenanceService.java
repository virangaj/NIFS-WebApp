package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.VehicleMaintenanceDTO;
import com.nifs.backend.model.transport.VehicleMaintenance;
import com.nifs.backend.repository.transport.VehicleMaintenanceRepository;
import com.nifs.backend.service.transport.IvehicleMaintenanceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class VehicleMaintenanceService implements IvehicleMaintenanceService {

    final
    VehicleMaintenanceRepository vehicleMaintenanceRepository;

    public VehicleMaintenanceService(VehicleMaintenanceRepository vehicleMaintenanceRepository) {
        this.vehicleMaintenanceRepository = vehicleMaintenanceRepository;
    }


    @Override
    public ResponseEntity<?> createNewVehicleMaintenance(VehicleMaintenanceDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(vehicleMaintenanceRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            VehicleMaintenance vehicleMaintenance = VehicleMaintenance
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .invoiceNo(data.getInvoiceNo())
                    .vehicleNo(data.getVehicleNo())
                    .meter(data.getMeter())
                    .workshop(data.getWorkshop())
                    .cost(data.getCost())
                    .date(data.getDate())
                    .invoiceDate(data.getInvoiceDate())
                    .location(data.getLocation())
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            VehicleMaintenance created = vehicleMaintenanceRepository.save(vehicleMaintenance);
            return ResponseEntity.ok(created);
        }

        return null;
    }
}
