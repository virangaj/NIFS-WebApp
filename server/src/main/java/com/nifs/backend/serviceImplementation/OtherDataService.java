package com.nifs.backend.serviceImplementation;

import com.nifs.backend.dto.DistrictDTO;
import com.nifs.backend.dto.ProvinceDTO;
import com.nifs.backend.model.District;
import com.nifs.backend.model.Province;
import com.nifs.backend.model.Religions;
import com.nifs.backend.repository.DistrictRepository;
import com.nifs.backend.repository.ProvinceRepository;
import com.nifs.backend.repository.ReligionRepository;
import com.nifs.backend.service.IOtherDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OtherDataService implements IOtherDataService {

    @Autowired
    private DistrictRepository districtRepo;

    @Autowired
    private ProvinceRepository provinceRepo;

    @Autowired
    private ReligionRepository relRepo;

    //    return all districts
    public List<DistrictDTO> returnAllDistricts() {
        try {
            List<District> districts = districtRepo.findAll();
            List<DistrictDTO> districtDTO = new ArrayList<>();
            for (District d : districts) {
                DistrictDTO dto = new DistrictDTO(d.getDistrictId(), d.getDistrictName());
                districtDTO.add(dto);
            }
            return districtDTO;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public List<ProvinceDTO> returnAllProvinces() {

        try {
            List<Province> provinces = provinceRepo.findAll();
            List<ProvinceDTO> provinceDTO = new ArrayList<>();
            for (Province p : provinces) {
                ProvinceDTO dto = new ProvinceDTO(p.getProvinceId(), p.getProvinceName());
                provinceDTO.add(dto);
            }
            return provinceDTO;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

//    add new province
    public Boolean addProvince(Province pData) {

        try {
            if (provinceRepo.returnProvince(pData.getProvinceName()) == null) {
                provinceRepo.save(pData);
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

    @Override
    public Province findProvinceById(int id) {
        return provinceRepo.findProvinceById(id);
    }


    //    add new district
    @Override
    public Boolean addDistrict(District dData, int provinceId) {
        try {
            Province province = provinceRepo.findProvinceById(provinceId);
            if (districtRepo.returnDistrict(dData.getDistrictName()) == null) {
                dData.setProvinceId(province);
                districtRepo.save(dData);
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

//    edit district
    @Override
    public Boolean editDistrict(int dId, District dData) {

        try {
            if (districtRepo.returnDistrictById(dId) != null) {
                districtRepo.updateDistrictNameByDistrictIdEquals(dData.getDistrictName(), dId);
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
//return Districts By Province Id
    @Override
    public List<DistrictDTO> returnDistrictsByProvinceId(int id) {
        try {
                Optional<Province> p = provinceRepo.findById(id);
            if (p.isPresent()) {
                List<District> districts = districtRepo.findDistrictByProvinceId(id);
                List<DistrictDTO> districtDTO = new ArrayList<>();
                for (District d : districts) {
                    DistrictDTO dto = new DistrictDTO(d.getDistrictId(), d.getDistrictName());
                    districtDTO.add(dto);
                }
                return districtDTO;
            }
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
}

    @Override
    public District returnDistrictById(int id) {
        return districtRepo.returnDistrictById(id);
    }

    //return all religions
    @Override
    public List<Religions> returnAllReligions() {
        try {
            return relRepo.findAll();
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    //save religion
    @Override
    public boolean addNewReligions(Religions relData) {
        try {
            if (relRepo.findByName(relData.getName()).isEmpty()) {
                relRepo.save(relData);
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }
}
