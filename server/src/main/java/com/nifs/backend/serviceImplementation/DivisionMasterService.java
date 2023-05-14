package com.nifs.backend.serviceImplementation;

import com.nifs.backend.common.Common;
import com.nifs.backend.constant.UserRole;
import com.nifs.backend.dto.admin.DivisionMasterDTO;
import com.nifs.backend.model.admin.DivisionMaster;
import com.nifs.backend.model.admin.EmployeeMaster;
import com.nifs.backend.model.admin.Locations;
import com.nifs.backend.repository.admin.DivisionMasterRepository;
import com.nifs.backend.repository.admin.EmployeeMasterRepository;
import com.nifs.backend.repository.admin.LocationRepository;
import com.nifs.backend.repository.admin.UserRepository;
import com.nifs.backend.service.admin.IDivisionMasterService;
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

    @Autowired
    private UserRepository userRepo;

    private final Common common = new Common();

    //    get all divisions
    @Override
            List<DivisionMaster> divData = divMasterRepo.findAll();
            List<DivisionMasterDTO> divDTO = new ArrayList<>();
            for (DivisionMaster d : divData) {
                DivisionMasterDTO dto = new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationName());
            }
            return divDTO;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }

    }


    //create new divisions
    @Override
    public Boolean createDivision(DivisionMasterDTO d) {

        if (divMasterRepo.returnDivision(d.getDivisionId()) == null) {

            Date date = new Date();
            Locations l = locRepo.getLocation(d.getLocationId());
            DivisionMaster dm = new DivisionMaster(d.getDivisionId(), d.getName(), date, l);
            divMasterRepo.save(dm);
            return true;
        }
        else {
            return false;
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
            if (divMasterRepo.returnDivision(dvId) != null) {
                Date d = new Date();

                //check weahter hod is already  hod
                DivisionMaster divisionMaster = divMasterRepo.findByHod_EpfNoEquals(dmData.getHod());

                if(divisionMaster == null) {
                    // make hod as user
                    empRepo.updateRoleAndDivisionIdByEpfNoEquals("USER", division, division.getHod().getEpfNo());
                    changeRole("USER", division.getHod().getEpfNo());

                    // find the new hod by epf no
                    EmployeeMaster emp = empRepo.findByEpfNoEquals(dmData.getHod());


                    //make the employee admin and change the division
                    empRepo.updateRoleAndDivisionIdByEpfNoEquals("ADMIN", division, dmData.getHod());
                    changeRole("ADMIN", dmData.getHod());
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
                    if(d.getHod() == null){
                        dDTO.add(DivisionMasterDTO.builder().divisionId(d.getDivisionId()).name(d.getName()).locationId(d.getLocationId().getLocationName()).build());
                    }else{
                        dDTO.add(new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationName(), d.getHod().getEpfNo()));
                    }

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
            return new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationId());
        }
        return null;

    }

    @Override
    public DivisionMaster returnDivision(String id) {
        return divMasterRepo.returnDivision(id);
    }

    public void changeRole(String role, int epfNo) {
        if (role.equals("USER")) {
            userRepo.updateUserRole(UserRole.USER, epfNo);

        }
        else {
            userRepo.updateUserRole(UserRole.ADMIN, epfNo);
        }
    }
}
