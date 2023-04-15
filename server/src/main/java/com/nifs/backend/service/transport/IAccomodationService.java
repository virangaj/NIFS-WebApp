package com.nifs.backend.service.transport;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.AccomodationDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IAccomodationService {

    AccomodationDTO createNewAccomodationRequest(AccomodationDTO data);

    List<AccomodationDTO> getAllAccomodationRequests(String division);

    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
