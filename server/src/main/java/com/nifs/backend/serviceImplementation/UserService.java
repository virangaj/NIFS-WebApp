package com.nifs.backend.serviceImplementation;

import com.nifs.backend.constant.UserRole;
import com.nifs.backend.dto.admin.ChangePasswordDTO;
import com.nifs.backend.dto.admin.EmployeeMasterDTO;
import com.nifs.backend.model.admin.EmployeeMaster;
import com.nifs.backend.model.admin.User;
import com.nifs.backend.repository.admin.EmployeeMasterRepository;
import com.nifs.backend.repository.admin.UserRepository;
import com.nifs.backend.service.admin.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private EmployeeMasterRepository empRepo;

    @Autowired
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager manager;
    //create login for the user
    @Override
    public boolean createLogin(EmployeeMasterDTO e) throws NoSuchAlgorithmException {

        if (userRepo.returnLoginDetails(e.getEpfNo()) == null) {

            String pwd =  passwordEncoder.encode(Integer.toString(e.getEpfNo()));
            EmployeeMaster employeeMaster = empRepo.returnEmployeeById(e.getEpfNo());

            User user = new User();

            user.setEmployee(employeeMaster);
            user.setEmail(e.getGsuitEmail());
            user.setPassword(pwd);
            user.setRole(UserRole.USER);
            user.setIsDelete(false);
            userRepo.save(user);
            return true;
        }

        return false;
    }


    //change the role
    @Override
    public boolean changeRole(int id, UserRole role) {
        if(userRepo.returnLoginDetails(id) != null) {
            userRepo.updateUserRole(role, id);
            return true;
        }

        return false;
    }

    //change password
    @Override
    public boolean changePassword(int id, ChangePasswordDTO data) {
        manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        data.getEpfNo(),
                        data.getOldPassword()
                ));
        var user = userRepo.returnLoginDetails(id);
        System.out.println(user.toString());
        if (data.getNewPassword().equals(data.getConfirmPassword())) {
            System.out.println("inside the if condition");
            if (passwordEncoder.encode(data.getNewPassword()).equals(passwordEncoder.encode(String.valueOf(data.getEpfNo())))) {
                return false;
            }
            userRepo.changePassword(passwordEncoder.encode(data.getNewPassword()), new Date(), id);
            return true;
        }

        return false;
    }

    //update is delete
    @Override
    public void updateIsDelete(boolean b, int id) {
        if(userRepo.returnLoginDetails(id) != null) {
            userRepo.updateIsDelete(b, id);
        }
    }
}
