package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.dto.common.OvertimeDTO;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.common.OverTime;
import com.nifs.backend.repository.common.OverTimeRepository;
import com.nifs.backend.service.common.IOverTimeService;
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
public class OverTimeService implements IOverTimeService {

    final
    OverTimeRepository overTimeRepository;

    final
    ModelMapper modelMapper;

    public OverTimeService(OverTimeRepository overTimeRepository, ModelMapper modelMapper) {
        this.overTimeRepository = overTimeRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public ResponseEntity<?> createNewOverTime(OvertimeDTO data) {

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
                    .build();

            OverTime created = overTimeRepository.save(overTime);

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
            resId.forEach(id -> {
                overTimeRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
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
            log.info("Director OverTime Request : requested");
            resId.forEach(id -> {
                overTimeRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
