package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.dto.common.LeaveRequestDTO;
import com.nifs.backend.model.common.LeaveRequest;
import com.nifs.backend.repository.common.LeaveRequestRepository;
import com.nifs.backend.service.common.ILeaveRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class LeaveRequestService implements ILeaveRequestService {

    final
    LeaveRequestRepository leaveRequestRepository;

    public LeaveRequestService(LeaveRequestRepository leaveRequestRepository) {
        this.leaveRequestRepository = leaveRequestRepository;
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
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            LeaveRequest created = leaveRequestRepository.save(leaveRequest);

            return ResponseEntity.ok(created);

        }

        return null;
    }
}
