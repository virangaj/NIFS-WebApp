package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.dto.common.WorkRequestDTO;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.common.WorkRequest;
import com.nifs.backend.repository.common.WorkRequestRepository;
import com.nifs.backend.service.common.IWorkRequestService;
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
public class WorkRequestService implements IWorkRequestService {

    final
    WorkRequestRepository workRequestRepository;

    final
    ModelMapper modelMapper;

    public WorkRequestService(WorkRequestRepository workRequestRepository, ModelMapper modelMapper) {
        this.workRequestRepository = workRequestRepository;
        this.modelMapper = modelMapper;
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
                    .createdBy(data.getEpfNo())
                    .createdOn(new Date())
                    .dirApproved(data.getDirApproved())
                    .hodApproved(data.getHodApproved())
                    .build();

            WorkRequest created = workRequestRepository.save(workRequest);

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
            resId.forEach(id -> {
                workRequestRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
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
                workRequestRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
