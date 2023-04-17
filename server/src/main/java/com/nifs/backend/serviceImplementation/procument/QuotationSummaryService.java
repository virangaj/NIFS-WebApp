package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.QuotationRequestDTO;
import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.procument.QuotationRequest;
import com.nifs.backend.model.procument.QuotationSummary;
import com.nifs.backend.repository.procument.QuotationSummaryRepository;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.procument.IQuotationSummaryService;
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
public class QuotationSummaryService implements IQuotationSummaryService {


    final
    QuotationSummaryRepository quotationSummaryRepository;

    final
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;
    public QuotationSummaryService(QuotationSummaryRepository quotationSummaryRepository, ModelMapper modelMapper) {
        this.quotationSummaryRepository = quotationSummaryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public QuotationSummaryDTO createNewQuotationSummary(QuotationSummaryDTO data) throws MessagingException {

        log.info("Data from the client " + data.getDocumentNo());

        if(quotationSummaryRepository.findByDocumentNoEquals(data.getDocumentNo())== null){


            QuotationSummary quotationSummary = QuotationSummary
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .fundType(data.getFundType())
                    .date(data.getDate())
                    .quotationRequestNo(data.getQuotationRequestNo())
                    .fileNo(data.getFileNo())
                    .srnNo(data.getSrnNo())
                    .value(data.getValue())
                    .fund(data.getFund())
                    .project(data.getProject())
                    .remark(data.getRemark())
                    .createdBy(Integer.valueOf(data.getEpfNo()))
                    .hodApproved(data.getHodApproved())
                    .dirApproved(data.getDirApproved())
                    .createdOn(new Date())
                    .build();

            quotationSummaryRepository.save(quotationSummary);
            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());

            String msgBody = emailService.HODRequestMessage("Quotation Summary Request", Integer.parseInt(data.getEpfNo()), data.getDivisionId(), "quotation-summary");

            //send email to hod
            emailService.sendEmail(hodEmail, "Quotation Summary Request", msgBody);

            return modelMapper.map(quotationSummary,QuotationSummaryDTO.class);

        }

        return null;
    }

    @Override
    public List<QuotationSummaryDTO> getAllQuotationSummaries(String division) {
        try {
            List<QuotationSummary> quotationSummaries = new ArrayList<>();

            if (division == null){
                quotationSummaries = quotationSummaryRepository.findAllByOrderByCreatedOnDesc();
            }else {
                quotationSummaries = quotationSummaryRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return quotationSummaries.stream()
                    .map(request -> modelMapper.map(request, QuotationSummaryDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("HOD Summary Request : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                quotationSummaryRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);

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
                String msgBody = emailService.DirectorRequestMessage("Quotation Summary Request", "quotation-summary");

                emailService.sendEmail(dirEmail, "Quotation Summary Request", msgBody);

                emailService.sendEmail(secEmail, "Quotation Summary Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Quotation Summary Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Quotation Summary Request", "NOT APPROVED", "HOD " +user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        QuotationSummary request = quotationSummaryRepository.findByDocumentNoEquals(id);
        return Integer.parseInt(request.getEpfNo());
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Quotation Summary : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();
            resId.forEach(id->{
                quotationSummaryRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);

                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });

            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Quotation Summary Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Quotation Summary Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
