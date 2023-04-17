package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.model.admin.ContractExtension;
import com.nifs.backend.model.admin.ResignationRequest;
import com.nifs.backend.repository.admin.ContractExRepository;
import com.nifs.backend.service.admin.IContractExService;
import com.nifs.backend.service.admin.IEmployeeMasterService;
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
public class ContractExService implements IContractExService {
    @Autowired
    private ContractExRepository contractExRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IEmployeeMasterService employeeMasterService;
    @Autowired
    private EmailService emailService;
    @Override
    public ResponseEntity<?> createNewContractExtension(ContractExtensionDTO data) throws MessagingException {
        log.info("Data from the client" + data.getDocumentNo());

        if(contractExRepository.findByDocumentNoEquals(data.getDocumentNo()) == null){

           ContractExtension contractExtension = ContractExtension
                   .builder()
                   .documentNo(data.getDocumentNo())
                   .designationId(data.getDesignationId())
                   .hod(data.getHod())
                   .date(data.getDate())
                   .epfNo(data.getEpfNo())
                   .remark(data.getRemark())
                   .divisionId(data.getDivisionId())
                   .createdBy(data.getEpfNo())
                   .createdOn(new Date())
                   .hodApproved(data.getHodApproved())
                   .dirApproved(data.getDirApproved())
                   .build();

           ContractExtension created = contractExRepository.save(contractExtension);
           String hodEmail = employeeMasterService.getGsuitEmailById(Integer.parseInt(data.getHod()));
           String msgBody = emailService.HODRequestMessage("Contract Extension", data.getEpfNo(), data.getDivisionId(), "contract-extension");

            //send email to hod
            emailService.sendEmail(hodEmail, "Annual Increment Request", msgBody);
           return ResponseEntity.ok(created);
        }

        return null;
    }

    @Override
    public Object getAllContractExtension(String division) {
        try{
            List<ContractExtension> contractExtensions = new ArrayList<ContractExtension>();

            if (division == null) {
                contractExtensions = contractExRepository.findAllByOrderByCreatedOnDesc();

            }
            else {
                contractExtensions = contractExRepository.findByDivisionIdOrderByCreatedOnDesc(division);

            }
            return contractExtensions.stream()
                    .map(contract -> modelMapper.map(contract, ResignationRequestDTO.class))
                    .collect(Collectors.toList());
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public Object putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("HOD Contract extension : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();

            resId.forEach(id -> {
                contractExRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);

                // get user from request id
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                // get email from epf no
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });

            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Contract Extension Request", "APPROVED", "HOD " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Contract Extension Request", "NOT APPROVED","HOD " + user);

            }
            return true;



        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    private int getUserIDByRequestId(String id) {
        ContractExtension request = contractExRepository.findByDocumentNoEquals(id);
        return request.getEpfNo();
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Contract extension : requested");
            List<Map<String ,String>> emailList = new ArrayList<>();

            resId.forEach(id -> {
                contractExRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
                // get epf no from request id
                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });
            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Contract Extension Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Contract Extension Request", "NOT APPROVED","Director/secretary " + user);

            }
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
