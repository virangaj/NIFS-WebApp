package com.nifs.backend.serviceImplementation;

import com.nifs.backend.repository.LocationRepository;
import com.nifs.backend.model.Locations;
import com.nifs.backend.dto.EmpCatDTO;
import com.nifs.backend.model.EmployeeCategory;
import com.nifs.backend.repository.EmployeeCategoryRepository;
import com.nifs.backend.service.EmployeeCatServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeCategoryService implements EmployeeCatServiceInterface {

    @Autowired
    private EmployeeCategoryRepository empCatRepo;

    @Autowired
    private LocationRepository locRepo;

    //return all category
    public List<EmpCatDTO> getAll() {

        try {
            List<EmployeeCategory> empCatData = empCatRepo.findAll();
            List<EmpCatDTO> empDTO = new ArrayList<EmpCatDTO>();
            for (EmployeeCategory emp : empCatData) {
                EmpCatDTO dtoSingle = new EmpCatDTO(emp.getEmpCatId(), emp.getDescription(), Float.toString(emp.getOtRate()), emp.getLocationId().getLocationName());
                empDTO.add(dtoSingle);
            }
            return empDTO;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }




    }

    //create new category
    public Boolean createNewCategory(EmpCatDTO e) {
        try {
            if (empCatRepo.returnEmployeeCategory(e.getEmpCatId()) == null) {

                Date d = new Date();
                Locations l = locRepo.getLocation(e.getLocationId());

                EmployeeCategory empCat = new EmployeeCategory(e.getEmpCatId(), e.getDescription(), Float.parseFloat(e.getOtRate()), d, l);

                empCatRepo.save(empCat);
                return true;

            }
            else {
                return false;
            }
        } catch (Exception err) {
            System.out.println(err.toString());
            return false;
        }
    }

//    return new employee category id
    public String returnNewEmpCatId() {
        try {
            String lastId = empCatRepo.returnLastId();

            if (lastId == null) {
                return "EPCT1001";
            }
            else {
                String idText = lastId.replaceAll("[^A-Za-z]", "");
                int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));
                idNum = idNum + 1;
                return idText + idNum;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request cannot be completed";
        }
    }

//    return empCat by id
    public Optional<EmployeeCategory> returnEmpCat(String empCatId) {
        return empCatRepo.findById(empCatId);
    }

    //update employee category
    public Boolean updateEmployeeCategory(EmpCatDTO empCatData, String empCatId) {
        try {
            if (empCatRepo.returnEmployeeCategory(empCatId) != null) {

                Date d = new Date();
                empCatRepo.UpdateEmployeeCategory(empCatData.getDescription(), Float.parseFloat(empCatData.getOtRate()), d, empCatId);
                return true;

            }
            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    //delete employee category
    public Boolean deleteEmployeeCategory(String empCatId) {
        try {
            if (empCatRepo.returnEmployeeCategory(empCatId) != null) {

                empCatRepo.deleteEmployeeCategory(empCatId);
                return true;

            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

//get category by location id
    public List<EmpCatDTO> getCategoryByLocationId(String locId) {
        try {
            if (locRepo.getLocation(locId) != null) {

                List<EmployeeCategory> empCatData = empCatRepo.findCategoryByLocationId(locId);
                List<EmpCatDTO> empDTO = new ArrayList<EmpCatDTO>();
                for (EmployeeCategory emp : empCatData) {
                    EmpCatDTO dtoSingle = new EmpCatDTO(emp.getEmpCatId(), emp.getDescription(), Float.toString(emp.getOtRate()), emp.getLocationId().getLocationId());
                    empDTO.add(dtoSingle);
                }
                return empDTO;


            }
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
     }
}
