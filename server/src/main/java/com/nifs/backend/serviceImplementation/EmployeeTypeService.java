package com.nifs.backend.serviceImplementation;

import com.nifs.backend.repository.LocationRepository;
import com.nifs.backend.model.Locations;
import com.nifs.backend.dto.EmployeeTypeDTO;
import com.nifs.backend.model.EmployeeTypeMaster;
import com.nifs.backend.repository.EmployeeTypeRepository;
import com.nifs.backend.service.EmployeeTypeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Service
public class EmployeeTypeService implements EmployeeTypeServiceInterface {

    @Autowired
    private EmployeeTypeRepository empTypeRepo;
    @Autowired
    private LocationRepository locRepo;

    //    get all types
    public List<EmployeeTypeDTO> getAllTypes() {

        List<EmployeeTypeMaster> em = empTypeRepo.findAll();
        List<EmployeeTypeDTO> dto = new ArrayList<EmployeeTypeDTO>();
        for (EmployeeTypeMaster d : em) {
            EmployeeTypeDTO DTOSingle = new EmployeeTypeDTO(d.getEmpTypeId(), d.getTypeName(), d.getLocationId().getLocationName());
            dto.add(DTOSingle);
        }
        return dto;

    }


//    create new employee type
    public Boolean createEmpType(EmployeeTypeDTO e) {

        if (empTypeRepo.returnType(e.getEmpTypeId()) == null) {

            Date d = new Date();
            Locations l = locRepo.getLocation(e.getLocationId());
            EmployeeTypeMaster etMaster = new EmployeeTypeMaster(e.getEmpTypeId(), e.getTypeName(), d, l);

            empTypeRepo.save(etMaster);
            return true;


        }
        return false;

    }
    //return new id
    public String returnNewId() {
        try {
            String lastId = empTypeRepo.returnLastId();
            if (lastId == null) {
                return "EPT1001";
            }
            else {
                String idText = lastId.replaceAll("[^A-Za-z]", "");
                int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

                idNum = idNum + 1;

                return idText + idNum;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request Cannot be completed";
        }
    }

//    get emp type by location id
    public List<EmployeeTypeDTO> GetEmpTypeByLocationId(String locID) {

        if (locRepo.getLocation(locID) != null) {

            List<EmployeeTypeMaster> em = empTypeRepo.findEmpTypeByLocationId(locID);
            List<EmployeeTypeDTO> dto = new ArrayList<EmployeeTypeDTO>();
            for (EmployeeTypeMaster d : em) {
                EmployeeTypeDTO DTOSingle = new EmployeeTypeDTO(d.getEmpTypeId(), d.getTypeName(), d.getLocationId().getLocationId());
                dto.add(DTOSingle);
            }
            return dto;

        }
            return null;

    }



//    update employee type
    public Boolean updateEmployeeType(EmployeeTypeDTO data, String type_id) {

            if (empTypeRepo.returnType(type_id) != null) {

                Date d = new Date();

                empTypeRepo.updateEmployeeType(data.getTypeName(), d, type_id);
                return true;

            }

            return false;


    }

//    delete employee type
    public Boolean deleteEmployeeType(String id) {

        if (empTypeRepo.returnType(id) != null) {
            empTypeRepo.deleteEmployeeType(id);
            return true;
        }
        return false;
    }

}
