package com.nifs.backend.controller;

import com.nifs.backend.dto.DesignationMasterDTO;
import com.nifs.backend.dto.DivisionMasterDTO;
import com.nifs.backend.model.Charges;
import com.nifs.backend.model.DesignationMaster;
import com.nifs.backend.model.DivisionMaster;
import com.nifs.backend.service.DivisionMasterServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("admin/division")
@CrossOrigin
public class DivisionMasterController {

    @Autowired
    private DivisionMasterServiceInterface divMasterService;

    //return all divisions
    @GetMapping
    private ResponseEntity<?> getAllDivisions(){

        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            List<DivisionMasterDTO> d =  divMasterService.getAll();
            if (!d.isEmpty()) {

                //return success response code
                map.put("status", 1);
                map.put("code", 200);
                map.put("data", d);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }

            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Division data is not found. Please try again!");
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


//    return new id
    @GetMapping("/newid")
    private String returnNewDivisionId(){
        return divMasterService.returnNewDivisionId();
    }

    // det division by location id
    @GetMapping("/location/{locID}")
    private ResponseEntity<?> getDivisionByLocationId(@PathVariable String locID){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<DivisionMasterDTO> d = divMasterService.GetDivisionByLocationId(locID);
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
            map.put("message", "Designation data is not found. Please Try Again!");
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

    //get division by its id
    @GetMapping("/get/{id}")
    private ResponseEntity<?> getDivisionById(@PathVariable String id){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try{
            DivisionMasterDTO d = divMasterService.getDivisionById(id);
            if (d != null) {
                //return success response code
                map.put("status", 1);
                map.put("code", 201);
                map.put("data", d);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }

            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Designation data is not found. Please Try Again!");
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

    //create division
    @PostMapping
    private  ResponseEntity<?>  createDivision(@RequestBody DivisionMasterDTO divMasterData){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            DivisionMaster d = divMasterService.createDivision(divMasterData);
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
            map.put("message", "Failed to create new Designation. Please Try Again!");
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

//    update division master
    @PatchMapping("/update/{dvId}")
    private ResponseEntity<?> updateDivisionMaster(@RequestBody DivisionMasterDTO dmData, @PathVariable String dvId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (divMasterService.updateDivisionMaster(dmData, dvId)) {
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
//    delete division
    @DeleteMapping("/delete/{divisionId}")
    private ResponseEntity<?> deleteDivision(@PathVariable String divisionId){

        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            if ( divMasterService.deleteDivision(divisionId)) {
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
