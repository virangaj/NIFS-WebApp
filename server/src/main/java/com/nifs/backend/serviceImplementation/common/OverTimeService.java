package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.dto.common.OvertimeDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.common.OverTime;
import com.nifs.backend.repository.common.OverTimeRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.common.IOverTimeService;
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
public class OverTimeService implements IOverTimeService {

    final
    OverTimeRepository overTimeRepository;

    final
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;
    public OverTimeService(OverTimeRepository overTimeRepository, ModelMapper modelMapper) {
        this.overTimeRepository = overTimeRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public ResponseEntity<?> createNewOverTime(OvertimeDTO data) throws MessagingException {

        log.info("Data from the Client " + data.getDocumentNo());

        if(overTimeRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            OverTime overTime = OverTime
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .noOfHoursRequested(data.getNoOfHoursRequested())
                    .noOfHoursOTDone(data.getNoOfHoursOTDone())
                    .nameOfWorkToBeDone(data.getNameOfWorkToBeDone())
                    .necessityToWorkOvertime(data.getNecessityToWorkOvertime())
                    .remark(data.getRemark())
                    .createdBy(data.getEpfNo())
                    .createdOn(new Date())
                    .hodApproved(data.getHodApproved())
                    .dirApproved(data.getDirApproved())
                    .build();

            OverTime created = overTimeRepository.save(overTime);
            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());
            String msgBody = emailService.HODRequestMessage("Over Time Request", data.getEpfNo(), data.getDivisionId(), "over-time");
            //send email to hod
            emailService.sendEmail(hodEmail, "Over Time Request", msgBody);
            return ResponseEntity.ok(created);


        }

        return null;
    }

    @Override
    public Object getAllOverTimeRequests(String division) {
        try{
            List<OverTime> overTimes = new ArrayList<OverTime>();

            if (division == null) {
                overTimes = overTimeRepository.findAllByOrderByCreatedOnDesc();

            }
            else {
                overTimes = overTimeRepository.findByDivisionIdOrderByCreatedOnDesc(division);

            }
            return overTimes.stream()
                    .map(contract -> modelMapper.map(contract, OvertimeDTO.class))
                    .collect(Collectors.toList());
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public Object putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("HOD Overtime Request : requested");

            List<Map<String ,String>> emailList = new ArrayList<>();

            resId.forEach(id -> {
                overTimeRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
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
                String msgBody = emailService.DirectorRequestMessage("Over Time Request", "over-time");

                emailService.sendEmail(dirEmail, "Over Time Request", msgBody);

                emailService.sendEmail(secEmail, "Over Time Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Over Time Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Over Time Request", "NOT APPROVED", "HOD " +user);

            }
            return true;


        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        OverTime request = overTimeRepository.findByDocumentNoEquals(id);
        return request.getEpfNo();
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director OverTime Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id -> {
                overTimeRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Over Time Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Over Time Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
