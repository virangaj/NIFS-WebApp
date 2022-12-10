package com.nifs.backend.Admin.OtherData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OtherDataService {

    @Autowired
    private DistrictRepository districtRepo;

    @Autowired
    private ProvinceRepository provinceRepo;

//    return all districts
    public List<District> returnAllDistricts() {
        return districtRepo.findAll();
    }

    public List<Province> returnAllProvinces() {
        return provinceRepo.findAll();
    }

//    add new province
    public Province addProvince(Province pData) {
        return provinceRepo.save(pData);
    }


    //    add new district
    public District addDistrict(District dData) {
        return districtRepo.save(dData);
    }
}
