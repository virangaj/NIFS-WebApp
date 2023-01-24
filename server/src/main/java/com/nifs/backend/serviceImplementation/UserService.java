package com.nifs.backend.serviceImplementation;

import com.nifs.backend.common.Common;
import com.nifs.backend.constant.UserRole;
import com.nifs.backend.dto.EmployeeMasterDTO;
import com.nifs.backend.model.User;
import com.nifs.backend.model.EmployeeMaster;
import com.nifs.backend.repository.UserRepository;
import com.nifs.backend.repository.EmployeeMasterRepository;
import com.nifs.backend.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {


    private final Common common = new Common();
    @Autowired
    private UserRepository loginRepo;
    @Autowired
    private EmployeeMasterRepository empRepo;


    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean createLogin(EmployeeMasterDTO e) throws NoSuchAlgorithmException {

        if (loginRepo.returnLoginDetails(e.getEpfNo()) == null) {

            String pwd =  passwordEncoder.encode(Integer.toString(e.getEpfNo()));
            EmployeeMaster employeeMaster = empRepo.returnEmployeeById(e.getEpfNo());

            User user = new User();

            user.setEmployee(employeeMaster);
            user.setEmail(e.getGsuitEmail());
            user.setPassword(pwd);
            user.setRole(UserRole.USER);
            loginRepo.save(user);
            return true;
        }

        return false;
    }
}
