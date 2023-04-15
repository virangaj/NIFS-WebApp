package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.transport.TransportCostDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.model.transport.TransportCost;
import com.nifs.backend.model.transport.TravelRequest;
import com.nifs.backend.repository.transport.TransportCostRepository;
import com.nifs.backend.service.transport.ITransportCostService;
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
public class TransportCostService implements ITransportCostService {


    final
    TransportCostRepository transportCostRepository;

    final
    ModelMapper modelMapper;


    public TransportCostService(TransportCostRepository transportCostRepository, ModelMapper modelMapper) {
        this.transportCostRepository = transportCostRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public TransportCostDTO createNewTransportCost(TransportCostDTO data) {

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

                    .createdBy(Integer.valueOf(data.getEpfNo()))
                    .hodApproved(data.getHodApproved())
                    .createdOn(new Date())
                    .build();

            transportCostRepository.save(transportCost);

            return modelMapper.map(transportCost,TransportCostDTO.class);

        }


        return null;
    }

    @Override
    public List<TransportCostDTO> getAllTravelRequests(String division) {

        try {
            List<TransportCost> transportCosts = new ArrayList<>();

            if (division == null){
                transportCosts = transportCostRepository.findAllByOrderByCreatedOnDesc();
            }else {
                transportCosts = transportCostRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return transportCosts.stream()
                    .map(request -> modelMapper.map(request,TransportCostDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }

    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("HOD Transport Cost Request : requested");
            resId.forEach(id->{
                transportCostRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
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
            log.info("Director transport cost Request : requested");
            resId.forEach(id->{
                transportCostRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }


}
