package com.nifs.backend.admin.EmployeeCategory;

import com.nifs.backend.admin.Locations.LocationRepository;
import com.nifs.backend.admin.Locations.Locations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeCategoryService {

    @Autowired
    private EmployeeCategoryRepository empCatRepo;

    @Autowired
    private LocationRepository locRepo;
    //return all category
    public List<EmpCatDTO> getAll() {

        List<EmployeeCategory> empCatData = empCatRepo.findAll();
        List<EmpCatDTO> empDTO = new ArrayList<EmpCatDTO>();
        for(EmployeeCategory emp : empCatData){
            EmpCatDTO dtoSingle = new EmpCatDTO(emp.getEmployeeCategoryId(), emp.getDescription(), Float.toString(emp.getOtRate()), emp.getLocation().getLocationName());
            empDTO.add(dtoSingle);
        }
        return empDTO;




    }

    //    add new employee category
    public Boolean createNewCategory(EmpCatDTO e) {
        if(empCatRepo.returnEmployeeCategory(e.getEmployeeCategoryId()) == null){
            Date d = new Date();
            Locations l = locRepo.getLocation(e.getLocation());

            EmployeeCategory empCat  = new EmployeeCategory(e.getEmployeeCategoryId(), e.getDescription(), Float.parseFloat(e.getOtRate()), d, l);

            empCatRepo.save(empCat);
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

    public Boolean updateEmployeeCategory(EmpCatDTO empCatData, String empCatId) {
        if(empCatRepo.returnEmployeeCategory(empCatId) != null){
            Date d = new Date();
            empCatRepo.UpdateEmployeeCategory(empCatData.getDescription(), Float.parseFloat(empCatData.getOtRate()), d, empCatId);
            return true;
        }
        return false;
    }

    public Boolean deleteEmployeeCategory(String empCatId) {
        if(empCatRepo.returnEmployeeCategory(empCatId) != null){
            empCatRepo.deleteEmployeeCategory(empCatId);
            return true;
        }else{
            return false;
        }
    }


    public List<EmpCatDTO> getCategoryByLocationId(String locId) {
        if(locRepo.getLocation(locId) != null){
            List<EmployeeCategory> empCatData = empCatRepo.findCategoryByLocationId(locId);
            List<EmpCatDTO> empDTO = new ArrayList<EmpCatDTO>();
            for(EmployeeCategory emp : empCatData){
                EmpCatDTO dtoSingle = new EmpCatDTO(emp.getEmployeeCategoryId(), emp.getDescription(), Float.toString(emp.getOtRate()), emp.getLocation().getLocationId());
                empDTO.add(dtoSingle);
            }
            return empDTO;

        }
        return null;
     }
}
