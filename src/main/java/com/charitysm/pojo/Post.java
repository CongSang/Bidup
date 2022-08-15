/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
 * @author CÔNG SANG
 */
@Entity
@Table(name = "post")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Post.findAll", query = "SELECT p FROM Post p"),
    @NamedQuery(name = "Post.findById", query = "SELECT p FROM Post p WHERE p.id = :id"),
    @NamedQuery(name = "Post.findByContent", query = "SELECT p FROM Post p WHERE p.content = :content"),
    @NamedQuery(name = "Post.findByImage", query = "SELECT p FROM Post p WHERE p.image = :image"),
    @NamedQuery(name = "Post.findByPostedDate", query = "SELECT p FROM Post p WHERE p.postedDate = :postedDate"),
    @NamedQuery(name = "Post.findByActive", query = "SELECT p FROM Post p WHERE p.active = :active"),
    @NamedQuery(name = "Post.findByHashtag", query = "SELECT p FROM Post p WHERE p.hashtag = :hashtag")})
public class Post implements Serializable {

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postId")
    @JsonIgnore
    private Set<ReportPost> reportPostSet;

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Size(max = 300)
    @Column(name = "content")
    private String content;
    @Size(max = 200)
    @Column(name = "image")
    private String image;
    @Basic(optional = false)
    @NotNull
    @Column(name = "posted_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date postedDate;
    @Column(name = "active")
    private Short active;
    @Size(max = 100)
    @Column(name = "hashtag")
    private String hashtag;
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @ManyToOne(optional = false)
    private User userId;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "postId")
    @JsonIgnore
    private Set<PostNotif> postNotifSet;
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "postId")
    @JsonIgnore
    private Set<Comment> commentSet;
    
    @Transient
    private int commentSetLength;
    
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "post")
    private Set<React> reactSet;

    public Post() {
    }

    public Post(Integer id) {
        this.id = id;
    }

    public Post(Integer id, Date postedDate) {
        this.id = id;
        this.postedDate = postedDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }

    public Short getActive() {
        return active;
    }

    public void setActive(Short active) {
        this.active = active;
    }

    public String getHashtag() {
        return hashtag;
    }

    public void setHashtag(String hashtag) {
        this.hashtag = hashtag;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    @XmlTransient
    public Set<PostNotif> getPostNotifSet() {
        return postNotifSet;
    }

    public void setPostNotifSet(Set<PostNotif> postNotifSet) {
        this.postNotifSet = postNotifSet;
    }

    @XmlTransient
    public Set<Comment> getCommentSet() {
        return commentSet;
    }

    public void setCommentSet(Set<Comment> commentSet) {
        this.commentSet = commentSet;
    }

    @XmlTransient
    public Set<React> getReactSet() {
        return reactSet;
    }

    public void setReactSet(Set<React> reactSet) {
        this.reactSet = reactSet;
    }
    
    @XmlTransient
    public Set<ReportPost> getReportPostSet() {
        return reportPostSet;
    }

    public void setReportPostSet(Set<ReportPost> reportPostSet) {
        this.reportPostSet = reportPostSet;
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
        if (!(object instanceof Post)) {
            return false;
        }
        Post other = (Post) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.Post[ id=" + id + " ]";
    }

    /**
     * @return the commentSetLength
     */
    public int getCommentSetLength() {
        return commentSetLength;
    }

    /**
     * @param commentSetLength the commentSetLength to set
     */
    public void setCommentSetLength(int commentSetLength) {
        this.commentSetLength = commentSetLength;
    }
    
}
