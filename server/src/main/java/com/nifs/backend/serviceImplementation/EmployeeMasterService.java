package com.nifs.backend.serviceImplementation;

import com.nifs.backend.service.EmployeeMasterServiceInterface;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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
public class EmployeeMasterService implements EmployeeMasterServiceInterface {

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

    @Autowired
    private ModelMapper modelMapper;

    //get all employees
    public List<EmployeeMasterDTO> getAllEmployees() {
        try {
            List<EmployeeMaster> emp = empRepo.findAll();
            List<EmployeeMasterDTO> dto = new ArrayList<>();
            for (EmployeeMaster e : emp) {
                if (! e.getIsDelete()) {
                    EmployeeMasterDTO single = new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvinceId().getProvinceName(), e.getDistrictId().getDistrictName(), e.getEmpTypeId().getEmpTypeId(), e.getEmpCatId().getEmpCatId(), e.getDesignationId().getDesignationId(), e.getDivisionId().getDivisionId(), e.getLocationId().getLocationId());
                    dto.add(single);
                }
            }
            return dto;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }


    //get all employees without delete
    public List<EmployeeMasterDTO> getAllEmployeesWithoutDeleted() {
        try {
            List<EmployeeMaster> emp = empRepo.findAll();
            List<EmployeeMasterDTO> dto = new ArrayList<>();
            for (EmployeeMaster e : emp) {
                EmployeeMasterDTO single = new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvinceId().getProvinceName(), e.getDistrictId().getDistrictName(), e.getEmpTypeId().getEmpTypeId(), e.getEmpCatId().getEmpCatId(), e.getDesignationId().getDesignationId(), e.getDivisionId().getDivisionId(), e.getLocationId().getLocationId());
                dto.add(single);
            }
            return dto;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }
    //get All Employee Data Currently Not Working
    public List<EmployeeMasterDTO> getAllEmployeeDataCurrentlyNotWorking() {
        try {
            List<EmployeeMaster> emp = empRepo.findAll();
            List<EmployeeMasterDTO> dto = new ArrayList<>();
            for (EmployeeMaster e : emp) {
                if (e.getIsDelete()) {
                    EmployeeMasterDTO single = new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvinceId().getProvinceName(), e.getDistrictId().getDistrictName(), e.getEmpTypeId().getEmpTypeId(), e.getEmpCatId().getEmpCatId(), e.getDesignationId().getDesignationId(), e.getDivisionId().getDivisionId(), e.getLocationId().getLocationId());
                    dto.add(single);
                }
            }
            return dto;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    //add employee
    public Boolean addEmployee(EmployeeMasterDTO e) {
        try {
            if (empRepo.returnEmployeeById(e.getEpfNo()) == null) {

                //get designation
                DesignationMaster d = desRepo.returnDesignation(e.getDesignationId());
                //get emp category
                EmployeeCategory empCat = catRepo.returnEmployeeCategory(e.getEmpCatId());
                //get emp division
                DivisionMaster divMaster = divRepo.returnDivision(e.getDivisionId());
                //get emp type
                EmployeeTypeMaster empType = typeRepo.returnType(e.getEmpTypeId());
                //get location
                Locations locData = locRepo.getLocation(e.getLocationId());
                //get district
                District dData = disRepo.returnDistrictById(Integer.parseInt(e.getDistrictId()));
                //get province
                Province province = proRepo.findProvinceById(Integer.parseInt(e.getProvinceId()));

//            EmployeeMaster employee = new EmployeeMaster(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), dData, province, empType, empCat,d, divMaster, locData);
                EmployeeMaster employeeMaster = new EmployeeMaster(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), false, dData, province, empType, empCat, d, divMaster, locData);

                empRepo.save(employeeMaster);
                return true;


            }
            return false;
        } catch (Exception err) {
            System.out.println(err.toString());
            return false;
        }
    }

    //delete employee -> update isDelete
    public Boolean deleteEmployee(int id) {
        try {
            if (empRepo.returnEmployeeById(id) != null) {
                empRepo.updateIsDelete(true, id);
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    //remove employee from database
    public Boolean hardDeleteEmployee(int id) {
        try {
            if (empRepo.returnEmployeeById(id) != null) {
                empRepo.deleteEmployee(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    //get division by employee id
    public EmployeeMasterDTO getEmployeeById(int id) {
        try {
            EmployeeMaster e = empRepo.returnEmployeeById(id);
            if (e != null) {

//            EmployeeMasterDTO empDto = new EmployeeMasterDTO(empData.getEpfNo(), empData.getEmpType().getTypeId(), empData.getEmpCategory().getEmployeeCategoryId(), empData.getDesignation().getId(), empData.getDivision().getDivisionId(), empData.getLocation().getLocationId());
                return new EmployeeMasterDTO(e.getEpfNo(), e.getInitials(), e.getFirstName(), e.getLastName(), e.getGender(), e.getDob(), e.getAddress(), e.getContactNo(), e.getPersonalEmail(), e.getGsuitEmail(), e.getNicNo(), e.getNicIssuedDate(), e.getPassportNo(), e.getPassExpireDate(), e.getLicenseNo(), e.getLicenseIssuedDate(), e.getLicenseExpireDate(), e.getContactPerson(), e.getCpRelationship(), e.getCpAddress(), e.getCpTelephone(), e.getCpStatus(), e.getCpCivilStatus(), e.getCpReligion(), e.getAppointmentDate(), e.getContractStart(), e.getContractEnd(), e.getProvinceId().getProvinceName(), e.getDistrictId().getDistrictName(), e.getEmpTypeId().getEmpTypeId(), e.getEmpCatId().getEmpCatId(), e.getDesignationId().getDesignationId(), e.getDivisionId().getDivisionId(), e.getLocationId().getLocationId());
            }
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }
}
