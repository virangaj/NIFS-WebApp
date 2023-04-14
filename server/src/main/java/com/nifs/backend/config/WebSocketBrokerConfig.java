package com.nifs.backend.config;

import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocket
public class WebSocketBrokerConfig implements WebSocketMessageBrokerConfigurer {

    public void configureMessageBroker(@NotNull MessageBrokerRegistry config){

        config.enableSimpleBroker("/all","/specific");
        config.setApplicationDestinationPrefixes("/app");

    }

    public void registerStompEndPoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws");
        registry.addEndpoint("/ws").withSockJS();
    }


}
