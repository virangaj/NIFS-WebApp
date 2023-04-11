package com.nifs.backend.service.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.ResignationRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IResignationReqService {
    ResignationRequestDTO createResignationRequest(ResignationRequestDTO data);

    List<ResignationRequestDTO> getAllResignationRequests(String division);

    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);


}
