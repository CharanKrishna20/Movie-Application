package com.example.MovieService.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;



@Service
public class EmailService {
    @Value("${spring.mail.username}")
    private String fromEmail;
    @Autowired
    private JavaMailSender javaMailSender;


    public void sendVerificationCode( String to, String verificationCode,String userName) {
        try {
            System.out.println("verification code block is running....");
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            System.out.println(mimeMessage);
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject("Account Verification Code");
            String emailContent = "Hello " + userName + ",\n\nYour verification code is: " + verificationCode;
            mimeMessageHelper.setText(emailContent);
            javaMailSender.send(mimeMessage);
            System.out.println(".....................");
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

    public void sendResetCode( String to, String ResetCode,String userName) {
        try {
            System.out.println("Reset code block is running....");
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            System.out.println(mimeMessage);
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(fromEmail);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject("Password Reset Code");
            String emailContent = "Hello " + userName + ",\n\nYour verification code for password reset is: " + ResetCode;
            mimeMessageHelper.setText(emailContent);
            javaMailSender.send(mimeMessage);
            System.out.println(".....................");
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
}


