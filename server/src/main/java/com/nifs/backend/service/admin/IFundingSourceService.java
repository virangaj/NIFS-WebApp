package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.FundingSourceDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IFundingSourceService {
    boolean createNewFundingSource(FundingSourceDTO data, String user);

    List<FundingSourceDTO> getAll();

    boolean updateFundingSource(FundingSourceDTO data, String id, String user);
}
