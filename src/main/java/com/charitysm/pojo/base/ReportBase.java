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
import javax.validation.constraints.Size;

/**
 *
 * @author ADMIN
 */
@MappedSuperclass
public class ReportBase extends Base{
    @Size(max = 7)
    @Column(name = "type")
    protected String type;
    @Basic(optional = false)
    @NotNull
    @Column(name = "reported_date")
    @Temporal(TemporalType.TIMESTAMP)
    protected Date reportedDate;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "reason")
    protected String reason;
    @Column(name = "is_solve")
    protected Short isSolve;
   
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Short getIsSolve() {
        return isSolve;
    }

    public void setIsSolve(Short isSolve) {
        this.isSolve = isSolve;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public Date getReportedDate() {
        return reportedDate;
    }

    public void setReportedDate(Date reportedDate) {
        this.reportedDate = reportedDate;
    }
}
