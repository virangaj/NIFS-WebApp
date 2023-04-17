package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.GatePassDTO;
import com.nifs.backend.dto.procument.QuotationRequestDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.procument.GatePass;
import com.nifs.backend.model.procument.QuotationRequest;
import com.nifs.backend.repository.procument.QuotationRequestRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.procument.IQuotationRequestService;
import com.nifs.backend.util.EmailService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;


@Service
@Slf4j
public class QuotationRequestService implements IQuotationRequestService {


    final
    QuotationRequestRepository quotationRequestRepository;

    final
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;

    public QuotationRequestService(QuotationRequestRepository quotationRequestRepository, ModelMapper modelMapper) {
        this.quotationRequestRepository = quotationRequestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public QuotationRequestDTO createNewQuotationRequest(QuotationRequestDTO data) throws MessagingException {

        log.info("Data from the client " + data.getDocumentNo());

        if(quotationRequestRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            QuotationRequest quotationRequest = QuotationRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .project(data.getProject())
                    .fund(data.getFund())
                    .srnNo(data.getSrnNo())
                    .fileNo(data.getFileNo())
                    .validityPeriodOfTheQuotation(data.getValidityPeriodOfTheQuotation())
                    .shippingTerms(data.getShippingTerms())
                    .supplierCatergory(data.getSupplierCatergory())
                    .bidStartingDate(data.getBidStartingDate())
                    .bidClosingDate(data.getBidClosingDate())
                    .remark(data.getRemark())
                    .createdBy(Integer.valueOf(data.getEpfNo()))
                    .createdOn(new Date())
                    .hodApproved(data.getHodApproved())
                    .dirApproved(data.getDirApproved())
                    .build();

            quotationRequestRepository.save(quotationRequest);
            String hodEmail = employeeMasterService.getGsuitEmailById((int)data.getHod());

            String msgBody = emailService.HODRequestMessage("Quotation Request", Integer.parseInt(data.getEpfNo()), data.getDivisionId(), "quotation-request");

            //send email to hod
            emailService.sendEmail(hodEmail, "Quotation Request", msgBody);
            return modelMapper.map(quotationRequest,QuotationRequestDTO.class);

        }

        return null;
    }

    @Override
    public List<QuotationRequestDTO> getAllQuotationRequests(String division) {
        try {
            List<QuotationRequest> quotationRequests = new ArrayList<>();

            if (division == null){
                quotationRequests = quotationRequestRepository.findAllByOrderByCreatedOnDesc();
            }else {
                quotationRequests = quotationRequestRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return quotationRequests.stream()
                    .map(request -> modelMapper.map(request, QuotationRequestDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("HOD Quotation Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                quotationRequestRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
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
                String msgBody = emailService.DirectorRequestMessage("Quotation Request", "quotation-request");

                emailService.sendEmail(dirEmail, "Quotation Request", msgBody);

                emailService.sendEmail(secEmail, "Quotation Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Quotation Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Quotation Request", "NOT APPROVED", "HOD " +user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        QuotationRequest request = quotationRequestRepository.findByDocumentNoEquals(id);
        return Integer.parseInt(request.getEpfNo());
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Quotation Request : requested");

            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                quotationRequestRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Quotation Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Quotation Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
