package com.nifs.backend.serviceImplementation;

import com.nifs.backend.common.Common;
import com.nifs.backend.dto.EmployeeMasterDTO;
import com.nifs.backend.model.EmployeeLogin;
import com.nifs.backend.model.EmployeeMaster;
import com.nifs.backend.repository.EmployeeLoginRepository;
import com.nifs.backend.repository.EmployeeMasterRepository;
import com.nifs.backend.service.IEmployeeLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Service
public class EmployeeLoginService implements IEmployeeLoginService {


    private final Common common = new Common();
    @Autowired
    private EmployeeLoginRepository loginRepo;
    @Autowired
    private EmployeeMasterRepository empRepo;

    @Override
    public boolean createLogin(EmployeeMasterDTO e) throws NoSuchAlgorithmException {

        if (loginRepo.findByEpfNo(e.getEpfNo()) == null) {

            String pwd = common.encryptPassword(Integer.toString(e.getEpfNo()));
            EmployeeMaster employeeMaster = empRepo.returnEmployeeById(e.getEpfNo());

            EmployeeLogin empLogin = new EmployeeLogin();

            empLogin.setEmployee(employeeMaster);
            empLogin.setEmail(e.getGsuitEmail());
            empLogin.setPassword(pwd);
            loginRepo.save(empLogin);
            return true;
        }

        return false;
    }
}
