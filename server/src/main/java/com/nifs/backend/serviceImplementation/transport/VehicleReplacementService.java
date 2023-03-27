package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.VehicleReplacementDTO;
import com.nifs.backend.model.transport.VehicleReplacement;
import com.nifs.backend.repository.transport.VehicleReplacementRepository;
import com.nifs.backend.service.transport.IVehicleReplacementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class VehicleReplacementService implements IVehicleReplacementService {


    final
    VehicleReplacementRepository vehicleReplacementRepository;

    public VehicleReplacementService(VehicleReplacementRepository vehicleReplacementRepository) {
        this.vehicleReplacementRepository = vehicleReplacementRepository;
    }


    @Override
    public ResponseEntity<?> createNewVehicleReplacement(VehicleReplacementDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(vehicleReplacementRepository.findByDocumentNoEquals(data.getDocumentNo())== null){
            VehicleReplacement vehicleReplacement = VehicleReplacement
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .invoiceNo(data.getInvoiceNo())
                    .itemName(data.getItemName())
                    .meterReading(data.getMeterReading())
                    .placeOfPurchase(data.getPlaceOfPurchase())
                    .cost(data.getCost())
                    .date(data.getDate())
                    .invoiceDate(data.getInvoiceDate())
                    .vehicleNo(data.getVehicleNo())
                    .category(data.getCategory())
                    .location(data.getLocation())
                    .manufacturer(data.getManufacturer())
                    .description(data.getDescription())
                    .remark(data.getRemark())
                    .createdBy(0)
                    .createdOn(new Date())
                    .build();

            VehicleReplacement created = vehicleReplacementRepository.save(vehicleReplacement);
            return ResponseEntity.ok(created);
        }

        return null;
    }
}
