package com.nifs.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;




@Log4j2
@Configuration
@SecuritySchemes({
        @SecurityScheme(name = "bearerToken", type = SecuritySchemeType.HTTP,
                scheme = "bearer", bearerFormat = "JWT", in = SecuritySchemeIn.HEADER)
})
@OpenAPIDefinition
public class SwaggerConfig {
    //    swagger
    @Bean
    public OpenAPI baseOpenApi(){
        try{
            return new OpenAPI().info(new Info().title("NIFS Server").version("1.0.0").description("Swagger Documentation for NIFS web server"));
        }catch(Exception e){
            log.info(e.toString());
            return null;
        }
    }

}
