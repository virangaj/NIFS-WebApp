package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.VehicleMasterDTO;
import com.nifs.backend.model.transport.VehicleMaster;
import com.nifs.backend.repository.transport.VehicleMasterRepository;
import com.nifs.backend.service.transport.IVehicleMasterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class VehicleMasterService implements IVehicleMasterService {

    private final VehicleMasterRepository vehicleMasterRepository;


    public VehicleMasterService(VehicleMasterRepository vehicleMasterRepository) {
        this.vehicleMasterRepository = vehicleMasterRepository;
    }


    @Override
    public ResponseEntity<?> createNewVehicle(VehicleMasterDTO data) {

        log.info("data from the client" + data.getRegistrationNo());

        if(vehicleMasterRepository.findByRegistrationNoEquals(data.getRegistrationNo())==null){

            VehicleMaster vehicleMaster = VehicleMaster
                    .builder()
                    .registrationNo(data.getRegistrationNo())
                    .chassiNo(data.getChassiNo())
                    .engineNo(data.getEngineNo())
                    .date(data.getDate())
                    .pool(data.getPool())
                    .employee(data.getEmployee())
                    .category(data.getCategory())
                    .brand(data.getBrand())
                    .color(data.getColor())
                    .availability(data.getAvailability())
                    .emissionTestDate(data.getEmissionTestDate())
                    .insuranceCompanyName(data.getInsuranceCompanyName())
                    .insuranceExpiryDate(data.getInsuranceExpiryDate())
                    .licenseExpiryDate(data.getLicenseExpiryDate())
                    .remarks(data.getRemarks())
                    .createdOn(new Date())
                    .createdBy(0)
                    .build();

            VehicleMaster created = vehicleMasterRepository.save(vehicleMaster);

            return ResponseEntity.ok(created);

        }

        return null;
    }
}
