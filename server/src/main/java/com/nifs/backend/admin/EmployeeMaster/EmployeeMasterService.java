package com.nifs.backend.admin.EmployeeMaster;

import com.nifs.backend.admin.Division.DivisionMaster;
import com.nifs.backend.admin.Division.DivisionMasterRepository;
import com.nifs.backend.admin.EmployeeCategory.EmployeeCategory;
import com.nifs.backend.admin.EmployeeCategory.EmployeeCategoryRepository;
import com.nifs.backend.admin.EmployeeDesignation.DesignationMaster;
import com.nifs.backend.admin.EmployeeDesignation.DesignationRepostory;
import com.nifs.backend.admin.EmployeeType.EmployeeTypeMaster;
import com.nifs.backend.admin.EmployeeType.EmployeeTypeRepository;
import com.nifs.backend.admin.Locations.LocationRepository;
import com.nifs.backend.admin.Locations.Locations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeMasterService {

    @Autowired
    private EmployeeMasterRepository empRepo;
    @Autowired
    private EmployeeCategoryRepository catRepo;
    @Autowired
    private DesignationRepostory desRepo;
    @Autowired
    private EmployeeTypeRepository typeRepo;
    @Autowired
    private LocationRepository locRepo;
    @Autowired
    private DivisionMasterRepository divRepo;

    public List<EmployeeMasterDTO> getAllEmployees() {
        List<EmployeeMaster> emp = empRepo.findAll();
        List<EmployeeMasterDTO> dto = new ArrayList<>();
        for (EmployeeMaster e : emp) {
            EmployeeMasterDTO single = new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getEmpType().getTypeId(), e.getEmpCategory().getEmployeeCategoryId(), e.getDesignation().getId(), e.getDivision().getDivisionId(), e.getLocation().getLocationId());
            dto.add(single);
        }
        return dto;
    }

    public Boolean addEmployee(EmployeeMaster empData) {
        if (empRepo.returnEmployeeById(empData.getEpfNo()) == null) {

            //get designation
            DesignationMaster d = desRepo.returnDesignation(empData.getDesignation().getId());
            empData.setDesignation(d);
            //get emp category
            EmployeeCategory empCat = catRepo.returnEmployeeCategory(empData.getEmpCategory().getEmployeeCategoryId());
            empData.setEmpCategory(empCat);
            //get emp division
            DivisionMaster divMaster = divRepo.returnDivision(empData.getDivision().getDivisionId());
            empData.setDivision(divMaster);
            //get emp type
            EmployeeTypeMaster empType = typeRepo.returnType(empData.getEmpType().getTypeId());
            empData.setEmpType(empType);
            //get location
            Locations locData = locRepo.getLocation(empData.getLocation().getLocationId());
            empData.setLocation(locData);

            empRepo.save(empData);
            return true;

        }
        return false;
    }

    public Boolean deleteEmployee(int id) {
        if (empRepo.returnEmployeeById(id) != null) {
            empRepo.deleteEmployee(id);
            return true;
        }
        return false;
    }
}
