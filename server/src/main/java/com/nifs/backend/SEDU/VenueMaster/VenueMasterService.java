package com.nifs.backend.SEDU.VenueMaster;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueMasterService {

    @Autowired
    private VenueMasterRepository venueRepo;

    public List<VenueMaster> getAll(){
        return venueRepo.findAll();
    }

}
