package com.nifs.backend.util;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@Log4j2
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String toEmail, String subject, String text) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);

        mimeMessageHelper.setFrom("gramzypazy@gmail.com");
        mimeMessageHelper.setTo(toEmail);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(text);

        javaMailSender.send(mimeMessage);


        log.info("--------------Send email to {} || subject {} ||  body {}----------",toEmail, subject, text);

    }

    //hod get request message
    public String HODRequestMessage(String type, int epf, String division, String endLink){
        return type + " By " + epf +" to be reviewed \n\n" +
                "Please use the link below to address it \n"+
                "http://localhost:3000/dashboard/"+division+"/admin/"+endLink;
    }

    //director get request message
    public String DirectorRequestMessage(String type, String endLink){
        return  "New "+ type + " to be reviewed \n\n" +
                "Please use the link below to address it \n"+
                "http://localhost:3000/dashboard/director/admin/"+endLink;
    }

//    user get status about the request
    public String userResponseStatusMessage(String type, String status, String handler){

        return "Your " + type +" have been " + status + " by " + handler;

    }

    public void sendBulkEmailToRequesterAfterHOD(List<Map<String ,String>> emailList, String type, String status, String handler){
        String msg = userResponseStatusMessage(type, status, handler);

        emailList.forEach(e->{
            try {
                sendEmail(e.get("email"), "Regarding "+ type +" id "+ e.get("id"), msg);
            } catch (MessagingException ex) {
                throw new RuntimeException(ex);
            }
        });
    }
}
