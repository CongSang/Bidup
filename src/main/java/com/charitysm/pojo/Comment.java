/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.charitysm.pojo.base.Base;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author ADMIN
 */
@Entity
@Table(name = "comment")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Comment.findAll", query = "SELECT c FROM Comment c"),
    @NamedQuery(name = "Comment.findById", query = "SELECT c FROM Comment c WHERE c.id = :id"),
    @NamedQuery(name = "Comment.findByContent", query = "SELECT c FROM Comment c WHERE c.content = :content"),
    @NamedQuery(name = "Comment.findByCommentDate", query = "SELECT c FROM Comment c WHERE c.commentDate = :commentDate")})
public class Comment extends Base implements Serializable {

    @OneToMany(mappedBy = "parentId", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Comment> commentSet;
    
    @Transient
    private int commentSetLength;
    
    @JoinColumn(name = "parent_id", referencedColumnName = "id")
    @ManyToOne
    private Comment parentId;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "commentId", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<CommentNotif> commentNotifSet;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "comment")
    private Set<ReactComment> reactCommentSet;

    private static final long serialVersionUID = 1L;
    @Size(max = 200)
    @Column(name = "content")
    private String content;
    @Basic(optional = false)
    @NotNull
    @Column(name = "comment_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentDate;
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    @ManyToOne
    private Post postId;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;

    public Comment() {
    }

    public Comment(Integer id) {
        this.id = id;
    }

    public Comment(Integer id, Date commentDate) {
        this.id = id;
        this.commentDate = commentDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(Date commentDate) {
        this.commentDate = commentDate;
    }

    public Post getPostId() {
        return postId;
    }

    public void setPostId(Post postId) {
        this.postId = postId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
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
        if (!(object instanceof Comment)) {
            return false;
        }
        Comment other = (Comment) object;
        return !((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id)));
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.Comment[ id=" + id + " ]";
    }

    @XmlTransient
    public Set<ReactComment> getReactCommentSet() {
        return reactCommentSet;
    }

    public void setReactCommentSet(Set<ReactComment> reactCommentSet) {
        this.reactCommentSet = reactCommentSet;
    }

    @XmlTransient
    public Set<CommentNotif> getCommentNotifSet() {
        return commentNotifSet;
    }

    public void setCommentNotifSet(Set<CommentNotif> commentNotifSet) {
        this.commentNotifSet = commentNotifSet;
    }

    @XmlTransient
    public Set<Comment> getCommentSet() {
        return commentSet;
    }

    public void setCommentSet(Set<Comment> commentSet) {
        this.commentSet = commentSet;
    }

    public Comment getParentId() {
        return parentId;
    }

    public void setParentId(Comment parentId) {
        this.parentId = parentId;
    }

    /**
     * @return the commentSetLenght
     */
    @XmlTransient
    public int getCommentSetLength() {
        return commentSetLength;
    }

    /**
     * @param commentSetLength the commentSetLenght to set
     */
    public void setCommentSetLength(int commentSetLength) {
        this.commentSetLength = commentSetLength;
    }
    
}
