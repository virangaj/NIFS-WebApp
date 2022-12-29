package com.nifs.backend.admin.OtherData;

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
    List<District> returnAllDistricts(){
        return dataService.returnAllDistricts();
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
    List<Province> returnAllProvinces() {
        return dataService.returnAllProvinces();
    }


    //    add new province
    @PostMapping("/province")
    Boolean addNewProvince(@RequestBody Province pData) {
        return dataService.addProvince(pData);
    }



}