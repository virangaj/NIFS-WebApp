package com.nifs.backend.serviceImplementation.procument;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.procument.QuotationRequestDTO;
import com.nifs.backend.dto.procument.QuotationSummaryDTO;
import com.nifs.backend.model.procument.QuotationRequest;
import com.nifs.backend.model.procument.QuotationSummary;
import com.nifs.backend.repository.procument.QuotationSummaryRepository;
import com.nifs.backend.service.procument.IQuotationSummaryService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class QuotationSummaryService implements IQuotationSummaryService {


    final
    QuotationSummaryRepository quotationSummaryRepository;

    final
    ModelMapper modelMapper;

    public QuotationSummaryService(QuotationSummaryRepository quotationSummaryRepository, ModelMapper modelMapper) {
        this.quotationSummaryRepository = quotationSummaryRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public QuotationSummaryDTO createNewQuotationSummary(QuotationSummaryDTO data) {

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
                    .createdBy(Integer.valueOf(data.getEpfNo()))
                    .hodApproved(data.getHodApproved())
                    .createdOn(new Date())
                    .build();

            quotationSummaryRepository.save(quotationSummary);

            return modelMapper.map(quotationSummary,QuotationSummaryDTO.class);

        }

        return null;
    }

    @Override
    public List<QuotationSummaryDTO> getAllQuotationSummaries(String division) {
        try {
            List<QuotationSummary> quotationSummaries = new ArrayList<>();

            if (division == null){
                quotationSummaries = quotationSummaryRepository.findAllByOrderByCreatedOnDesc();
            }else {
                quotationSummaries = quotationSummaryRepository.findByDivisionIdOrderByCreatedOnDesc(division);
            }
            return quotationSummaries.stream()
                    .map(request -> modelMapper.map(request, QuotationSummaryDTO.class))
                    .collect(Collectors.toList());
        }catch (Exception e){
            log.info(e.toString());
            return null;
        }
    }

    @Override
    public boolean putHodApproval(RequestStatus approval, List<String> resId, String user) {
        try{
            log.info("HOD Summary Request : requested");
            resId.forEach(id->{
                quotationSummaryRepository.updateHodApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }

    @Override
    public Object putDirectorApproval(RequestStatus approval, List<String> resId, String user) {
        try {
            log.info("Director Quotation Summary : requested");
            resId.forEach(id->{
                quotationSummaryRepository.updateDirApproveAndModifiedFields(approval,user,new Date(),id);
            });
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
