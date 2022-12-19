package com.nifs.backend.Admin.EmployeeType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class EmployeeTypeService {

    @Autowired
    private EmployeeTypeRepository empTypeRepo;

//    get all types
    public List<EmployeeTypeMaster> getAllTypes() {
        return empTypeRepo.findAll();
    }


//    create new employee type
    public Boolean createEmpType(EmployeeTypeMaster empTypeData) {
        if(empTypeRepo.returnType(empTypeData.getTypeId()) == null ){
            Date d = new Date();
            empTypeData.setDateCreated(d);
            empTypeRepo.save(empTypeData);
            return true;
        }
        return false;
    }
}
