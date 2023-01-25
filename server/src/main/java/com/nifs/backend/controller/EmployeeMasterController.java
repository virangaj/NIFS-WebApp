package com.nifs.backend.controller;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.constant.UserRole;
import com.nifs.backend.dto.EmployeeMasterDTO;
import com.nifs.backend.service.IEmployeeMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth/employee")
@CrossOrigin
public class EmployeeMasterController {

    @Autowired
    private IEmployeeMasterService empService;

    //get all currently working employees
    @GetMapping
    private ResponseEntity<?> getAllEmployees() {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<EmployeeMasterDTO> emp = empService.getAllEmployees();
            if (emp != null) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("count", emp.size());
                map.put("data", emp);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Employee Data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //return all employees worked so far
    @GetMapping("/withoutdelete")
    private ResponseEntity<?> getAllEmployeesWithoutDeleted() {

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<EmployeeMasterDTO> emp = empService.getAllEmployeesWithoutDeleted();
            if (emp != null) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("count", emp.size());
                map.put("data", emp);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Employee Data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    // return all deleted employees
    @GetMapping("/deleted")
    private ResponseEntity<?> getAllEmployeeDataCurrentlyNotWorking()  {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<EmployeeMasterDTO> emp = empService.getAllEmployeeDataCurrentlyNotWorking();
            if (emp != null) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("count", emp.size());
                map.put("data", emp);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Employee Data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }


    //get employee by employee id
    @GetMapping("/{id}")
    private ResponseEntity<?> getEmployeeById(@PathVariable int id){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            EmployeeMasterDTO emp = empService.getEmployeeById(id);
            if (emp != null) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("data", emp);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Employee Data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }


    //add new employee
    @PostMapping
    private ResponseEntity<?> addEmployee(@RequestBody EmployeeMasterDTO empData){


        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (empService.addEmployee(empData)) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "New Employee Successfully Created!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Request Failed. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //change is empty value -> true
    @PatchMapping("/delete/{id}")
    private ResponseEntity<?>  updateIsDelete(@PathVariable int id){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (empService.updateIsDelete(id)) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "Employee Daa is successfully deleted!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Request cannot be completed!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //make user as admin
    @PatchMapping("/update/role/{id}/{role}")
    private ResponseEntity<?> updateRole(@PathVariable int id, @PathVariable UserRole role){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (empService.updateRole(id, role)) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "Employee Role is changed!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Request cannot be completed!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    // remove employee from database
    @DeleteMapping("/harddelete/{id}")
    private ResponseEntity<?> hardDeleteEmployee(@PathVariable int id){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (empService.hardDeleteEmployee(id)) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "Employee Data is successfully deleted!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Request cannot be completed!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
}
