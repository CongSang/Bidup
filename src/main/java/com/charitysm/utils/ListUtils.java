/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.utils;

import java.util.List;

/**
 *
 * @author ADMIN
 */
public class ListUtils {
    
    public static int sumInt(List<Integer> list) {
        if(list==null || list.size()<1)
            return 0;

        int sum = 0;
        for(Integer i: list)
          sum = sum + i;

        return sum;
    }
    
    public static long sumLong(List<Long> list) {
        if(list==null || list.size()<1)
            return 0;

        long sum = 0;
        for(Long i: list)
          sum = sum + i;

        return sum;
    }
}
