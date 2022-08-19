/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.utils;

import com.charitysm.services.UserService;
import com.charitysm.services.impl.UserServiceImpl;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 *
 * @author CÔNG SANG
 */
@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String>{
    
    @Autowired
    private UserService userService;
    
    @Override
    public void initialize(UniqueEmail constraintAnnotation) {
        
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value != null && !this.userService.isEmailAlreadyInUse(value);
    }
}
