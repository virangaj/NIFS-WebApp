package com.nifs.backend.controller;

import com.nifs.backend.dto.DistrictDTO;
import com.nifs.backend.dto.ProvinceDTO;
import com.nifs.backend.model.Province;
import com.nifs.backend.model.Religions;
import com.nifs.backend.model.District;
import com.nifs.backend.service.OtherDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/otherdata")
@CrossOrigin
public class OtherDataController {

    @Autowired
    private OtherDataService dataService;

//    return all districts
    @GetMapping("/district")
    List<DistrictDTO> returnAllDistricts(){
        return dataService.returnAllDistricts();
    }

    @GetMapping("/district/province/{pId}")
    List<DistrictDTO> returnDistrictsByProvinceId(@PathVariable int pId){
        return dataService.returnDistrictsByProvinceId(pId);
    }

    //    add new district
    @PostMapping("/district/{provinceId}")
    Boolean addNewDistrict(@RequestBody District dData, @PathVariable int provinceId) {
        return dataService.addDistrict(dData, provinceId);
    }
//    /edit district

    @PutMapping("/district/edit/{dId}")
    Boolean editDistrict(@PathVariable int dId, @RequestBody District dData){
        return dataService.editDistrict(dId, dData);
    }

    //    return all provinces
    @GetMapping("/province")
    List<ProvinceDTO> returnAllProvinces() {
        return dataService.returnAllProvinces();
    }


    //    add new province
    @PostMapping("/province")
    Boolean addNewProvince(@RequestBody Province pData) {
        return dataService.addProvince(pData);
    }


    @GetMapping("/religions")
    List<Religions> returnAllReligions(){
        return dataService.returnAllReligions();
    }

    @PostMapping("/religions")
    boolean addNewReligions(@RequestBody Religions relData){
        return dataService.addNewReligions(relData);
    }
}
