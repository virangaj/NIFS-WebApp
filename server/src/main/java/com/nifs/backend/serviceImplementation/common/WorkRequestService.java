package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.dto.common.WorkRequestDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.common.WorkRequest;
import com.nifs.backend.repository.common.WorkRequestRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.common.IWorkRequestService;
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
public class WorkRequestService implements IWorkRequestService {

    final
    WorkRequestRepository workRequestRepository;

    final
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;
    public WorkRequestService(WorkRequestRepository workRequestRepository, ModelMapper modelMapper) {
        this.workRequestRepository = workRequestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseEntity<?> createNewWorkRequest(WorkRequestDTO data) throws MessagingException {

        log.info("Data from the Client " + data.getDocumentNo());

        if(workRequestRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            WorkRequest workRequest = WorkRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .workType(data.getWorkType())
                    .program(data.getProgram())
                    .hodEmail(data.getHodEmail())
                    .supervisorEmail(data.getSupervisorEmail())
                    .workDescription(data.getWorkDescription())
                    .googleLinkWithWorkDescription(data.getGoogleLinkWithWorkDescription())
                    .createdBy(data.getEpfNo())
                    .createdOn(new Date())
                    .dirApproved(data.getDirApproved())
                    .hodApproved(data.getHodApproved())
                    .build();

            WorkRequest created = workRequestRepository.save(workRequest);
            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());

            String msgBody = emailService.HODRequestMessage("Work Request", data.getEpfNo(), data.getDivisionId(), "work-request");

            //send email to hod
            emailService.sendEmail(hodEmail, "Work Request", msgBody);
            return ResponseEntity.ok(created);


        }

        return null;
    }

    @Override
    public Object getAllWorkRequests(String division) {
        try{
            List<WorkRequest> workRequests = new ArrayList<WorkRequest>();

            if (division == null) {
                workRequests = workRequestRepository.findAllByOrderByCreatedOnDesc();

            }
            else {
                workRequests = workRequestRepository.findByDivisionIdOrderByCreatedOnDesc(division);

            }
            return workRequests.stream()
                    .map(work -> modelMapper.map(work, WorkRequestDTO.class))
                    .collect(Collectors.toList());
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public Object putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("HOD Work Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id -> {
                workRequestRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
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
                String msgBody = emailService.DirectorRequestMessage("Work Request", "work-request");

                emailService.sendEmail(dirEmail, "Work Request", msgBody);

                emailService.sendEmail(secEmail, "Work Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Work Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Work Request", "NOT APPROVED", "HOD " +user);

            }
            return true;

            //HOD has approved your request
            //HOD has rejected your request

        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        WorkRequest request = workRequestRepository.findByDocumentNoEquals(id);
        return request.getEpfNo();
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Resignation Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id -> {
                workRequestRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Work Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Work Request", "NOT APPROVED","Director/secretary " + user);

            }

            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
