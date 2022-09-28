package com.charitysm.pojo;

import com.charitysm.pojo.base.ReactBase;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 *
 * @author ADMIN
 */
@Entity
@Table(name = "react")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "React.findAll", query = "SELECT r FROM React r"),
    @NamedQuery(name = "React.findByUserId", query = "SELECT r FROM React r WHERE r.reactPK.userId = :userId"),
    @NamedQuery(name = "React.findByPostId", query = "SELECT r FROM React r WHERE r.reactPK.postId = :postId"),
    @NamedQuery(name = "React.findByType", query = "SELECT r FROM React r WHERE r.type = :type"),
    @NamedQuery(name = "React.findByCreatedDate", query = "SELECT r FROM React r WHERE r.createdDate = :createdDate"),
    @NamedQuery(name = "React.findForUser", query = "SELECT r FROM React r WHERE r.reactPK.userId = :userId AND r.reactPK.postId = :postId")})
public class React extends ReactBase implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    @OnDelete(action = OnDeleteAction.CASCADE)
    protected ReactPK reactPK;
   
    @JoinColumn(name = "post_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    @JsonIgnore
    private Post post;
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne(optional = false)
    private User user;

    public React() {
    }

    public React(ReactPK reactPK) {
        this.reactPK = reactPK;
    }

    public React(ReactPK reactPK, Date createdDate) {
        this.reactPK = reactPK;
        this.createdDate = createdDate;
    }

    public React(String userId, int postId) {
        this.reactPK = new ReactPK(userId, postId);
    }

    public ReactPK getReactPK() {
        return reactPK;
    }

    public void setReactPK(ReactPK reactPK) {
        this.reactPK = reactPK;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (reactPK != null ? reactPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof React)) {
            return false;
        }
        React other = (React) object;
        return !((this.reactPK == null && other.reactPK != null) || (this.reactPK != null && !this.reactPK.equals(other.reactPK)));
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.React[ reactPK=" + reactPK + " ]";
    }
    
}
