package com.nifs.backend.service.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import com.nifs.backend.dto.procument.SrnDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ISrnService {

    SrnDTO createNewSrn(SrnDTO data);

    List<SrnDTO> getAllSrns(String division);


    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
