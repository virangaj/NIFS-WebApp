package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.dto.common.PaymentRequestDTO;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.common.PaymentRequest;
import com.nifs.backend.repository.common.PaymentRequestRepository;
import com.nifs.backend.service.common.IPaymentRequestService;
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
public class PaymentRequestService implements IPaymentRequestService {

    final
    PaymentRequestRepository paymentRequestRepository;

    final
    ModelMapper modelMapper;

    public PaymentRequestService(PaymentRequestRepository paymentRequestRepository, ModelMapper modelMapper) {
        this.paymentRequestRepository = paymentRequestRepository;
        this.modelMapper = modelMapper;
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
                    .createdBy(data.getEpfNo())
                    .hodApproved(data.getHodApproved())
                    .createdOn(new Date())
                    .build();

            PaymentRequest created = paymentRequestRepository.save(paymentRequest);

            return ResponseEntity.ok(created);


        }

        return null;
    }

    @Override
    public Object getAllPaymentRequests(String division) {
        try{
            List<PaymentRequest> paymentRequests = new ArrayList<PaymentRequest>();

            if (division == null) {
                paymentRequests = paymentRequestRepository.findAllByOrderByCreatedOnDesc();

            }
            else {
                paymentRequests = paymentRequestRepository.findByDivisionIdOrderByCreatedOnDesc(division);

            }
            return paymentRequests.stream()
                    .map(contract -> modelMapper.map(contract, PaymentRequestDTO.class))
                    .collect(Collectors.toList());
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public Object putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("HOD Payment Request : requested");
            resId.forEach(id -> {
                paymentRequestRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
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
            log.info("Director Payment Request : requested");
            resId.forEach(id -> {
                paymentRequestRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
