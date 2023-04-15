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
    public String HODRequestMessage(String type, int epf, int hod, String endLink){
        return type + " By " + epf +" to be reviewed \n\n" +
                "Please use the link below to address it \n"+
                "http://localhost:3000/dashboard/"+hod+"/admin/"+endLink;
    }

    //director get request message
    public String DirectorRequestMessage(String type, int epf, String endLink){
        return type + " By " + epf +" to be reviewed \n\n" +
                "Please use the link below to address it \n"+
                "http://localhost:3000/dashboard/director/admin/"+endLink;
    }

//    user get status about the request
    public String userResponseStatusMessage(String type, String status, String handler){

        return "Your" + type +" have been " +status + " by" + handler;

    }
}
