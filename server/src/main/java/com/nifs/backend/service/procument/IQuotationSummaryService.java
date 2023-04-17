package com.nifs.backend.service.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.QuotationRequestDTO;
import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IQuotationSummaryService {

    QuotationSummaryDTO createNewQuotationSummary(QuotationSummaryDTO data) throws MessagingException;

    List<QuotationSummaryDTO> getAllQuotationSummaries(String division);


    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);

}
