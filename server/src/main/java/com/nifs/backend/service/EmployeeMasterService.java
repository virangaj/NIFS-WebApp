package com.nifs.backend.service;

import com.nifs.backend.dto.EmployeeMasterDTO;
import com.nifs.backend.model.*;
import com.nifs.backend.repository.*;
import com.nifs.backend.model.EmployeeTypeMaster;
import com.nifs.backend.repository.EmployeeTypeRepository;
import com.nifs.backend.repository.LocationRepository;
import com.nifs.backend.model.Locations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeMasterService implements EmployeeMasterServiceInterface{

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

    //get all employees
    public List<EmployeeMasterDTO> getAllEmployees() {
        List<EmployeeMaster> emp = empRepo.findAll();
        List<EmployeeMasterDTO> dto = new ArrayList<>();
        for (EmployeeMaster e : emp) {
            if(!e.getIsDelete()) {
                EmployeeMasterDTO single = new  EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(),e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvince().getProvinceName(), e.getDistrict().getDistrictName(), e.getEmpTypeId().getEmpTypeId(), e.getEmpCatId().getEmpCatId(), e.getDesignationId().getDesignationId(), e.getDivisionId().getDivisionId(), e.getLocation().getLocationId());
                dto.add(single);
            }
        }
        return dto;
    }


    //get all employees without delete
    public List<EmployeeMasterDTO> getAllEmployeesWithoutDeleted() {
        List<EmployeeMaster> emp = empRepo.findAll();
        List<EmployeeMasterDTO> dto = new ArrayList<>();
        for (EmployeeMaster e : emp) {
            EmployeeMasterDTO single = new  EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(),e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvince().getProvinceName(), e.getDistrict().getDistrictName(), e.getEmpTypeId().getEmpTypeId(), e.getEmpCatId().getEmpCatId(), e.getDesignationId().getDesignationId(), e.getDivisionId().getDivisionId(), e.getLocation().getLocationId());
            dto.add(single);
        }
        return dto;
    }
    //get All Employee Data Currently Not Working
    public List<EmployeeMasterDTO> getAllEmployeeDataCurrentlyNotWorking() {
        List<EmployeeMaster> emp = empRepo.findAll();
        List<EmployeeMasterDTO> dto = new ArrayList<>();
        for (EmployeeMaster e : emp) {
            if(e.getIsDelete()) {
                EmployeeMasterDTO single = new  EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(),e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvince().getProvinceName(), e.getDistrict().getDistrictName(), e.getEmpTypeId().getEmpTypeId(), e.getEmpCatId().getEmpCatId(), e.getDesignationId().getDesignationId(), e.getDivisionId().getDivisionId(), e.getLocation().getLocationId());
                dto.add(single);
            }
        }
        return dto;
    }

    //add employee
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

    //delete employee -> update isDelete
    public Boolean deleteEmployee(int id) {
        if (empRepo.returnEmployeeById(id) != null) {
            empRepo.updateIsDelete(true, id);
            return true;
        }
        return false;
    }

    //remove employee from database
    public Boolean hardDeleteEmployee(int id) {
        if (empRepo.returnEmployeeById(id) != null) {
            empRepo.deleteEmployee(id);
            return true;
        }
        return false;
    }

    //get division by employee id
    public EmployeeMasterDTO getEmployeeById(int id) {
        EmployeeMaster e = empRepo.returnEmployeeById(id);
        if(e != null){

//            EmployeeMasterDTO empDto = new EmployeeMasterDTO(empData.getEpfNo(), empData.getEmpType().getTypeId(), empData.getEmpCategory().getEmployeeCategoryId(), empData.getDesignation().getId(), empData.getDivision().getDivisionId(), empData.getLocation().getLocationId());
            return new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(),e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvince().getProvinceName(), e.getDistrict().getDistrictName(), e.getEmpTypeId().getEmpTypeId(), e.getEmpCatId().getEmpCatId(), e.getDesignationId().getDesignationId(), e.getDivisionId().getDivisionId(), e.getLocation().getLocationId());
        }
        return null;
    }
}