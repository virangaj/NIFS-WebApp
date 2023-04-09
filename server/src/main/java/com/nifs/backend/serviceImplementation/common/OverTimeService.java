package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.dto.common.OvertimeDTO;
import com.nifs.backend.model.common.OverTime;
import com.nifs.backend.repository.common.OverTimeRepository;
import com.nifs.backend.service.common.IOverTimeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class OverTimeService implements IOverTimeService {

    final
    OverTimeRepository overTimeRepository;

    public OverTimeService(OverTimeRepository overTimeRepository) {
        this.overTimeRepository = overTimeRepository;
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
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            OverTime created = overTimeRepository.save(overTime);

            return ResponseEntity.ok(created);


        }

        return null;
    }
}
