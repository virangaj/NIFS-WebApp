package com.nifs.backend.controller.sedu;



import com.nifs.backend.dto.sedu.ChargeDTO;
import com.nifs.backend.model.sedu.Charges;
import com.nifs.backend.service.sedu.IChargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/sedu/charges")
@CrossOrigin
public class ChargeController {


    @Autowired
    IChargeService chargeService;


    @GetMapping("/newid")
    String returnNewChargeId(){
        return chargeService.returnNewChargeId();
    }

//    get charge by id
    @GetMapping("/{chargeId}")
    Optional<Charges> returnCharge(@PathVariable String chargeId){
        return chargeService.returnCharge(chargeId);
    }

    @GetMapping
    ResponseEntity<?> returnData() {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            List<ChargeDTO> c = chargeService.getAll();
            if (!c.isEmpty()) {

                //return success response code
                map.put("status", 1);
                map.put("code", 200);
                map.put("data", c);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }

            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Charges data is not found. Please try again!");
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

    //create new charge
    @PostMapping("/add")
    ResponseEntity<?> createCharge(@RequestBody ChargeDTO chargeData, @AuthenticationPrincipal UserDetails userDetails) {
        String user = userDetails.getUsername();
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try {
            ChargeDTO c = chargeService.createCharge(chargeData, user);
            if (c != null) {
                //return success response code
                map.put("status", 1);
                map.put("code", 201);
                map.put("data", c);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Failed to create new Charge. Please Try Again!");
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


    //    update charge
    @PutMapping("/update/{chargeId}")
    ResponseEntity<?> updateCharge(@PathVariable String chargeId, @RequestBody ChargeDTO chargeData, @AuthenticationPrincipal UserDetails userDetails) {
        String user = userDetails.getUsername();
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        try{
           if(chargeService.updateCharge(chargeId, chargeData, user)){
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
       }catch (Exception e) {
            //return exception response code
           System.out.println(e.toString());
           map.put("status", 0);
           map.put("code", 400);
           map.put("error", e.toString());
           map.put("message", "Internal server error. Please try again!");
           return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
       }
    }


    //    delete charge
    @DeleteMapping("/delete/{chargeId}")
    ResponseEntity<?> deleteCharge(@PathVariable String chargeId) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try{
            if (chargeService.deleteCharge(chargeId)) {
                map.put("status", 1);
                map.put("code", 201);
                map.put("message", "Charge is successfully deleted!");
                return new ResponseEntity<>(map, HttpStatus.OK);
            }
            //return error response code
            map.put("status", 0);
            map.put("code", 404);
            map.put("message", "Request cannot be completed!");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }catch (Exception e) {
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
