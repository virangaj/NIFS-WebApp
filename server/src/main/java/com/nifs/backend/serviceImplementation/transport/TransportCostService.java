package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.transport.TransportCostDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.transport.TransportCost;
import com.nifs.backend.model.transport.TravelRequest;
import com.nifs.backend.repository.transport.TransportCostRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.transport.ITransportCostService;
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
public class TransportCostService implements ITransportCostService {


    final
    TransportCostRepository transportCostRepository;

    final
    ModelMapper modelMapper;

    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;
    public TransportCostService(TransportCostRepository transportCostRepository, ModelMapper modelMapper) {
        this.transportCostRepository = transportCostRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public TransportCostDTO createNewTransportCost(TransportCostDTO data) throws MessagingException {

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
                    .dirApproved(data.getDirApproved())
                    .createdOn(new Date())
                    .build();

            transportCostRepository.save(transportCost);
            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());

            String msgBody = emailService.HODRequestMessage("Transport Cost Request", Integer.parseInt(data.getEpfNo()), data.getDivisionId(), "transport-cost");

            //send email to hod
            emailService.sendEmail(hodEmail, "Transport Cost Request", msgBody);

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
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                transportCostRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);

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
                String msgBody = emailService.DirectorRequestMessage("Transport Cost Request", "transport-cost");

                emailService.sendEmail(dirEmail, "Transport Cost Request", msgBody);

                emailService.sendEmail(secEmail, "Transport Cost Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Transport Cost Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Transport Cost Request", "NOT APPROVED", "HOD " +user);

            }
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
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                transportCostRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Transport Cost Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Transport Cost Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        TransportCost request = transportCostRepository.findByDocumentNoEquals(id);
        return Integer.parseInt(request.getEpfNo());
    }


}
