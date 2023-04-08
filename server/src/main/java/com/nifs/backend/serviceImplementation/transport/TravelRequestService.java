package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.model.transport.TravelRequest;
import com.nifs.backend.repository.transport.TravelRequestRepository;
import com.nifs.backend.service.transport.ITravelRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class TravelRequestService implements ITravelRequestService {


    final
    TravelRequestRepository travelRequestRepository;

    public TravelRequestService(TravelRequestRepository travelRequestRepository) {
        this.travelRequestRepository = travelRequestRepository;
    }


    @Override
    public ResponseEntity<?> createNewTravelRequest(TravelRequestDTO data) {

        log.info("Data from the Client " + data.getDocumentNo());

        if(travelRequestRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            TravelRequest travelRequest = TravelRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .arrivalDate(data.getArrivalDate())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .modeOfTravel(data.getModeOfTravel())
                    .locationAndRoute(data.getLocationAndRoute())
                    .otherPassengers(data.getOtherPassengers())
                    .sourceOfFunding(data.getSourceOfFunding())
                    .vehicleType(data.getVehicleType())
                    .purpose(data.getPurpose())
                    .requestDate(data.getRequestDate())
                    .time(data.getTime())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            TravelRequest created = travelRequestRepository.save(travelRequest);

            return ResponseEntity.ok(created);

        }

        return null;
    }
}
