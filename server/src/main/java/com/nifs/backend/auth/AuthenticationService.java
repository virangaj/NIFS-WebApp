package com.nifs.backend.auth;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.UserDTO;
import com.nifs.backend.repository.admin.EmployeeMasterRepository;
import com.nifs.backend.repository.admin.UserRepository;
import com.nifs.backend.service.admin.IDivisionMasterService;
import com.nifs.backend.service.auth.IJwtTokenService;
import com.nifs.backend.util.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@Log4j2
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EmployeeMasterRepository empRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private IJwtTokenService tokenService;

    @Autowired
    private IDivisionMasterService divService;
    private final AuthenticationManager manager;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private EmailService emailService;

    // login requests
    public AuthenticationResponse loginRequest(LoginRequest request) {

        var user = userRepo.returnLoginDetails(request.getEpfNo());

        if(!user.getIsDelete()){
            manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEpfNo(),
                            request.getPassword()
                    ));


            var employee = empRepo.returnEmployeeById(request.getEpfNo());

//            var division = divService.getDivisionById(employee.getDivisionId().getDivisionId());

            HashMap<String, Object> claims = new HashMap<>();
            claims.put("division", employee.getDivisionId().getDivisionId());
            claims.put("role", user.getRole());




            var jwtToken = jwtService.generateToken(user, claims);
            log.info("AuthenticationService : "+request.getEpfNo());


            UserDTO userDTO = UserDTO.builder()
                    .email(employee.getGsuitEmail())
                    .epfNo(employee.getEpfNo())
                    .role(user.getRole())
                    .division(employee.getDivisionId().getDivisionId())
                    .lastLogin(user.getLastLogin()).build();

            if (user.getLastLogin() == null ||
                    user.getPassword().equals(passwordEncoder.encode(Integer.toString(request.getEpfNo())))) {

                return AuthenticationResponse.builder()
                        .status(String.valueOf(RequestStatus.CHANGE_PASSWORD))
                        .code(200)
                        .message("Please Change Your Password!")
                        .token(jwtToken)
                        .name(employee.getFirstName() + " " + employee.getLastName())
                        .user(userDTO)
                        .build();
            }
            else {
                userRepo.updateLoginDate(new Date(), request.getEpfNo());
                return AuthenticationResponse.builder()
                        .status(String.valueOf(RequestStatus.SUCCESS))
                        .code(200)
                        .message("You are Successfully Login")
                        .token(jwtToken)
                        .name(employee.getFirstName() + " " + employee.getLastName())
                        .user(userDTO)
                        .build();
            }
        }
        return AuthenticationResponse.builder()
            .status(String.valueOf(RequestStatus.UNAUTHORIZED))
            .code(200)
                .message("You are not AUTHORIZED to the system!")
                .build();

    }

    public ResponseEntity<?> forgetPassword(String email) throws MessagingException {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        var user = userRepo.findByEmployee_GsuitEmailEquals(email);
        var id = user.getEmployee().getId();
        if(id != null){


            String msg = "Trouble signing in?\n" +
                    "Resetting your password is easy.\n" +
                    "\n" +
                    "Just press the button below and follow the instructions. We’ll have you up and running in no time.\n" +
                    "\n" +
                    "Copy paste following link in your browser.\n" +
                    "http://localhost:3000/forget-password/"+id+"\n" +
                    "\n" +
                    "If you did not make this request then please ignore this email.";

            //send email
            emailService.sendEmail(email, "Reset Password - NIFS", msg);


            map.put("status", RequestStatus.SUCCESS);
            map.put("code", 201);
            map.put("message", "Password reset link has sent to your email!");
        }else{
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("message", "Please Enter valid email address");
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    public ResponseEntity<?> resetPassword(String password, String id) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();

        try {
            String pwd = passwordEncoder.encode(password);


            String email = userRepo.findEmailById(id);

            userRepo.updatePasswordByEmailEquals(pwd, email);

            String msg = "Password has been updated successfully\n" +
                    "Please login with your new credentials\n";

            emailService.sendEmail(email, "Reset Password - Successful", msg);

            map.put("status", RequestStatus.SUCCESS);
            map.put("code", 201);
            map.put("message", "Password is updated!");


        }catch(Exception e){
            map.put("status", RequestStatus.ERROR);
            map.put("code", 400);
            map.put("message", "Request cannot be completed!");
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
