package com.nifs.backend.service.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.GatePassDTO;
import com.nifs.backend.dto.procument.QuotationRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IQuotationRequestService {

    QuotationRequestDTO createNewQuotationRequest(QuotationRequestDTO data);

    List<QuotationRequestDTO> getAllQuotationRequests(String division);


    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
