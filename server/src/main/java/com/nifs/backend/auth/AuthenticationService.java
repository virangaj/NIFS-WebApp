package com.nifs.backend.auth;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.UserDTO;
import com.nifs.backend.repository.EmployeeMasterRepository;
import com.nifs.backend.repository.UserRepository;
import com.nifs.backend.service.IDivisionMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EmployeeMasterRepository empRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private IDivisionMasterService divService;
    private final AuthenticationManager manager;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    public AuthenticationResponse loginRequest(LoginRequest request) {

        var user = userRepo.returnLoginDetails(request.getEpfNo());

        if(!user.getIsDelete()){
            manager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEpfNo(),
                            request.getPassword()
                    ));


            var employee = empRepo.returnEmployeeById(request.getEpfNo());
            var jwtToken = jwtService.generateToken(user);
            var division = divService.getDivisionById(employee.getDivisionId().getDivisionId());

            UserDTO userDTO = UserDTO.builder()
                    .email(employee.getGsuitEmail())
                    .epfNo(employee.getEpfNo())
                    .role(user.getRole())
                    .division(division.getName())
                    .lastLogin(user.getLastLogin()).build();

            if (user.getLastLogin() == null ||
                    user.getPassword().equals(passwordEncoder.encode(Integer.toString(request.getEpfNo())))) {

                return AuthenticationResponse.builder()
                        .status(String.valueOf(RequestStatus.CHANGE_PASSWORD))
                        .code(200)
                        .message("Please change your password!")
                        .token(jwtToken)
                        .name(employee.getFirstName() + " " + employee.getLastName())
                        .user(userDTO)
                        .build();
            }
            else {
                return AuthenticationResponse.builder()
                        .status(String.valueOf(RequestStatus.SUCCESS))
                        .code(200)
                        .message("You are successfully login")
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
