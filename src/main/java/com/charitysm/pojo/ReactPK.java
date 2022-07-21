/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author CÔNG SANG
 */
@Embeddable
public class ReactPK implements Serializable {

    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "user_id")
    private String userId;
    @Basic(optional = false)
    @NotNull
    @Column(name = "post_id")
    private int postId;

    public ReactPK() {
    }

    public ReactPK(String userId, int postId) {
        this.userId = userId;
        this.postId = postId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userId != null ? userId.hashCode() : 0);
        hash += (int) postId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ReactPK)) {
            return false;
        }
        ReactPK other = (ReactPK) object;
        if ((this.userId == null && other.userId != null) || (this.userId != null && !this.userId.equals(other.userId))) {
            return false;
        }
        if (this.postId != other.postId) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.ReactPK[ userId=" + userId + ", postId=" + postId + " ]";
    }
    
}
