package com.nifs.backend.serviceImplementation.admin;

import com.nifs.backend.common.Common;
import com.nifs.backend.model.admin.EmployeeMaster;
import com.nifs.backend.repository.admin.EmployeeMasterRepository;
import com.nifs.backend.repository.admin.LocationRepository;
import com.nifs.backend.model.admin.Locations;
import com.nifs.backend.dto.admin.DivisionMasterDTO;
import com.nifs.backend.model.admin.DivisionMaster;
import com.nifs.backend.repository.admin.DivisionMasterRepository;
import com.nifs.backend.service.admin.IDivisionMasterService;
import com.nifs.backend.service.admin.IEmployeeMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DivisionMasterService implements IDivisionMasterService {

    @Autowired
    private DivisionMasterRepository divMasterRepo;

    @Autowired
    private LocationRepository locRepo;

    @Autowired
    private EmployeeMasterRepository empRepo;

    private final Common common = new Common();

    //    get all divisions
    @Override
    public List<DivisionMasterDTO> getAll() {
        try {
            List<DivisionMaster> divData = divMasterRepo.findAll();
            List<DivisionMasterDTO> divDTO = new ArrayList<>();
            for (DivisionMaster d : divData) {
                DivisionMasterDTO dto = new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationName(), d.getHod().getEpfNo());
                divDTO.add(dto);
            }
            return divDTO;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }

    }


    //create new divisions
    @Override
    public DivisionMasterDTO createDivision(DivisionMasterDTO d) {

        if (divMasterRepo.returnDivision(d.getDivisionId()) == null) {

            Date date = new Date();
            Locations l = locRepo.getLocation(d.getLocationId());
            EmployeeMaster emp = empRepo.returnEmployeeById(100);
            DivisionMaster dm = new DivisionMaster(d.getDivisionId(), d.getName(), date, l, emp);
            divMasterRepo.save(dm);
            return d;
        }
        else {
            return null;
        }


    }

    //delete division
    @Override
    public Boolean deleteDivision(String divisionId) {
        try {
            DivisionMaster divisionMaster = divMasterRepo.returnDivision(divisionId);

            List<EmployeeMaster> empMaster = empRepo.findByDivisionId(divisionId);
            for (EmployeeMaster e : empMaster) {
                System.out.println("division " + e.getDivisionId().getDivisionId());
            }
            if (divisionMaster != null) {
                divMasterRepo.deleteById(divisionMaster.getDivisionId());
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

    // return new id
    @Override
    public String returnNewDivisionId() {
        try {
            String lastId = divMasterRepo.returnLastId();
            if (lastId == null) {
                return "DI1001";
            }
            else {
                return common.generateNewId(lastId);

            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request cannot be completed";
        }
    }


    //    update division master
    @Override
    public Boolean updateDivisionMaster(DivisionMasterDTO dmData, String dvId) {
        try {
            DivisionMaster division = divMasterRepo.returnDivision(dvId);
            if (division != null) {
                Date d = new Date();

                //check weahter hod is already  hod
                DivisionMaster divisionMaster = divMasterRepo.findByHod_EpfNoEquals(dmData.getHod());

                if(divisionMaster == null){

                    empRepo.updateRoleAndDivisionIdByEpfNoEquals("USER", division, division.getHod().getEpfNo());
                    // find the new hod by epf no
                    EmployeeMaster emp = empRepo.findByEpfNoEquals(dmData.getHod());




                    //make the employee admin and change the division
                    empRepo.updateRoleAndDivisionIdByEpfNoEquals("ADMIN", division, dmData.getHod());

                    //update the division
                    divMasterRepo.updateDivisionMaster(dmData.getName(), d, emp, dvId);
                    return true;
                }else{
                    return false;
                }


            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    // get divisions by location id
    @Override
    public List<DivisionMasterDTO> GetDivisionByLocationId(String locID) {
        try {
            if (locRepo.getLocation(locID) != null) {
                List<DivisionMaster> dm = divMasterRepo.findDivisionByLocationId(locID);
                List<DivisionMasterDTO> dDTO = new ArrayList<DivisionMasterDTO>();
                for (DivisionMaster d : dm) {
                    DivisionMasterDTO dDTOSingle = new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationId(), d.getHod().getEpfNo());
                    dDTO.add(dDTOSingle);
                }
                return dDTO;
            }
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    //get division by id
    @Override
    public DivisionMasterDTO getDivisionById(String id) {

        DivisionMaster d = divMasterRepo.returnDivision(id);
        if (d != null) {
            return new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationId(), d.getHod().getEpfNo());
        }
        return null;

    }

    @Override
    public DivisionMaster returnDivision(String id) {
        return divMasterRepo.returnDivision(id);
    }
}
