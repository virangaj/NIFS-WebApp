package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.model.admin.ResignationRequest;
import com.nifs.backend.repository.admin.ResignationReqRepository;
import com.nifs.backend.service.admin.IResignationReqService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
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
    public List<ResignationRequestDTO> getAllResignationRequests() {
        List<ResignationRequest> resignationRequests = resignationReqRepository.findAll();
        return resignationRequests.stream()
                .map(employee -> modelMapper.map(employee, ResignationRequestDTO.class))
                .collect(Collectors.toList());
    }


}
