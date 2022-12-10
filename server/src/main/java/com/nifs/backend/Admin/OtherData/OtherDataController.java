package com.nifs.backend.Admin.OtherData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/otherdata")
public class OtherDataController {

    @Autowired
    private OtherDataService dataService;

//    return all districts
    @GetMapping("/district")
    List<District> returnAllDistricts(){
        return dataService.returnAllDistricts();
    }

    //    add new district
    @PostMapping("/district")
    District addNewDistrict(@RequestBody District dData){
        return dataService.addDistrict(dData);
    }
//    return all provinces
    @GetMapping("/province")
    List<Province> returnAllProvinces(){
        return dataService.returnAllProvinces();
    }


//    add new province
    @PostMapping("/province")
    Province addNewProvince(@RequestBody Province pData){
        return dataService.addProvince(pData);
    }
}
