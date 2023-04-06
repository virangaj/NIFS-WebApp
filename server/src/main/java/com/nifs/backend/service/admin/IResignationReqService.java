package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.ResignationRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IResignationReqService {
    ResignationRequestDTO createResignationRequest(ResignationRequestDTO data);

    List<ResignationRequestDTO> getAllResignationRequests();
}
