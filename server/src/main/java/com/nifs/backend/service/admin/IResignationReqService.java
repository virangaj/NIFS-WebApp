package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.ResignationRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface IResignationReqService {
    ResignationRequestDTO createResignationRequest(ResignationRequestDTO data);
}
