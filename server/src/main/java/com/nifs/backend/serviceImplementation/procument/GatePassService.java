package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.dto.procument.GatePassDTO;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.model.procument.GatePass;
import com.nifs.backend.repository.procument.GatePassRepository;
import com.nifs.backend.service.procument.IGatePassService;
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
public class GatePassService implements IGatePassService {

    final
    GatePassRepository gatePassRepository;

    final
    ModelMapper modelMapper;

    public GatePassService(GatePassRepository gatePassRepository, ModelMapper modelMapper) {
        this.gatePassRepository = gatePassRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public GatePassDTO createNewArticleRequest(GatePassDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(gatePassRepository.findByDocumentNoEquals(data.getDocumentNo())==null){


            GatePass gatePass = GatePass
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .locationAfterRemoval(data.getLocationAfterRemoval())
                    .purposeOfRemoval(data.getPurposeOfRemoval())
                    .dateOfRemoval(data.getDateOfRemoval())
                    .expectedReturnDate(data.getExpectedReturnDate())
                    .remark(data.getRemark())
                    .itemName(data.getItemName())
                    .itemType(data.getItemType())
                    .quantity(data.getQuantity())
                    .inventoryNumber(data.getInventoryNumber())
                    .description(data.getDescription())
                    .currentLocation(data.getCurrentLocation())
                    .officerInChargeName(data.getOfficerInChargeName())
                    .nameOfOfficerOutsideIncharge(data.getNameOfOfficerOutsideIncharge())
                    .resultOfVerificationBySecurityOfficer(data.getResultOfVerificationBySecurityOfficer())
                    .createdBy(Integer.valueOf(data.getEpfNo()))
                    .hodApproved(data.getHodApproved())
                    .createdOn(new Date())
                    .build();

            gatePassRepository.save(gatePass);

            return modelMapper.map(gatePass,GatePassDTO.class);

        }

        return null;
    }

    @Override
    public List<GatePassDTO> getAllArticleRequests(String division) {
        try {
            List<GatePass> gatePasses = new ArrayList<>();

            if (division == null){
                gatePasses = gatePassRepository.findAllByOrderByCreatedOnDesc();
            }else {
                gatePasses = gatePassRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return gatePasses.stream()
                    .map(request -> modelMapper.map(request, GatePassDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("HOD Article Request : requested");
            resId.forEach(id->{
                gatePassRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
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
            log.info("Director Article Request : requested");
            resId.forEach(id->{
                gatePassRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
