package com.nifs.backend.controller.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.DesignationMasterDTO;
import com.nifs.backend.service.admin.IDesignationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/designation")
@CrossOrigin("http://localhost:3000/")
public class DesignationController {

    @Autowired
    private IDesignationService desService;

    //    get all designations
    @GetMapping
    private ResponseEntity<?> getAllDesignations() {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<DesignationMasterDTO> d = desService.getAllDesignations();
            if (!d.isEmpty()) {
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

    //return new id
    @GetMapping("/newid")
    private String returnNewId(){
        return desService.returnNewId();
    }

    //get designation by location id
    @GetMapping("/location/{locId}")
    private ResponseEntity<?> getDesignationByLocationId(@PathVariable String locId) {

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<DesignationMasterDTO> d = desService.getDesignationByLocationId(locId);
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

    //get designation by its id
    @GetMapping("/get/{id}")
    private ResponseEntity<?> returnDesignationById(@PathVariable String id) {

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            DesignationMasterDTO d = desService.returnDesignationById(id);
            if (d != null) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
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

    //    create designation
    @PostMapping("/add")
    private ResponseEntity<?> createDesignation(@RequestBody DesignationMasterDTO desData) {

        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {

            if (desService.createDesignation(desData)) {
                //return success response code
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "New Designation added!");
                map.put("data", desData);

                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", RequestStatus.ERROR);
            map.put("code", 404);
            map.put("message", "Failed to create new Designation. Please Try Again!");
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


    //update designation
    @PatchMapping("/update/{id}")
    private ResponseEntity<?> updateDesignation(@PathVariable String id, @RequestBody DesignationMasterDTO dto) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            DesignationMasterDTO updated = desService.updateDesignation(id, dto);
            if (updated != null) {
                //return success response code

                return ResponseEntity.ok(updated);
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

    //delete designation
    @DeleteMapping("/delete/{id}")
    private ResponseEntity<?> deleteDesignation(@PathVariable String id) {

        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            if (desService.deleteDesignation(id)) {
                map.put("status", RequestStatus.SUCCESS);
                map.put("code", 201);
                map.put("message", "Designation is successfully deleted!");
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
