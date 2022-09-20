/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo.base;

import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author ADMIN
 */
@MappedSuperclass
public class ReactBase {
    @Column(name = "type")
    protected Short type;
    @Basic(optional = false)
    @NotNull
    @Column(name = "created_date")
    @Temporal(TemporalType.TIMESTAMP)
    protected Date createdDate;
    
     public Short getType() {
        return type;
    }

    public void setType(Short type) {
        this.type = type;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

}
