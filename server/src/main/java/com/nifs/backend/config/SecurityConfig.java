package com.nifs.backend.config;

import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    private JwtAutheticationFilter jwtAuthFilter;


    @Autowired
    private AuthenticationProvider authenticationProvider;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers(

                        "/auth/**",
                        "/**",
                        "/admin/otherdata/**",
                        "/sedu/charges",
//                        designations
                        "/admin/designation",
                        "/admin/designation/newid",
                        "/admin/designation/get/**",
                        "/admin/designation/location/**",
//                        divisions
                        "/admin/division",
                        "/admin/division/newid",
                        "/admin/division/get/**",
                        "/admin/division/location/**",
//                        empoyee category
                        "/admin/employeecategory",
                        "/admin/employeecategory/newid",
                        "/admin/employeecategory/get/**",
                        "/admin/employeecategory/location/**",
//                         employee types
                        "/admin/employeetype",
                        "/admin/employeetype/location/**",
                        "/admin/employeetype/newid",
                        "/admin/employeetype/get/**",
//                      location
                        "/admin/locations",
                        "/admin/locations/get/**",
//                        facility
                        "/sedu/facility",
                        "/sedu/facility/newid",
//                        contract extension
                        "/admin/contractex",
                        "/**"

                        )
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
