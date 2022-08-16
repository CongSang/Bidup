/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.utils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

/**
 *
 * @author CÔNG SANG
 */
@Constraint(validatedBy = UniqueEmailValidator.class)
@Retention(value = RetentionPolicy.RUNTIME)
@Target({ 
    ElementType.FIELD, 
    ElementType.METHOD })
public @interface UniqueEmail {
    public String message() default "Email này đã được sử dụng";
    public Class<?>[] groups() default {};
    public Class<? extends Payload>[] payload() default{};
}
