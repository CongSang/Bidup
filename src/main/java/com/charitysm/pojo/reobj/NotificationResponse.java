/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo.reobj;

import com.charitysm.pojo.enumtype.NotifType;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public class NotificationResponse {
    private int targetId ; 
    private NotifType type;
    private boolean is_read;
    private int count;
    private String last_modified_name;
    private String last_modified_avatar;
    private Date last_modified;
    private int notifId;
    
    public NotificationResponse() {
    }


    /**
     * @return the type
     */
    public NotifType getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(NotifType type) {
        this.type = type;
    }

    /**
     * @return the is_read
     */
    public boolean isIs_read() {
        return is_read;
    }

    /**
     * @param is_read the is_read to set
     */
    public void setIs_read(boolean is_read) {
        this.is_read = is_read;
    }

    /**
     * @return the count
     */
    public int getCount() {
        return count;
    }

    /**
     * @param count the count to set
     */
    public void setCount(int count) {
        this.count = count;
    }

    /**
     * @return the last_modified_name
     */
    public String getLast_modified_name() {
        return last_modified_name;
    }

    /**
     * @param last_modified_name the last_modified_name to set
     */
    public void setLast_modified_name(String last_modified_name) {
        this.last_modified_name = last_modified_name;
    }

    /**
     * @return the last_modified_avatar
     */
    public String getLast_modified_avatar() {
        return last_modified_avatar;
    }

    /**
     * @param last_modified_avatar the last_modified_avatar to set
     */
    public void setLast_modified_avatar(String last_modified_avatar) {
        this.last_modified_avatar = last_modified_avatar;
    }

    /**
     * @return the last_modified
     */
    public Date getLast_modified() {
        return last_modified;
    }

    /**
     * @param last_modified the last_modified to set
     */
    public void setLast_modified(Date last_modified) {
        this.last_modified = last_modified;
    }

    /**
     * @return the notifId
     */
    public int getNotifId() {
        return notifId;
    }

    /**
     * @param notifId the notifId to set
     */
    public void setNotifId(int notifId) {
        this.notifId = notifId;
    }

    /**
     * @return the targetId
     */
    public int getTargetId() {
        return targetId;
    }

    /**
     * @param targetId the targetId to set
     */
    public void setTargetId(int targetId) {
        this.targetId = targetId;
    }

}
