package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.dto.admin.FundingSourceDTO;
import com.nifs.backend.model.admin.FundingSources;
import com.nifs.backend.model.sedu.VenueMaster;
import com.nifs.backend.repository.admin.FundingSourceRepository;
import com.nifs.backend.service.admin.IFundingSourceService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class FundingSourceService implements IFundingSourceService {

    @Autowired
    private FundingSourceRepository fundingSourceRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private LocationService locationService;

    //create a new funding source
    @Override
    public boolean createNewFundingSource(FundingSourceDTO data, String user) {

        try{

            FundingSources fundingSources = modelMapper.map(data, FundingSources.class);
            fundingSources.setLocationId(locationService.getLocationById(data.getLocationId()));
            fundingSources.setCreatedOn(new Date());
            fundingSources.setCreatedBy(Integer.valueOf(user));
            fundingSourceRepository.save(fundingSources);
            return true;

        }catch(Exception e) {
            log.error(e.toString());
            return false;
        }
    }

    // get all funding sources
    @Override
    public List<FundingSourceDTO> getAll() {
        List<FundingSources> fundingSourcesList = fundingSourceRepository.findAll();
        List<FundingSourceDTO> fundingSourceDTOList = new ArrayList<>();

        fundingSourcesList.forEach(f->{
            fundingSourceDTOList.add(FundingSourceDTO.builder()
                        .id(f.getId())
                        .fundingId(f.getFundingId())
                        .description(f.getDescription())
                        .name(f.getName())
                        .createdBy(f.getCreatedBy())
                        .createdOn(f.getCreatedOn())
                        .modifiedBy(f.getModifiedBy())
                        .modifiedOn(f.getModifiedOn())
                        .build());
        });

        return fundingSourceDTOList;
    }

//    update funding source
    @Override
    public boolean updateFundingSource(FundingSourceDTO data, String id, String user) {
        try {
            fundingSourceRepository.updateFundingSource(data.getName(), data.getDescription(), user, new Date(), id);
            return true;
        }catch (Exception e){
            return false;
        }

    }


}
