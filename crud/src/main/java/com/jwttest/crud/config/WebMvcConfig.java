package com.jwttest.crud.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final long MAX_AGE_SECS = 3600;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:9000","http://192.168.297.101:9000")
                .allowedMethods("GET","POSt","PUT","PATCH","DELETE","OPTIONS")
                .allowedHeaders("*")
                .maxAge(MAX_AGE_SECS);

    }


}
