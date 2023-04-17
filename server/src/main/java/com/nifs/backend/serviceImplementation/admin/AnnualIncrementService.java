package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.AccomodationDTO;
import com.nifs.backend.dto.admin.AnnualIncrementDTO;
import com.nifs.backend.model.admin.Accomodation;
import com.nifs.backend.model.admin.AnnualIncrement;
import com.nifs.backend.repository.admin.AnnualIncrementRepository;
import com.nifs.backend.service.admin.IAnnualIncrementService;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import com.nifs.backend.service.admin.IUserService;
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
public class AnnualIncrementService implements IAnnualIncrementService {

    final
    AnnualIncrementRepository annualIncrementRepository;

    final
    ModelMapper modelMapper;
    @Autowired
    private EmailService emailService;

    @Autowired
    private IEmployeeMasterService employeeMasterService;

    public AnnualIncrementService(AnnualIncrementRepository annualIncrementRepository, ModelMapper modelMapper) {
        this.annualIncrementRepository = annualIncrementRepository;
        this.modelMapper = modelMapper;
    }



    @Override
    public AnnualIncrementDTO createNewAnnualIncrement(AnnualIncrementDTO data) throws MessagingException {
        log.info("Data from the Client " + data.getDocumentNo());

        if(annualIncrementRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            AnnualIncrement annualIncrement = AnnualIncrement
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .remark(data.getRemark())
                    .date(data.getDate())
                    .noOfLeaves(data.getNoOfLeaves())
                    .salaryScale(data.getSalaryScale())
                    .presentSalary(data.getPresentSalary())
                    .newSalary(data.getNewSalary())
                    .createdBy(data.getEpfNo())
                    .createdOn(new Date())
                    .dirApproved(data.getDirApproved())
                    .hodApproved(data.getHodApproved())
                    .dirApproved(data.getDirApproved())
                    .build();

            annualIncrementRepository.save(annualIncrement);

            String hodEmail = employeeMasterService.getGsuitEmailById(data.getHod());

            String msgBody = emailService.HODRequestMessage("Annual Increment Request", data.getEpfNo(), data.getDivisionId(), "annual-increment-request");

            //send email to hod
            emailService.sendEmail(hodEmail, "Annual Increment Request", msgBody);

            return modelMapper.map(annualIncrement,AnnualIncrementDTO.class);

        }

        return null;
    }

    @Override
    public List<AnnualIncrementDTO> getAllAnnualIncrementRequests(String division) {
        try {
            List<AnnualIncrement> annualIncrements = new ArrayList<>();

            if (division == null){
                annualIncrements = annualIncrementRepository.findAllByOrderByCreatedOnDesc();
            }else {
                annualIncrements = annualIncrementRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return annualIncrements.stream()
                    .map(request -> modelMapper.map(request, AnnualIncrementDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("Transport Travel Request : requested");


            List<Map<String ,String>> emailList = new ArrayList<>();


            resId.forEach(id->{
                annualIncrementRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
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
                String msgBody = emailService.DirectorRequestMessage("Annual Increment Request", "annual-increment-request");

                emailService.sendEmail(dirEmail, "Annual Increment Request", msgBody);

                emailService.sendEmail(secEmail, "Annual Increment Request", msgBody);

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Annual Increment Request", "APPROVED", "HOD " + user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Annual Increment Request", "NOT APPROVED", "HOD " +user);

            }




            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            List<Map<String ,String>> emailList = new ArrayList<>();
            log.info("Director Travel Request : requested");
            resId.forEach(id->{
                annualIncrementRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);

                int epfNo = getUserIDByRequestId(id);
                Map<String, String> map = new LinkedHashMap<String, String>();
                map.put("email", employeeMasterService.getGsuitEmailById(epfNo));
                map.put("id", id);

                emailList.add(map);
            });

            if(approval == RequestStatus.APPROVED){

                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Annual Increment Request", "APPROVED", "Director/secretary " +user);
            }else{
                emailService.sendBulkEmailToRequesterAfterHOD(emailList,"Annual Increment Request", "NOT APPROVED","Director/secretary " + user);

            }



            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    public int getUserIDByRequestId(String id){
        AnnualIncrement request = annualIncrementRepository.findByDocumentNoEquals(id);
        return request.getEpfNo();
    }

}
