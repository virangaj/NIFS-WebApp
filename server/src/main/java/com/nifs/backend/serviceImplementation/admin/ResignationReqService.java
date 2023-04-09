package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.model.admin.ResignationRequest;
import com.nifs.backend.repository.admin.ResignationReqRepository;
import com.nifs.backend.service.admin.IResignationReqService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ResignationReqService implements IResignationReqService {


    @Autowired
    ResignationReqRepository resignationReqRepository;

    @Autowired
    private ModelMapper modelMapper;

    //add new resignation request
    @Override
    public ResignationRequestDTO createResignationRequest(ResignationRequestDTO data) {

        ResignationRequest employee = modelMapper.map(data, ResignationRequest.class);

        employee.setCreatedOn(new Date());
        employee.setCreatedBy((data.getEpfNo()));
        ResignationRequest resignationRequest = resignationReqRepository.save(employee);
        return modelMapper.map(resignationRequest, ResignationRequestDTO.class);
    }

    //get all resignation request
    @Override
    public List<ResignationRequestDTO> getAllResignationRequests(String division) {

        try{
            List<ResignationRequest> resignationRequests = new ArrayList<ResignationRequest>();

            if (division == null) {
                resignationRequests = resignationReqRepository.findAllByOrderByCreatedOnDesc();

            }
            else {
                resignationRequests = resignationReqRepository.findByDivisionIdOrderByCreatedOnDesc(division);

            }
            return resignationRequests.stream()
                    .map(employee -> modelMapper.map(employee, ResignationRequestDTO.class))
                    .collect(Collectors.toList());
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

    // hod approval
    @Override
    public boolean putHodApproval(boolean approval, List<String> resId, String user) {
        try {
            log.info("HOD Resignation Request : requested");
            resId.forEach(id -> {
                resignationReqRepository.updateHodApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    // director approval
    @Override
    public Object putDirectorApproval(boolean approval, List<String> resId, String user) {
        try {
            log.info("Director Resignation Request : requested");
            resId.forEach(id -> {
                resignationReqRepository.updateDirApproveAndModifiedFields(approval, user, new Date(), id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }




}
