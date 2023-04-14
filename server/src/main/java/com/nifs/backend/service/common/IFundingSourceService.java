package com.nifs.backend.service.common;

import com.nifs.backend.dto.common.FundingSourceDTO;
import com.nifs.backend.model.common.FundingSources;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IFundingSourceService {
    boolean createNewFundingSource(FundingSourceDTO data, String user);

    List<FundingSourceDTO> getAll();

    boolean updateFundingSource(FundingSourceDTO data, String id, String user);

    FundingSources getFundingById(String fundingId);
}
