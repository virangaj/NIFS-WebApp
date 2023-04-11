package com.nifs.backend.auth;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.admin.UserDTO;
import com.nifs.backend.repository.admin.EmployeeMasterRepository;
import com.nifs.backend.repository.admin.UserRepository;
import com.nifs.backend.service.admin.IDivisionMasterService;
import com.nifs.backend.service.auth.IJwtTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;

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
            .code(404)
                .message("You are not AUTHORIZED to the system!")
                .build();

    }
}
