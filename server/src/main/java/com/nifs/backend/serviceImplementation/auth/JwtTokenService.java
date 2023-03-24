package com.nifs.backend.serviceImplementation.auth;

import com.nifs.backend.model.JwtTokens;
import com.nifs.backend.repository.auth.JwtRepository;
import com.nifs.backend.service.auth.IJwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
public class JwtTokenService implements IJwtTokenService {

    @Autowired
    private JwtRepository jwtRepo;

    @Override
    public String createToken(String token, int epfNo) {
        UUID uuid = UUID.randomUUID();
        String uuidAsString = uuid.toString();
        System.out.println("JwtTokenService : "+epfNo);
        //check is there previously created token is available
        if(jwtRepo.findByEpfNo(epfNo) != null){

            //delete that entry and add new token t the database
            jwtRepo.deleteToken(epfNo);

        }
        //create new entry
        JwtTokens jwtTokens = new JwtTokens(uuidAsString, epfNo, token, new Date());
        jwtRepo.save(jwtTokens);
        return uuidAsString;
    }

    //get token from backend
    @Override
    public String getToken(String databaseToken) {
        try{
            return jwtRepo.findByIdEquals(databaseToken).getToken();
        }
        catch (Exception e){
            System.out.println(e.toString());
            return "token.not.found";
        }
    }
}
