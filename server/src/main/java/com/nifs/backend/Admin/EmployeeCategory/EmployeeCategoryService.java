package com.nifs.backend.Admin.EmployeeCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

//    return empcat by id
    public Optional<EmployeeCategory> returnEmpCat(String empcatId) {
        return empCatRepo.findById(empcatId);
    }
}
