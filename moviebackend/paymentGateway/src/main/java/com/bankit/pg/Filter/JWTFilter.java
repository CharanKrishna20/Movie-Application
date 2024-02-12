package com.bankit.pg.Filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JWTFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest)servletRequest;
        String authHeader=request.getHeader("authorization");
        System.out.println("Filter.....");

        if(authHeader==null || !authHeader.startsWith("Bearer")){
            throw new ServletException();
        }
        else{
            String token=authHeader.substring(7);
            System.out.println(token);
            Claims claims= Jwts.parser().setSigningKey("idontsay").parseClaimsJws(token).getBody();
            System.out.println(claims);
            String currentEmail= (String) claims.get("emailId");
            System.out.println("................"+currentEmail);
            String currentRole= (String) claims.get("currentRole");
            System.out.println("/......."+currentRole);
            request.setAttribute("currentEmail",currentEmail);
            request.setAttribute("currentRole",currentRole);

            filterChain.doFilter(request,servletResponse);
            System.out.println("succes");

        }
    }
    }

