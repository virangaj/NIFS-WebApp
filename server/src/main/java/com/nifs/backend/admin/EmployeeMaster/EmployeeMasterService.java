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
import com.nifs.backend.admin.OtherData.District;
import com.nifs.backend.admin.OtherData.DistrictRepository;
import com.nifs.backend.admin.OtherData.Province;
import com.nifs.backend.admin.OtherData.ProvinceRepository;
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

    @Autowired
    private DistrictRepository disRepo;
    @Autowired
    private ProvinceRepository proRepo;
    public List<EmployeeMasterDTO> getAllEmployees() {
        List<EmployeeMaster> emp = empRepo.findAll();
        List<EmployeeMasterDTO> dto = new ArrayList<>();
        for (EmployeeMaster e : emp) {
            if(!e.getIsDelete()) {
                EmployeeMasterDTO single = new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvince().getProvinceName(), e.getDistrict().getDistrictName(), e.getEmpType().getTypeId(), e.getEmpCategory().getEmployeeCategoryId(), e.getDesignation().getId(), e.getDivision().getDivisionId(), e.getLocation().getLocationId());
                dto.add(single);
            }
        }
        return dto;
    }


    public List<EmployeeMasterDTO> getAllEmployeesWithoutDeleted() {
        List<EmployeeMaster> emp = empRepo.findAll();
        List<EmployeeMasterDTO> dto = new ArrayList<>();
        for (EmployeeMaster e : emp) {
            EmployeeMasterDTO single = new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvince().getProvinceName(), e.getDistrict().getDistrictName(), e.getEmpType().getTypeId(), e.getEmpCategory().getEmployeeCategoryId(), e.getDesignation().getId(), e.getDivision().getDivisionId(), e.getLocation().getLocationId());
            dto.add(single);
        }
        return dto;
    }
    public List<EmployeeMasterDTO> getAllEmployeeDataCurrentlyNotWorking() {
        List<EmployeeMaster> emp = empRepo.findAll();
        List<EmployeeMasterDTO> dto = new ArrayList<>();
        for (EmployeeMaster e : emp) {
            if(e.getIsDelete()) {
                EmployeeMasterDTO single = new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvince().getProvinceName(), e.getDistrict().getDistrictName(), e.getEmpType().getTypeId(), e.getEmpCategory().getEmployeeCategoryId(), e.getDesignation().getId(), e.getDivision().getDivisionId(), e.getLocation().getLocationId());
                dto.add(single);
            }
        }
        return dto;
    }

    public Boolean addEmployee(EmployeeMasterDTO e) {
        if (empRepo.returnEmployeeById(e.getEpfNo()) == null) {

            //get designation
            DesignationMaster d = desRepo.returnDesignation(e.getDesignation());
            //get emp category
            EmployeeCategory empCat = catRepo.returnEmployeeCategory(e.getEmpCategory());
            //get emp division
            DivisionMaster divMaster = divRepo.returnDivision(e.getDivision());
            //get emp type
            EmployeeTypeMaster empType = typeRepo.returnType(e.getEmpType());
            //get location
            Locations locData = locRepo.getLocation(e.getLocation());
            //get district
            District dData = disRepo.returnDistrictById(Integer.parseInt(e.getDistrict()));
            //get province
            Province province = proRepo.findProvinceById(Integer.parseInt(e.getProvince()));

//            EmployeeMaster employee = new EmployeeMaster(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), dData, province, empType, empCat,d, divMaster, locData);
            EmployeeMaster employeeMaster = new EmployeeMaster(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(),e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), false, dData, province, empType,empCat,d,divMaster,locData);

            empRepo.save(employeeMaster);
            return true;

        }
        return false;
    }

    public Boolean deleteEmployee(int id) {
        if (empRepo.returnEmployeeById(id) != null) {
            empRepo.updateIsDelete(true, id);
            return true;
        }
        return false;
    }

    public Boolean hardDeleteEmployee(int id) {
        if (empRepo.returnEmployeeById(id) != null) {
            empRepo.deleteEmployee(id);
            return true;
        }
        return false;
    }


}
