package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.dto.sedu.FacilityDTO;
import com.nifs.backend.model.sedu.Facility;
import com.nifs.backend.repository.sedu.FacilityRepository;
import com.nifs.backend.service.sedu.IFacilityService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FacilityService implements IFacilityService {

    @Autowired
    private FacilityRepository facRepo;
    @Autowired
    private ModelMapper modelMapper;
    //create facility
    public FacilityDTO createFacility(FacilityDTO facData, String user) {
        try {
            if (facRepo.returnFacility(facData.getFacilityId()) == null) {

                Facility facility = modelMapper.map(facData, Facility.class);

                facility.setCreatedOn(new Date());
                facility.setCreatedBy(Integer.valueOf(user));
                return modelMapper.map(facRepo.save(facility), FacilityDTO.class);

            }
            else {
                return null;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    //get all facilities
    public List<FacilityDTO> getAll() {
        try {
            List<Facility> facilityList = (List<Facility>) facRepo.findAll();

            List<FacilityDTO> facilityDTOList = new ArrayList<>();

            facilityList.forEach(facility -> {
                facilityDTOList.add(modelMapper.map(facility, FacilityDTO.class));
            });
            return facilityDTOList;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    //return new facility id
    public String returnNewFacilityId() {
        try {
            String lastId = facRepo.returnLastId();


            if (lastId == null) {
                return "VMF001";
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
//    get facility by id
    public FacilityDTO returnFacility(String facilityId) {
        try {

            return modelMapper.map(facRepo.findById(facilityId).orElse(null), FacilityDTO.class);
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public Boolean updateFacility(String facilityId, FacilityDTO facData, String user) {
        try {
            if (facRepo.returnFacility(facilityId) != null) {
                facRepo.update(facData.getName(), facilityId);
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
}
