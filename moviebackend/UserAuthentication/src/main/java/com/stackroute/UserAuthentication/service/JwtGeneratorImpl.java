package com.stackroute.UserAuthentication.service;

import com.stackroute.UserAuthentication.model.User;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class JwtGeneratorImpl implements JwtGenerator{

    @Override
    public Map<String, String> generateJwt(User user) {
        Map<String,String> result = new HashMap<String,String>();
        Map<String, Object> claims = new HashMap<String,Object>();
        claims.put("emailId",user.getUserEmailId());
        claims.put("currentRole",user.getRole());
        String jwt = Jwts.builder()
                .setSubject("testing token")
                .setClaims(claims)
                .setIssuer("UserAuthentication")
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS512, "idontsay")
                .compact();
        result.put("key",jwt);
        result.put("message","Login Success");
        return result;
    }
}
