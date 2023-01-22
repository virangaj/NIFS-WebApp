package com.nifs.backend.auth.service;

import com.nifs.backend.common.Common;
import com.nifs.backend.dto.ChangePasswordDTO;
import com.nifs.backend.dto.LoginDetailsDTO;
import com.nifs.backend.model.EmployeeLogin;
import com.nifs.backend.repository.EmployeeLoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.Objects;

@Service
public class AuthenticationServiceImpl implements IAuthenticationService{


    @Autowired
    private EmployeeLoginRepository loginRepo;
    private final Common common = new Common();

    // return login details
    private EmployeeLogin returnLoginDetails(int epfNo){
        return loginRepo.returnLoginDetails(epfNo);
    }


    // check user by id and password
    private EmployeeLogin checkIdAndPassword(int epfNo, String password) throws NoSuchAlgorithmException {
        String pwd = common.encryptPassword(password);
        return loginRepo.checkIdAndPassword(epfNo, pwd);
    }


    // check whether user has logged before
    @Override
    public boolean firstLogging(LoginDetailsDTO user) throws NoSuchAlgorithmException {
        String pwd = common.encryptPassword(user.getPassword());
        return checkIdAndPassword(user.getEpfNo(), user.getPassword()).getLastLogin() == null;
    }


    //change password
    @Override
    public boolean changePassword(ChangePasswordDTO data, int epfNo) throws NoSuchAlgorithmException {

        if(checkIdAndPassword(epfNo, data.getOldPassword()) != null){
            String newPwd = common.encryptPassword(data.getNewPassword());
            Date d  = new Date();
            loginRepo.changePassword(newPwd, d, epfNo);
            return true;
        }
        return false;
    }
}
