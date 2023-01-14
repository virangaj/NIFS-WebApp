package com.nifs.backend.controller;


import com.nifs.backend.dto.DesignationMasterDTO;
import com.nifs.backend.model.DesignationMaster;
import com.nifs.backend.service.EmployeeCatServiceInterface;
import com.nifs.backend.dto.EmpCatDTO;
import com.nifs.backend.model.EmployeeCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin/employeecategory")
@CrossOrigin
public class EmployeeCategoryController {


    @Autowired
    private EmployeeCatServiceInterface empCatService;

//    get all employee categories
    @GetMapping
    private ResponseEntity<?> getAllEmpCategories(){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<EmpCatDTO> emp = empCatService.getAllEmpCategories();
            if (emp != null) {
                //return success response code
                map.put("status", 1);
                map.put("code", 201);
                map.put("data", emp);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Employee Category data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", 0);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }

    }


//    return new employee category id
    @GetMapping("/newid")
    String returnNewEmpCatId(){
        return empCatService.returnNewEmpCatId();
    }
//    get employee cat by id
    @GetMapping("/{empCatId}")
    ResponseEntity<?> returnEmpCat(@PathVariable String empCatId){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            Optional<EmployeeCategory> empCat = empCatService.returnEmpCat(empCatId);
            if (empCat.isPresent()) {
                //return success response code
                map.put("status", 1);
                map.put("code", 201);
                map.put("data", empCat);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Employee Category data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", 0);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

    //get emp category by location id
    @GetMapping("/location/{locId}")
    private ResponseEntity<?> getCategoryByLocationId(@PathVariable String locId){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<EmpCatDTO> d = empCatService.getCategoryByLocationId(locId);
            if (d != null) {
                //return success response code
                map.put("status", 1);
                map.put("code", 201);
                map.put("data", d);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Employee Category data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", 0);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }


    //    create new employee category
    @PostMapping
    private  ResponseEntity<?> createNewEmployeeCategory(@RequestBody EmpCatDTO empCatData){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {

            if (empCatService.createNewCategory(empCatData)) {
                //return success response code
                map.put("status", 1);
                map.put("code", 201);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Failed to create new Employee Category. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", 0);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

//    update employee category
    @PatchMapping("/update/{empCatId}")
    private ResponseEntity<?> updateEmployeeCategory(@RequestBody EmpCatDTO empCatData, @PathVariable String empCatId){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (empCatService.updateEmployeeCategory(empCatData, empCatId)) {
                //return success response code
                map.put("status", 1);
                map.put("code", 201);
                map.put("message", "Update Request completed!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Request Failed. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", 0);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }

//    delete employee category
    @DeleteMapping("/delete/{empCatId}")
    private ResponseEntity<?> deleteEmployeeCategory(@PathVariable String empCatId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            if (empCatService.deleteEmployeeCategory(empCatId)) {
                map.put("status", 1);
                map.put("code", 201);
                map.put("message", "Designation is successfully deleted!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Request cannot be completed!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
            //return exception response code
            System.out.println(e.toString());
            map.put("status", 0);
            map.put("code", 400);
            map.put("error", e.toString());
            map.put("message", "Internal server error. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
}
