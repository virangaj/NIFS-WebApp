package com.nifs.backend.service;

import com.nifs.backend.dto.EmployeeMasterDTO;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
public interface IUserService {

    boolean createLogin(EmployeeMasterDTO employee) throws NoSuchAlgorithmException;

}
