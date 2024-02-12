package com.stackroute.AppRouting;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient

public class AppRoutingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppRoutingApplication.class, args);
	}

}
