package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.model.admin.ResignationRequest;
import com.nifs.backend.repository.admin.ResignationReqRepository;
import com.nifs.backend.service.admin.IResignationReqService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ResignationReqService implements IResignationReqService {


    @Autowired
    ResignationReqRepository resignationReqRepository;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public ResignationRequestDTO createResignationRequest(ResignationRequestDTO data) {



        ResignationRequest employee = modelMapper.map(data, ResignationRequest.class);

        employee.setCreatedOn(new Date());
        employee.setCreatedBy((data.getEpfNo()));
        ResignationRequest resignationRequest = resignationReqRepository.save(employee);
        return modelMapper.map(resignationRequest, ResignationRequestDTO.class);
    }
}
