package com.charitysm.pojo;

import com.charitysm.pojo.base.ReportBase;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
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
public class ReportPost extends ReportBase implements Serializable {

    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;

    private static final long serialVersionUID = 1L;
    
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
        return !((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)));
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
}
