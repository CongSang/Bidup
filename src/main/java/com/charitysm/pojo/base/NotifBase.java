/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo.base;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author ADMIN
 */
@MappedSuperclass
public class NotifBase extends Base{
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 13)
    @Column(name = "type")
    protected String type;
    @Column(name = "is_read")
    protected Boolean isRead;
    

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the isRead
     */
    public Boolean getIsRead() {
        return isRead;
    }

    /**
     * @param isRead the isRead to set
     */
    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
}
