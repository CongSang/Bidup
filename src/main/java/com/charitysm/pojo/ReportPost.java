/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

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
@Table(name = "report_post")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ReportPost.findAll", query = "SELECT r FROM ReportPost r"),
    @NamedQuery(name = "ReportPost.findById", query = "SELECT r FROM ReportPost r WHERE r.id = :id"),
    @NamedQuery(name = "ReportPost.findByReason", query = "SELECT r FROM ReportPost r WHERE r.reason = :reason"),
    @NamedQuery(name = "ReportPost.findByIsSolve", query = "SELECT r FROM ReportPost r WHERE r.isSolve = :isSolve")})
public class ReportPost implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Column(name = "reported_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportedDate;

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 7)
    @Column(name = "reason")
    private String reason;
    @Column(name = "is_solve")
    private Short isSolve;
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private Post postId;

    public ReportPost() {
    }

    public ReportPost(Integer id) {
        this.id = id;
    }

    public ReportPost(Integer id, String reason) {
        this.id = id;
        this.reason = reason;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public Post getPostId() {
        return postId;
    }

    public void setPostId(Post postId) {
        this.postId = postId;
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
        if (!(object instanceof ReportPost)) {
            return false;
        }
        ReportPost other = (ReportPost) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.ReportPost[ id=" + id + " ]";
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Date getReportedDate() {
        return reportedDate;
    }

    public void setReportedDate(Date reportedDate) {
        this.reportedDate = reportedDate;
    }
    
}
