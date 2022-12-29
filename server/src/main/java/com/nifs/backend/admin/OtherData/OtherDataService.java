package com.nifs.backend.admin.OtherData;

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
    public Boolean addProvince(Province pData) {

        if(provinceRepo.returnProvince(pData.getProvinceName()) == null){
            provinceRepo.save(pData);
            return true;
        }
        else{
            return false;
        }

    }


    //    add new district
    public Boolean addDistrict(District dData, int provinceId) {
        Province province = provinceRepo.findProvinceById(provinceId);
        if(districtRepo.returnDistrict(dData.getDistrictName()) == null){
            dData.setProvince(province);
            districtRepo.save(dData);
            return true;
        }
        else{
            return false;
        }
    }

//    edit district
    public Boolean editDistrict(int dId, District dData) {

        if(districtRepo.returnDistrictById(dId) != null){
            districtRepo.updateDistrictNameByDistrictIdEquals(dData.getDistrictName(), dId);
            return true;
        }
        else {
            return null;
        }
    }
}
