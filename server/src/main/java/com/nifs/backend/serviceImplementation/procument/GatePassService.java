package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.dto.procument.GatePassDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.model.procument.GatePass;
import com.nifs.backend.repository.procument.GatePassRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.procument.IGatePassService;
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
public class GatePassService implements IGatePassService {

    final
    GatePassRepository gatePassRepository;

    final
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;
    public GatePassService(GatePassRepository gatePassRepository, ModelMapper modelMapper) {
        this.gatePassRepository = gatePassRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public GatePassDTO createNewArticleRequest(GatePassDTO data) throws MessagingException {

        log.info("Data from the client " + data.getDocumentNo());

        if(gatePassRepository.findByDocumentNoEquals(data.getDocumentNo())==null){


            GatePass gatePass = GatePass
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .locationAfterRemoval(data.getLocationAfterRemoval())
                    .purposeOfRemoval(data.getPurposeOfRemoval())
                    .dateOfRemoval(data.getDateOfRemoval())
                    .expectedReturnDate(data.getExpectedReturnDate())
                    .remark(data.getRemark())
                    .itemName(data.getItemName())
                    .itemType(data.getItemType())
                    .quantity(data.getQuantity())
                    .inventoryNumber(data.getInventoryNumber())
                    .description(data.getDescription())
                    .currentLocation(data.getCurrentLocation())
                    .officerInChargeName(data.getOfficerInChargeName())
                    .nameOfOfficerOutsideIncharge(data.getNameOfOfficerOutsideIncharge())
                    .resultOfVerificationBySecurityOfficer(data.getResultOfVerificationBySecurityOfficer())
                    .createdBy(Integer.valueOf(data.getEpfNo()))
                    .hodApproved(data.getHodApproved())
                    .dirApproved(data.getDirApproved())
                    .createdOn(new Date())
                    .build();

            gatePassRepository.save(gatePass);
            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());

            String msgBody = emailService.HODRequestMessage("Gate Pass Request", Integer.parseInt(data.getEpfNo()), data.getDivisionId(), "gate-pass");

            //send email to hod
            emailService.sendEmail(hodEmail, "Gate Pass Request", msgBody);
            return modelMapper.map(gatePass,GatePassDTO.class);

        }

        return null;
    }

    @Override
    public List<GatePassDTO> getAllArticleRequests(String division) {
        try {
            List<GatePass> gatePasses = new ArrayList<>();

            if (division == null){
                gatePasses = gatePassRepository.findAllByOrderByCreatedOnDesc();
            }else {
                gatePasses = gatePassRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return gatePasses.stream()
                    .map(request -> modelMapper.map(request, GatePassDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("HOD Article Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                gatePassRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
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
                String msgBody = emailService.DirectorRequestMessage("Gate Pass Request", "gate-pass");

                emailService.sendEmail(dirEmail, "Gate Pass Request", msgBody);

                emailService.sendEmail(secEmail, "Gate Pass Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Gate Pass Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Gate Pass Request", "NOT APPROVED", "HOD " +user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        GatePass request = gatePassRepository.findByDocumentNoEquals(id);
        return Integer.parseInt(request.getEpfNo());
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Article Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                gatePassRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Gate Pass Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Gate Pass Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
