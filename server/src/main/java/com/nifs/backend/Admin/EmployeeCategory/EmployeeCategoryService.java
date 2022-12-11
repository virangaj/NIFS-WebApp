package com.nifs.backend.Admin.EmployeeCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeCategoryService {

    @Autowired

    private EmployeeCategoryRepository empCatRepo;

    //return all category
    public List<EmployeeCategory> getAll() {
        return empCatRepo.findAll();
    }

    //    add new employee category
    public Boolean createNewCategory(EmployeeCategory empCatData) {
        if(empCatRepo.returnEmployeeCategory(empCatData.getEmployeeCategoryId()) == null){
            Date d = new Date();
            empCatData.setDateCreated(d);
            empCatRepo.save(empCatData);
            return true;
        }
        else{
            return false;
        }
    }

//    return new employee category id
    public String returnNewEmpCatId() {
        String lastId = empCatRepo.returnLastId();

        if(lastId == null){
            return "EPCT1001";
        }
        else{
            String idText = lastId.replaceAll("[^A-Za-z]", "");
            int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));
            idNum = idNum + 1;
            return idText + idNum;
        }
    }

//    return empCat by id
    public Optional<EmployeeCategory> returnEmpCat(String empCatId) {
        return empCatRepo.findById(empCatId);
    }

    public Boolean updateEmployeeCategory(EmployeeCategory empCatData, String empCatId) {
        if(empCatRepo.returnEmployeeCategory(empCatId) != null){
            Date d = new Date();
            empCatRepo.UpdateEmployeeCategory(empCatData.getDescription(), empCatData.getOtRate(), d, empCatId);
            return true;
        }
        return false;
    }
}
