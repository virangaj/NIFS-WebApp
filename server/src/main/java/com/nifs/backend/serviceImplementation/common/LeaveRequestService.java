package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.dto.common.LeaveRequestDTO;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.common.LeaveRequest;
import com.nifs.backend.repository.common.LeaveRequestRepository;
import com.nifs.backend.service.common.ILeaveRequestService;
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
public class LeaveRequestService implements ILeaveRequestService {

    final
    LeaveRequestRepository leaveRequestRepository;

    final
    ModelMapper modelMapper;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository, ModelMapper modelMapper) {
        this.leaveRequestRepository = leaveRequestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseEntity<?> createNewLeaveRequest(LeaveRequestDTO data) {

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
            log.info("HOD Resignation Request : requested");
            resId.forEach(id -> {
                leaveRequestRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;

            //HOD has approved your request
            //HOD has rejected your request

        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Resignation Request : requested");
            resId.forEach(id -> {
                leaveRequestRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
