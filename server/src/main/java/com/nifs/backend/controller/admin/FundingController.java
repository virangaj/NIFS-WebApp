package com.nifs.backend.controller.admin;


import com.nifs.backend.dto.admin.FundingSourceDTO;
import com.nifs.backend.service.admin.IFundingSourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/funding-source")
public class FundingController {

    @Autowired
    private IFundingSourceService fundingSourceService;

    @PostMapping
    public boolean createNewFundingSource(@RequestBody FundingSourceDTO data, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();

        return fundingSourceService.createNewFundingSource(data, user);
    }

    @GetMapping
    public List<FundingSourceDTO> getAll(){
        return fundingSourceService.getAll();
    }

    @PutMapping("/update/{id}")
    public boolean updateFundingSource(@PathVariable String id, @RequestBody FundingSourceDTO data, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return fundingSourceService.updateFundingSource(data, id, user);
    }

}
