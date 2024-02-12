package com.bankit.pg;

import com.example.MovieService.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class PgApplication {

	public static void main(String[] args) {
		SpringApplication.run(PgApplication.class, args);
	}
	
	

//	@Bean
//    public WebMvcConfigurer corsConfigurer()
//    {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
//            }
//        };
//    }
@Bean
public FilterRegistrationBean filterBean(){
	FilterRegistrationBean registrationBean=new FilterRegistrationBean<>();
	registrationBean.setFilter(new JwtFilter());
	registrationBean.addUrlPatterns("/payUser/v1/*");
	return registrationBean;
}
}
