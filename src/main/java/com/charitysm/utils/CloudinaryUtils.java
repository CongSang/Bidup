/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

/**
 *
 * @author ADMIN
 */
public class CloudinaryUtils {
    private static Cloudinary cloudinary;
    static {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "quoc2401",
                "api_key", "847526293459521",
                "api_secret", "Ahw_gyTqo8_Nq_4yupKm0BJ5uto",
                "secure", true
        ));
    }

    /**
     * @return the cloudinary
     */
    public static Cloudinary getCloudinary() {
        return cloudinary;
    }
    
}
