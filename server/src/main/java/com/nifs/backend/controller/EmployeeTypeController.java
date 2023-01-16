package com.nifs.backend.controller;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.EmpCatDTO;
import com.nifs.backend.dto.EmployeeTypeDTO;
import com.nifs.backend.service.EmployeeTypeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("admin/employeetype")
@CrossOrigin
public class EmployeeTypeController {

    @Autowired
    private EmployeeTypeServiceInterface empTypeService;


    //    get all employee types
    @GetMapping
    private ResponseEntity<?> getAllTypes() {


        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<EmployeeTypeDTO> emp = empTypeService.getAllTypes();
            if (emp != null) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("count", emp.size());
                map.put("data", emp);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Employee Type data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //get new id
    @GetMapping("/newid")
    private String returnNewId(){
        return empTypeService.returnNewId();
    }

    //    get emp type by location id
    @GetMapping("/location/{locId}")
    private ResponseEntity<?> GetEmpTypeByLocationId(@PathVariable String locId) {

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<EmployeeTypeDTO> emp = empTypeService.GetEmpTypeByLocationId(locId);
            if (emp != null) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("count", emp.size());
                map.put("data", emp);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Employee Type data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //    create new employee type
    @PostMapping
    private ResponseEntity<?> createEmpType(@RequestBody EmployeeTypeDTO empTypeData) {

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (empTypeService.createEmpType(empTypeData)) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Failed to create new Employee Type. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }


    //    update employee Type
    @PatchMapping("/update/{type_id}")
    private ResponseEntity<?> updateEmployeeType(@PathVariable String type_id, @RequestBody EmployeeTypeDTO empTypeData) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (empTypeService.updateEmployeeType(empTypeData, type_id)) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "Update Request completed!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Request Failed. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }


    //    delete employee type
    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> deleteEmployeeType(@PathVariable String id) {

        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            if (empTypeService.deleteEmployeeType(id)){
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "Employee Type is successfully deleted!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Request cannot be completed!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
}

