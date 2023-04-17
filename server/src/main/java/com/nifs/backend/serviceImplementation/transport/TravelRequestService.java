package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.transport.TravelRequest;
import com.nifs.backend.repository.transport.TravelRequestRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.transport.ITravelRequestService;
import com.nifs.backend.util.EmailService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TravelRequestService implements ITravelRequestService {


    final
    TravelRequestRepository travelRequestRepository;

    private final ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;
    public TravelRequestService(TravelRequestRepository travelRequestRepository, ModelMapper modelMapper) {
        this.travelRequestRepository = travelRequestRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public TravelRequestDTO createNewTravelRequest(TravelRequestDTO data) throws MessagingException {

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
                    .dirApproved(data.getDirApproved())
                    .createdOn(new Date())
                    .build();

            travelRequestRepository.save(travelRequest);
            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());

            String msgBody = emailService.HODRequestMessage("New Travel Request", Integer.parseInt(data.getEpfNo()), data.getDivisionId(), "travel-request");

            //send email to hod
            emailService.sendEmail(hodEmail, "New Travel Request", msgBody);
            return modelMapper.map(travelRequest,TravelRequestDTO.class);

        }

        return null;
    }


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
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                travelRequestRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
                int epfNo = getUserIDByRequestId(id);

                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            //send email to director if approved
            if(approval == RequestStatus.APPROVED){
                String dirEmail = employeeMasterService.getDirectorEmail();
                String secEmail = employeeMasterService.getSecretaryEmail();
                String msgBody = emailService.DirectorRequestMessage("New Travel Request", "travel-request");

                emailService.sendEmail(dirEmail, "New Travel Request", msgBody);

                emailService.sendEmail(secEmail, "New Travel Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"New Travel Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"New Travel Request", "NOT APPROVED", "HOD " +user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }

    }

    private int getUserIDByRequestId(String id) {
        TravelRequest request = travelRequestRepository.findByDocumentNoEquals(id);
        return Integer.parseInt(request.getEpfNo());
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {

        try {
            log.info("Director Travel Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                travelRequestRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);

                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"New Travel Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"New Travel Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }

    }
}
