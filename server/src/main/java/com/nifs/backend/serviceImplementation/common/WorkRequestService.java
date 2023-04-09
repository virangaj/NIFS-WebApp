package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.dto.common.WorkRequestDTO;
import com.nifs.backend.model.common.WorkRequest;
import com.nifs.backend.repository.common.WorkRequestRepository;
import com.nifs.backend.service.common.IWorkRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class WorkRequestService implements IWorkRequestService {

    final
    WorkRequestRepository workRequestRepository;

    public WorkRequestService(WorkRequestRepository workRequestRepository) {
        this.workRequestRepository = workRequestRepository;
    }

    @Override
    public ResponseEntity<?> createNewWorkRequest(WorkRequestDTO data) {

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
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            WorkRequest created = workRequestRepository.save(workRequest);

            return ResponseEntity.ok(created);


        }

        return null;
    }
}
