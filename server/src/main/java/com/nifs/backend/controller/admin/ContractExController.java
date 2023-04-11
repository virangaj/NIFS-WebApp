package com.nifs.backend.controller.admin;


import com.nifs.backend.dto.admin.ContractExtensionDTO;
import com.nifs.backend.service.admin.IContractExService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/contract-extension")
public class ContractExController {


    @Autowired
    private IContractExService contractExService;

    @GetMapping
    public ResponseEntity<?> getAllContractExtensions(){

        return ResponseEntity.ok("success");
    }


    @PostMapping("/add")
    public ResponseEntity<?> createNewContractExtension(@RequestBody ContractExtensionDTO data) {
        return contractExService.createNewContractExtension(data);
    }


}
