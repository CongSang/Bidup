/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.configs;

import com.charitysm.utils.NotificationCenter;
import com.charitysm.utils.RestFB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

/**
 *
 * @author ADMIN
 */
@Configuration
@PropertySource("classpath:configs.properties")
public class UtilsConfig {
    @Autowired
    private Environment env;
    
    @Bean
    public RestFB restFB() {
        RestFB r = new RestFB();
        r.setAppId(env.getProperty("fb.app_id"));
        r.setAppSecret(env.getProperty("fb.app_key"));
        r.setLinkGetToken(env.getProperty("fb.link_get_token"));
        r.setRedirectURL(env.getProperty("fb.rediect_url"));
        return r ;
    }
    
    @Bean
    public NotificationCenter notificationCenter() {
        return new NotificationCenter();
    }
}
