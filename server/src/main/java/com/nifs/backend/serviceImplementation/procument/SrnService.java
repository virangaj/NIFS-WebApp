package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import com.nifs.backend.dto.procument.SrnDTO;
import com.nifs.backend.model.procument.QuotationSummary;
import com.nifs.backend.model.procument.Srn;
import com.nifs.backend.repository.procument.SrnRepository;
import com.nifs.backend.service.procument.ISrnService;
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
public class SrnService implements ISrnService {


    final
    SrnRepository srnRepository;

    final
    ModelMapper modelMapper;

    public SrnService(SrnRepository srnRepository, ModelMapper modelMapper) {
        this.srnRepository = srnRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public SrnDTO createNewSrn(SrnDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(srnRepository.findByDocumentNoEquals(data.getDocumentNo())==null){

            Srn srn = Srn
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .date(data.getDate())
                    .project(data.getProject())
                    .srnType(data.getSrnType())
                    .itemType(data.getItemType())
                    .purchaseType(data.getPurchaseType())
                    .estimatedValue(data.getEstimatedValue())
                    .vote(data.getVote())
                    .fundAllocationForTheProject(data.getFundAllocationForTheProject())
                    .description(data.getDescription())
                    .googleLink(data.getGoogleLink())
                    .createdBy(data.getEpfNo())
                    .hodApproved(data.getHodApproved())
                    .dirApproved(data.getDirApproved())
                    .createdOn(new Date())
                    .build();

            srnRepository.save(srn);

            return modelMapper.map(srn,SrnDTO.class);

        }
        return null;
    }

    @Override
    public List<SrnDTO> getAllSrns(String division) {
        try {
            List<Srn> srns = new ArrayList<>();

            if (division == null){
                srns = srnRepository.findAllByOrderByCreatedOnDesc();
            }else {
                srns = srnRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return srns.stream()
                    .map(request -> modelMapper.map(request, SrnDTO.class))
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
            resId.forEach(id->{
                srnRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
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
            log.info("Director Quotation Summary : requested");
            resId.forEach(id->{
                srnRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }


}
