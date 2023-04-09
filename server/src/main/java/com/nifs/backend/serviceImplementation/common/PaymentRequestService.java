package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.dto.common.PaymentRequestDTO;
import com.nifs.backend.model.common.PaymentRequest;
import com.nifs.backend.repository.common.PaymentRequestRepository;
import com.nifs.backend.service.common.IPaymentRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class PaymentRequestService implements IPaymentRequestService {

    final
    PaymentRequestRepository paymentRequestRepository;

    public PaymentRequestService(PaymentRequestRepository paymentRequestRepository) {
        this.paymentRequestRepository = paymentRequestRepository;
    }

    @Override
    public ResponseEntity<?> createNewPaymentRequest(PaymentRequestDTO data) {

        log.info("Data from the Client " + data.getDocumentNo());

        if(paymentRequestRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            PaymentRequest paymentRequest = PaymentRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .description(data.getDescription())
                    .remark(data.getRemark())
                    .grossAmount(data.getGrossAmount())
                    .friegthCharge(data.getFriegthCharge())
                    .clearingCharge(data.getClearingCharge())
                    .directorGeneralCharge(data.getDirectorGeneralCharge())
                    .customCharge(data.getCustomCharge())
                    .courierCharge(data.getCourierCharge())
                    .airLineCharge(data.getAirLineCharge())
                    .handlingCharge(data.getHandlingCharge())
                    .insurance(data.getInsurance())
                    .otherCharge(data.getOtherCharge())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            PaymentRequest created = paymentRequestRepository.save(paymentRequest);

            return ResponseEntity.ok(created);


        }

        return null;
    }
}
