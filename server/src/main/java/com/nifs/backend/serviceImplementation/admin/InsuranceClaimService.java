package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.AccomodationDTO;
import com.nifs.backend.dto.admin.InsuranceClaimDTO;
import com.nifs.backend.model.admin.Accomodation;
import com.nifs.backend.model.admin.InsuranceClaim;
import com.nifs.backend.repository.admin.InsuranceClaimRepository;
import com.nifs.backend.service.admin.IInsuranceClaimService;
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
public class InsuranceClaimService implements IInsuranceClaimService {

    final
    InsuranceClaimRepository insuranceClaimRepository;

    final
    ModelMapper modelMapper;

    public InsuranceClaimService(InsuranceClaimRepository insuranceClaimRepository, ModelMapper modelMapper) {
        this.insuranceClaimRepository = insuranceClaimRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public InsuranceClaimDTO createNewInsuranceClaimRequest(InsuranceClaimDTO data) {


        log.info("Data from the Client " + data.getDocumentNo());

        if(insuranceClaimRepository.findByDocumentNoEquals(data.getDocumentNo())==null){
            InsuranceClaim insuranceClaim = InsuranceClaim
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .remark(data.getRemark())
                    .claimPaidDate(data.getClaimPaidDate())
                    .spectacleClaimDate(data.getSpectacleClaimDate())
                    .noOfClaims(data.getNoOfClaims())
                    .claimAmount(data.getClaimAmount())
                    .totalBillAmount(data.getTotalBillAmount())
                    .paidClaimAmount(data.getPaidClaimAmount())
                    .notPaidClaimAmount(data.getNotPaidClaimAmount())
                    .createdBy(data.getEpfNo())
                    .createdOn(new Date())
                    .dirApproved(data.getDirApproved())
                    .hodApproved(data.getHodApproved())
                    .dirApproved(data.getDirApproved())
                    .build();

            insuranceClaimRepository.save(insuranceClaim);

            return modelMapper.map(insuranceClaim,InsuranceClaimDTO.class);
        }

        return null;
    }

    @Override
    public List<InsuranceClaimDTO> getAllInsuranceClaimRequests(String division) {
        try {
            List<InsuranceClaim> insuranceClaims = new ArrayList<>();

            if (division == null){
                insuranceClaims = insuranceClaimRepository.findAllByOrderByCreatedOnDesc();
            }else {
                insuranceClaims = insuranceClaimRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return insuranceClaims.stream()
                    .map(request -> modelMapper.map(request, InsuranceClaimDTO.class))
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
            resId.forEach(id->{
                insuranceClaimRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Travel Request : requested");
            resId.forEach(id->{
                insuranceClaimRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
