package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.VehicleRepairDTO;
import com.nifs.backend.model.transport.VehicleRepair;
import com.nifs.backend.repository.transport.VehicleRepairRepository;
import com.nifs.backend.service.transport.IVehicleRepairService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class VehicleRepairService implements IVehicleRepairService {

    final
    VehicleRepairRepository vehicleRepairRepository;

    public VehicleRepairService(VehicleRepairRepository vehicleRepairRepository) {
        this.vehicleRepairRepository = vehicleRepairRepository;
    }


    @Override
    public ResponseEntity<?> createNewVehicleRepair(VehicleRepairDTO data) {

        log.info("data from the client " + data.getDocumentNo());

        if(vehicleRepairRepository.findByDocumentNoEquals(data.getDocumentNo())==null){
            VehicleRepair vehicleRepair = VehicleRepair
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .vehicleNo(data.getVehicleNo())
                    .invoiceNo(data.getInvoiceNo())
                    .vehicleType(data.getVehicleType())
                    .workshop(data.getWorkshop())
                    .description(data.getDescription())
                    .date(data.getDate())
                    .invoiceDate(data.getInvoiceDate())
                    .repairStartDate(data.getRepairStartDate())
                    .repairEndDate(data.getRepairEndDate())
                    .meterReading(data.getMeterReading())
                    .repairType(data.getRepairType())
                    .repairCost(data.getRepairCost())
                    .location(data.getLocation())
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            VehicleRepair created = vehicleRepairRepository.save(vehicleRepair);
            return ResponseEntity.ok(created);
        }
        return null;
    }
}
