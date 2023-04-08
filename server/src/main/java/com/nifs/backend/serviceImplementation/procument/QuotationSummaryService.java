package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import com.nifs.backend.model.procument.QuotationSummary;
import com.nifs.backend.repository.procument.QuotationSummaryRepository;
import com.nifs.backend.service.procument.IQuotationSummaryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class QuotationSummaryService implements IQuotationSummaryService {


    final
    QuotationSummaryRepository quotationSummaryRepository;

    public QuotationSummaryService(QuotationSummaryRepository quotationSummaryRepository) {
        this.quotationSummaryRepository = quotationSummaryRepository;
    }

    @Override
    public ResponseEntity<?> createNewQuotationSummary(QuotationSummaryDTO data) {

        log.info("Data from the client " + data.getDocumentNo());

        if(quotationSummaryRepository.findByDocumentNoEquals(data.getDocumentNo())== null){


            QuotationSummary quotationSummary = QuotationSummary
                    .builder()
                    .documentNo(data.getDocumentNo())
                    .epfNo(data.getEpfNo())
                    .designationId(data.getDesignationId())
                    .divisionId(data.getDivisionId())
                    .hod(data.getHod())
                    .fundType(data.getFundType())
                    .date(data.getDate())
                    .quotationRequestNo(data.getQuotationRequestNo())
                    .fileNo(data.getFileNo())
                    .srnNo(data.getSrnNo())
                    .value(data.getValue())
                    .fund(data.getFund())
                    .project(data.getProject())
                    .remark(data.getRemark())
                    .createdBy(data.getId())
                    .createdOn(new Date())
                    .build();

            QuotationSummary created = quotationSummaryRepository.save(quotationSummary);

            return ResponseEntity.ok(created);

        }

        return null;
    }
}
