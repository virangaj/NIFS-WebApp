package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.dto.common.PaymentRequestDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.common.PaymentRequest;
import com.nifs.backend.repository.common.PaymentRequestRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.common.IPaymentRequestService;
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
public class PaymentRequestService implements IPaymentRequestService {

    final
    PaymentRequestRepository paymentRequestRepository;

    final
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;

    public PaymentRequestService(PaymentRequestRepository paymentRequestRepository, ModelMapper modelMapper) {
        this.paymentRequestRepository = paymentRequestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ResponseEntity<?> createNewPaymentRequest(PaymentRequestDTO data) throws MessagingException {

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
                    .dirApproved(data.getDirApproved())
                    .createdOn(new Date())
                    .build();

            PaymentRequest created = paymentRequestRepository.save(paymentRequest);

            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());

            String msgBody = emailService.HODRequestMessage("Payment Request", data.getEpfNo(), data.getDivisionId(), "payment-request");

            //send email to hod
            emailService.sendEmail(hodEmail, "Payment Request", msgBody);

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

            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id -> {
                paymentRequestRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
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
                String msgBody = emailService.DirectorRequestMessage("Payment Request", "payment-request");

                emailService.sendEmail(dirEmail, "Payment Request", msgBody);

                emailService.sendEmail(secEmail, "Payment Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Payment Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Payment Request", "NOT APPROVED", "HOD " +user);

            }
            return true;

            //HOD has approved your request
            //HOD has rejected your request

        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        PaymentRequest request = paymentRequestRepository.findByDocumentNoEquals(id);
        return request.getEpfNo();
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Payment Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id -> {
                paymentRequestRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Payment Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Payment Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
