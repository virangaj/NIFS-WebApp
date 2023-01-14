package com.nifs.backend.serviceImplementation;

import com.nifs.backend.repository.LocationRepository;
import com.nifs.backend.model.Locations;
import com.nifs.backend.dto.DesignationMasterDTO;
import com.nifs.backend.model.DesignationMaster;
import com.nifs.backend.repository.DesignationRepostory;
import com.nifs.backend.service.DesignationServiceInterface;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DesignationService implements DesignationServiceInterface {

    @Autowired
    private DesignationRepostory desRepo;

    @Autowired
    private LocationRepository locRepo;

    @Autowired
    private ModelMapper modelMapper;

    //    get all designations
    public List<DesignationMasterDTO> getAllDesignations() {
        try {
            List<DesignationMaster> dm = desRepo.findAll();
            List<DesignationMasterDTO> dDTO = new ArrayList<DesignationMasterDTO>();
            for (DesignationMaster d : dm) {
                DesignationMasterDTO dDTOSingle = new DesignationMasterDTO(d.getDesignationId(), d.getDesignationName(), d.getLocationId().getLocationName());
                dDTO.add(dDTOSingle);
            }
            return dDTO;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    // create designation
    public DesignationMaster createDesignation(DesignationMasterDTO d) {
        try {
            if (desRepo.returnDesignation(d.getDesignationId()) == null) {

                Date date = new Date();
                Locations l = locRepo.getLocation(d.getLocationId());
                DesignationMaster dm = new DesignationMaster(d.getDesignationId(), d.getDesignationName(), date, l);
                return desRepo.save(dm);
            }
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

//    delete designation
    public boolean deleteDesignation(String id) {

        try {
            if (desRepo.returnDesignation(id) != null) {
                desRepo.deleteDesignation(id);
                return true;
            }
            else{
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    // get designation by location id
    public List<DesignationMasterDTO> getDesignationByLocationId(String locId) {
        try {
            if (locRepo.getLocation(locId) != null) {
                List<DesignationMaster> dm = desRepo.findDesignatonByLocationId(locId);
                List<DesignationMasterDTO> dDTO = new ArrayList<DesignationMasterDTO>();
                for (DesignationMaster d : dm) {
                    DesignationMasterDTO dDTOSingle = new DesignationMasterDTO(d.getDesignationId(), d.getDesignationName(), d.getLocationId().getLocationId());
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

//    get new id
    public String returnNewId() {
        try {
            String lastId = desRepo.returnLastId();
            if (lastId != null) {
                String idText = lastId.replaceAll("[^A-Za-z]", "");
                int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

                idNum = idNum + 1;

                return idText + idNum;
            }
            else {
                return "ED1001";
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request Fail";
        }
    }
    //update designation
    public Boolean updateDesignation(String id, DesignationMasterDTO dto) {
        try {
            if (desRepo.returnDesignation(id) != null) {
                Date d = new Date();
                desRepo.updateDesignation(dto.getDesignationName(), d, id);
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }

    }

    //get designation by its id
    public DesignationMasterDTO returnDesignationById(String id) {
        try {
            DesignationMaster d = desRepo.returnDesignation(id);
            if (d != null) {
                return new DesignationMasterDTO(d.getDesignationId(), d.getDesignationName(), d.getLocationId().getLocationId());
            }
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }
}
