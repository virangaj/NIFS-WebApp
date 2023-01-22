package com.nifs.backend.service;

import com.nifs.backend.dto.DistrictDTO;
import com.nifs.backend.dto.ProvinceDTO;
import com.nifs.backend.model.District;
import com.nifs.backend.model.Province;
import com.nifs.backend.model.Religions;

import java.util.List;

public interface IOtherDataService {
    // return all districts
    List<DistrictDTO> returnAllDistricts();

    //return districts bt province id
    List<DistrictDTO> returnDistrictsByProvinceId(int pId);

    //return district by district id
    District returnDistrictById(int id);

    //    add new district
    Boolean addDistrict(District dData, int provinceId);

    //    edit district
    Boolean editDistrict(int dId, District dData);

    //    return all provinces
    List<ProvinceDTO> returnAllProvinces();

    //    add new province
    Boolean addProvince(Province pData);

    //return province by province id
    Province findProvinceById(int id);

    //return all religions
    List<Religions> returnAllReligions();

    //save religion
    boolean addNewReligions(Religions relData);
}
