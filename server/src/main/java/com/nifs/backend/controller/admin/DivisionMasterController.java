package com.nifs.backend.controller.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.DivisionMasterDTO;
import com.nifs.backend.service.admin.IDivisionMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("admin/division")
@CrossOrigin
public class DivisionMasterController {

    @Autowired
    private IDivisionMasterService divMasterService;

    //return all divisions
    @GetMapping
    private ResponseEntity<?> getAllDivisions(){

        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            List<DivisionMasterDTO> d =  divMasterService.getAll();
            if (!d.isEmpty()) {

                //return success response code
//                map.put("status", RequestStatus.SUCCESS);
//                map.put("code", 200);
//                map.put("count", d.size());
//                map.put("data", d);
                return ResponseEntity.ok(d);
            }

            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Division data is not found. Please try again!");
            return new ResponseEntity<>(map, HttpStatus.OK);

        } catch (Exception e) {

            //return exception response code
            System.out.println(e.toString());
            map.put("status",RequestStatus.ERROR);
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
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("count", d.size());
                map.put("data", d);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Designation data is not found. Please Try Again!");
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

    //get division by its id
    @GetMapping("/get/{id}")
    private ResponseEntity<?> getDivisionById(@PathVariable String id){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try{
            DivisionMasterDTO d = divMasterService.getDivisionById(id);
            if (d != null) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("data", d);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }

            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Designation data is not found. Please Try Again!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } catch (Exception e) {
        //return exception response code
        System.out.println(e.toString());
        map.put("status",RequestStatus.ERROR);
        map.put("code", 400);
        map.put("error", e.toString());
        map.put("message", "Internal server error. Please try again!");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }
    }

    //create division
    @PostMapping("/add")
    private  ResponseEntity<?> createDivision(@RequestBody DivisionMasterDTO divMasterData){

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {

            DivisionMasterDTO divisionMasterDTO = divMasterService.createDivision(divMasterData);
            if (divisionMasterDTO.getDivisionId() != null) {
                //return success response code
               return ResponseEntity.ok(divisionMasterDTO);
            }
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Failed to create new Division. Please Try Again!");
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

//    update division master
    @PatchMapping("/update/{dvId}")
    private ResponseEntity<?> updateDivisionMaster(@RequestBody DivisionMasterDTO dmData, @PathVariable String dvId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            if (divMasterService.updateDivisionMaster(dmData, dvId)) {
                //return success response code

                return ResponseEntity.ok(dmData);
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
//    delete division
    @DeleteMapping("/delete/{divisionId}")
    private ResponseEntity<?> deleteDivision(@PathVariable String divisionId){

        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            if ( divMasterService.deleteDivision(divisionId)) {

                return ResponseEntity.ok(divisionId);
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
