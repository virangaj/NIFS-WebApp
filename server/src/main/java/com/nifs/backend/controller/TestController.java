package com.nifs.backend.controller;

import com.nifs.backend.model.Religions;
import com.nifs.backend.service.IOtherDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private IOtherDataService other;

    @GetMapping("/{id}")
    private ResponseEntity<?> returnResponse(@PathVariable int id) {
        try {
            Map<String, Object> map = new LinkedHashMap<String, Object>();
            List<Religions> r = other.returnAllReligions();
            if (r.isEmpty()) {
                map.put("status", 1);
                map.put("data", r);
                return new ResponseEntity<>(map, HttpStatus.OK);
            }

            map.clear();
            map.put("status", 0);
            map.put("message", "Data is not found");
            return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }

    }
}
