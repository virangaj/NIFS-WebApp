package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.dto.common.LeaveRequestDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.common.LeaveRequest;
import com.nifs.backend.repository.common.LeaveRequestRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.common.ILeaveRequestService;
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
public class LeaveRequestService implements ILeaveRequestService {

    final
    LeaveRequestRepository leaveRequestRepository;

    final
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;
    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository, ModelMapper modelMapper) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseEntity<?> createNewLeaveRequest(LeaveRequestDTO data) throws MessagingException {

        log.info("Data from the Client " + data.getDocumentNo());

        if(leaveRequestRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            LeaveRequest leaveRequest = LeaveRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .leaveType(data.getLeaveType())
                    .startDate(data.getStartDate())
                    .startTime(data.getStartTime())
                    .durationInDays(data.getDurationInDays())
                    .requestDateOptional(data.getRequestDateOptional())
                    .jobCategory(data.getJobCategory())
                    .evidence(data.getEvidence())
                    .createdBy(data.getEpfNo())
                    .createdOn(new Date())
                    .dirApproved(data.getDirApproved())
                    .hodApproved(data.getHodApproved())
                    .build();

            LeaveRequest created = leaveRequestRepository.save(leaveRequest);
            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());
            String msgBody = emailService.HODRequestMessage("Leave Request", data.getEpfNo(), data.getDivisionId(), "leave-request");
//send email to hod
            emailService.sendEmail(hodEmail, "Leave Request", msgBody);
            return ResponseEntity.ok(created);

        }

        return null;
    }

    @Override
    public Object getAllLeaveRequests(String division) {
        try{
            List<LeaveRequest> leaveRequests = new ArrayList<LeaveRequest>();

            if (division == null) {
                leaveRequests = leaveRequestRepository.findAllByOrderByCreatedOnDesc();

            }
            else {
                leaveRequests = leaveRequestRepository.findByDivisionIdOrderByCreatedOnDesc(division);

            }
            return leaveRequests.stream()
                    .map(contract -> modelMapper.map(contract, LeaveRequestDTO.class))
                    .collect(Collectors.toList());
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public Object putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("HOD Leave : requested");

            //create email list
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id -> {
                leaveRequestRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);

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
                String msgBody = emailService.DirectorRequestMessage("Annual Increment Request", "leave-request");

                emailService.sendEmail(dirEmail, "Leave Request", msgBody);

                emailService.sendEmail(secEmail, "Leave Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Leave Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Leave Request", "NOT APPROVED", "HOD " +user);

            }
            return true;



        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    //get epf no from request id
    private int getUserIDByRequestId(String id) {
        LeaveRequest request = leaveRequestRepository.findByDocumentNoEquals(id);
        return request.getEpfNo();
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Leave Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id -> {
                leaveRequestRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);

                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Leave Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Leave Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
