package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.dto.procument.QuotationRequestDTO;
import com.nifs.backend.model.procument.QuotationRequest;
import com.nifs.backend.repository.procument.QuotationRequestRepository;
import com.nifs.backend.service.procument.IQuotationRequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class QuotationRequestService implements IQuotationRequestService {

    final
    QuotationRequestRepository quotationRequestRepository;

    public QuotationRequestService(QuotationRequestRepository quotationRequestRepository) {
        this.quotationRequestRepository = quotationRequestRepository;
    }

    @Override
    public ResponseEntity<?> createNewQuotationRequest(QuotationRequestDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(quotationRequestRepository.findByDocumentNoEquals(data.getDocumentNo()) == null){

            QuotationRequest quotationRequest = QuotationRequest
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .date(data.getDate())
                    .project(data.getProject())
                    .fund(data.getFund())
                    .srnNo(data.getSrnNo())
                    .fileNo(data.getFileNo())
                    .validityPeriodOfTheQuotation(data.getValidityPeriodOfTheQuotation())
                    .shippingTerms(data.getShippingTerms())
                    .supplierCatergory(data.getSupplierCatergory())
                    .bidStartingDate(data.getBidStartingDate())
                    .bidClosingDate(data.getBidClosingDate())
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            QuotationRequest created = quotationRequestRepository.save(quotationRequest);

            return ResponseEntity.ok(created);

        }

        return null;
    }
}
