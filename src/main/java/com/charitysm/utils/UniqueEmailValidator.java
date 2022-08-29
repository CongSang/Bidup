/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.utils;

import com.charitysm.services.UserService;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 *
 * @author CÔNG SANG
 */
@ComponentScan(basePackages = {
    "com.charitysm.controllers",
    "com.charitysm.repositories",
    "com.charitysm.services",})
@Component
@Order(Ordered.LOWEST_PRECEDENCE)
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String>{
    @Autowired
    private UserService userService;
    
    @Override
    public void initialize(UniqueEmail constraintAnnotation) {
        
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (userService == null)
                return true;
        
        return value != null && (userService != null && !userService.isEmailAlreadyInUse(value));
    }
}
