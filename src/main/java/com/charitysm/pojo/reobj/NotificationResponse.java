/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo.reobj;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public class NotificationResponse {
    private List<Map<String, Object>> data ; 

    public NotificationResponse() {
    }

    /**
     * @return the data
     */
    public List<Map<String, Object>> getData() {
        return data;
    }

    /**
     * @param data the data to set
     */
    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }

    
    
}
