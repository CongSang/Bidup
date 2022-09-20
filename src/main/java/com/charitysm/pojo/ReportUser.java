/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.charitysm.pojo.base.ReportBase;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author CÔNG SANG
 */
@Entity
@Table(name = "report_user")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ReportUser.findAll", query = "SELECT r FROM ReportUser r"),
    @NamedQuery(name = "ReportUser.findById", query = "SELECT r FROM ReportUser r WHERE r.id = :id"),
    @NamedQuery(name = "ReportUser.findByReason", query = "SELECT r FROM ReportUser r WHERE r.reason = :reason"),
    @NamedQuery(name = "ReportUser.findByIsSolve", query = "SELECT r FROM ReportUser r WHERE r.isSolve = :isSolve")})
public class ReportUser extends ReportBase implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @JoinColumn(name = "reported_user", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User reportedUser;
   
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;


    public ReportUser() {
    }

    public ReportUser(Integer id) {
        this.id = id;
    }

    public ReportUser(Integer id, String reason) {
        this.id = id;
        this.reason = reason;
    }


    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ReportUser)) {
            return false;
        }
        ReportUser other = (ReportUser) object;
        return !((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)));
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.ReportUser_1[ id=" + id + " ]";
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public User getReportedUser() {
        return reportedUser;
    }

    public void setReportedUser(User reportedUser) {
        this.reportedUser = reportedUser;
    }

}
