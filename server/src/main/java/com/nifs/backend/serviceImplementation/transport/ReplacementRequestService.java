package com.nifs.backend.serviceImplementation.transport;

import com.nifs.backend.dto.transport.ReplacementRequestDTO;
import com.nifs.backend.model.transport.ReplacementRequest;
import com.nifs.backend.repository.transport.ReplacementRequestRepository;
import com.nifs.backend.service.transport.IReplacementRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class ReplacementRequestService implements IReplacementRequestService {

    final
    ReplacementRequestRepository replacementRequestRepository;

    public ReplacementRequestService(ReplacementRequestRepository replacementRequestRepository) {
        this.replacementRequestRepository = replacementRequestRepository;
    }


    @Override
    public ResponseEntity<?> createNewReplacementRequest(ReplacementRequestDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(replacementRequestRepository.findByDocumentNoEquals(data.getDocumentNo()) == null){

            ReplacementRequest replacementRequest = ReplacementRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .vehicleNo(data.getVehicleNo())
                    .driver(data.getDriver())
                    .category(data.getCategory())
                    .amount(data.getAmount())
                    .brand(data.getBrand())
                    .attachment(data.getAttachment())
                    .date(data.getDate())
                    .startMeterReading(data.getStartMeterReading())
                    .endMeterReading(data.getEndMeterReading())
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            ReplacementRequest created = replacementRequestRepository.save(replacementRequest);

            return ResponseEntity.ok(created);

        }


        return null;
    }
}
