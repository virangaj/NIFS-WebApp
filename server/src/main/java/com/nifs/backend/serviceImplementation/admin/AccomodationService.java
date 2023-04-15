package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.AccomodationDTO;
import com.nifs.backend.model.admin.Accomodation;
import com.nifs.backend.repository.admin.AccomodationRepository;
import com.nifs.backend.service.admin.IAccomodationService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AccomodationService implements IAccomodationService {


    final
    AccomodationRepository accomodationRepository;

    final
    ModelMapper modelMapper;

    public AccomodationService(AccomodationRepository accomodationRepository, ModelMapper modelMapper) {
        this.accomodationRepository = accomodationRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public AccomodationDTO createNewAccomodationRequest(AccomodationDTO data) {

        log.info("Data from the Client " + data.getDocumentNo());

        if(accomodationRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            Accomodation accomodation = Accomodation
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())

                    .date(data.getDate())
                    .guestName(data.getGuestName())
                    .address(data.getAddress())
                    .email(data.getEmail())
                    .nicNo(data.getNicNo())
                    .telephoneNo(data.getTelephoneNo())
                    .roomNumber(data.getRoomNumber())
                    .noOfDays(data.getNoOfDays())
                    .fromDate(data.getFromDate())
                    .toDate(data.getToDate())
                    .roomRates(data.getRoomRates())
                    .roomType(data.getRoomType())
                    .totalCharges(data.getTotalCharges())

                    .createdBy(Integer.valueOf(data.getEpfNo()))
                    .createdOn(new Date())
                    .hodApproved(data.getHodApproved())
                    .build();

            accomodationRepository.save(accomodation);

            return modelMapper.map(accomodation,AccomodationDTO.class);


        }
        return null;
    }

    @Override
    public List<AccomodationDTO> getAllAccomodationRequests(String division) {
        try {
            List<Accomodation> accomodations = new ArrayList<>();

            if (division == null){
                accomodations = accomodationRepository.findAllByOrderByCreatedOnDesc();
            }else {
                accomodations = accomodationRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return accomodations.stream()
                    .map(request -> modelMapper.map(request, AccomodationDTO.class))
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
                accomodationRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
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
                accomodationRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
