package com.stackroute.TvShowService;

import com.stackroute.TvShowService.filter.JWTFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class TvShowServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TvShowServiceApplication.class, args);
		System.out.println("tv show main application");


		System.out.println("tv show main application.......");

	}
	@Bean
	public FilterRegistrationBean filterBean(){
		FilterRegistrationBean registrationBean=new FilterRegistrationBean<>();
		registrationBean.setFilter(new JWTFilter());
		registrationBean.addUrlPatterns("/tvShow/user/*");
		return registrationBean;
	}

}
