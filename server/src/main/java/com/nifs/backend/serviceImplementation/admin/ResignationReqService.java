package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.admin.ResignationRequest;
import com.nifs.backend.repository.admin.ResignationReqRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.admin.IResignationReqService;
import com.nifs.backend.util.EmailService;
import jakarta.mail.MessagingException;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ResignationReqService implements IResignationReqService {


    @Autowired
    ResignationReqRepository resignationReqRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;

    //add new resignation request
    @Override
    public ResignationRequestDTO createResignationRequest(ResignationRequestDTO data) throws MessagingException {

        ResignationRequest employee = modelMapper.map(data, ResignationRequest.class);

        employee.setCreatedOn(new Date());
        employee.setCreatedBy((data.getEpfNo()));
        ResignationRequest resignationRequest = resignationReqRepository.save(employee);

        String hodEmail = employeeMasterService.getGsuitEmailById(Integer.parseInt(data.getHod()));
        String msgBody = emailService.HODRequestMessage("Resignation Request", data.getEpfNo(), data.getDivisionId(), "resignation-request");

        //send email to hod
        emailService.sendEmail(hodEmail, "Resignation Request", msgBody);

        return modelMapper.map(resignationRequest, ResignationRequestDTO.class);
    }

    //get all resignation request
    @Override
    public List<ResignationRequestDTO> getAllResignationRequests(String division) {

        try{
            List<ResignationRequest> resignationRequests = new ArrayList<ResignationRequest>();

            if (division == null) {
                resignationRequests = resignationReqRepository.findAllByOrderByCreatedOnDesc();

            }
            else {
                resignationRequests = resignationReqRepository.findByDivisionIdOrderByCreatedOnDesc(division);

            }
            return resignationRequests.stream()
                    .map(employee -> modelMapper.map(employee, ResignationRequestDTO.class))
                    .collect(Collectors.toList());
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

    // hod approval
    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("HOD Resignation Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();

            resId.forEach(id -> {
                resignationReqRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);

            });

            if(approval == RequestStatus.APPROVED){
                String dirEmail = employeeMasterService.getDirectorEmail();
                String secEmail = employeeMasterService.getSecretaryEmail();
                String msgBody = emailService.DirectorRequestMessage("Resignation Request", "resignation-request");

                emailService.sendEmail(dirEmail, "Resignation Request", msgBody);

                emailService.sendEmail(secEmail, "Resignation Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Resignation Request", "APPROVED", user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Resignation Request", "NOT APPROVED", user);

            }


            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        ResignationRequest request = resignationReqRepository.findByDocumentNoEquals(id);
        return request.getEpfNo();
    }

    // director approval
    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            List<Map<String ,String>> emailList = new ArrayList<>();
            log.info("Director Resignation Request : requested");
            resId.forEach(id -> {
                resignationReqRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });


            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Resignation Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Resignation Request", "NOT APPROVED","Director/secretary " + user);

            }


            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }




}
