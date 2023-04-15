package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.model.transport.TravelRequest;
import com.nifs.backend.repository.transport.TravelRequestRepository;
import com.nifs.backend.service.transport.ITravelRequestService;
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
public class TravelRequestService implements ITravelRequestService {


    final
    TravelRequestRepository travelRequestRepository;

    private final ModelMapper modelMapper;

    public TravelRequestService(TravelRequestRepository travelRequestRepository, ModelMapper modelMapper) {
        this.travelRequestRepository = travelRequestRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public TravelRequestDTO createNewTravelRequest(TravelRequestDTO data) {

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
                    .createdBy(Integer.valueOf(data.getEpfNo()))
                    .hodApproved(data.getHodApproved())
                    .createdOn(new Date())
                    .build();

            travelRequestRepository.save(travelRequest);

            return modelMapper.map(travelRequest,TravelRequestDTO.class);

        }

        return null;
    }


//    @Override
//    public TravelRequestDTO createNewTravelRequest(TravelRequestDTO data) {
//        TravelRequest request = modelMapper.map(data,TravelRequest.class);
//
//        request.setCreatedOn(new Date());
//        request.setCreatedBy(Integer.valueOf((data.getEpfNo())));
//        TravelRequest travelRequest = travelRequestRepository.save(request);
//
//        return  modelMapper.map(travelRequest,TravelRequestDTO.class);
//    }

    @Override
    public List<TravelRequestDTO> getAllTravelRequests(String division) {

        try {
            List<TravelRequest> travelRequests = new ArrayList<>();

            if (division == null){
                travelRequests = travelRequestRepository.findAllByOrderByCreatedOnDesc();
            }else {
                travelRequests = travelRequestRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return travelRequests.stream()
                    .map(request -> modelMapper.map(request,TravelRequestDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }

    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {

        try{
            log.info("Transport Travel Request : requested");
            resId.forEach(id->{
                travelRequestRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
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
            log.info("Director Travel Request : requested");
            resId.forEach(id->{
                travelRequestRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }

    }
}
