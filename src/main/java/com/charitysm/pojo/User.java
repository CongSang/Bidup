/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo;

import com.charitysm.utils.UniqueEmail;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ADMIN
 */
@Entity
@Table(name = "user")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "User.findAll", query = "SELECT u FROM User u"),
    @NamedQuery(name = "User.findById", query = "SELECT u FROM User u WHERE u.id = :id"),
    @NamedQuery(name = "User.findByEmail", query = "SELECT u FROM User u WHERE u.email = :email"),
    @NamedQuery(name = "User.findByPassword", query = "SELECT u FROM User u WHERE u.password = :password"),
    @NamedQuery(name = "User.findByFirstname", query = "SELECT u FROM User u WHERE u.firstname = :firstname"),
    @NamedQuery(name = "User.findByLastname", query = "SELECT u FROM User u WHERE u.lastname = :lastname"),
    @NamedQuery(name = "User.findByBirthdate", query = "SELECT u FROM User u WHERE u.birthdate = :birthdate"),
    @NamedQuery(name = "User.findByAddress", query = "SELECT u FROM User u WHERE u.address = :address"),
    @NamedQuery(name = "User.findByHometown", query = "SELECT u FROM User u WHERE u.hometown = :hometown"),
    @NamedQuery(name = "User.findByJob", query = "SELECT u FROM User u WHERE u.job = :job"),
    @NamedQuery(name = "User.findByPhone", query = "SELECT u FROM User u WHERE u.phone = :phone"),
    @NamedQuery(name = "User.findByCreatedDate", query = "SELECT u FROM User u WHERE u.createdDate = :createdDate"),
    @NamedQuery(name = "User.findByAvatar", query = "SELECT u FROM User u WHERE u.avatar = :avatar"),
    @NamedQuery(name = "User.findByUserRole", query = "SELECT u FROM User u WHERE u.userRole = :userRole"),
    @NamedQuery(name = "User.findByActive", query = "SELECT u FROM User u WHERE u.active = :active")})
public class User implements Serializable {

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<CommentNotif> commentNotifSet;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<ReportAuction> reportAuctionSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<ReportPost> reportPostSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<ReportUser> reportUserSet;

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "id")
    private String id;
    @Pattern(regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message = "{user.register.emailErr}")//if the field contains email address consider using this annotation to enforce field validation
    @UniqueEmail(message = "{user.register.uniqueEmail}")
    @Basic(optional = false)
    @NotNull(message = "{user.register.notnullErr}")
    @Size(min = 1, max = 45)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @NotNull
    @Size(min = 6, max = 100, message = "{user.register.minPassErr}")
    @Column(name = "password")
    @JsonIgnore
    private String password;
    @Basic(optional = false)
    @NotNull(message = "{user.register.notnullErr}")
    @Size(min = 1, max = 45)
    @Column(name = "firstname")
    private String firstname;
    @Basic(optional = false)
    @NotNull(message = "{user.register.notnullErr}")
    @Size(min = 1, max = 45)
    @Column(name = "lastname")
    private String lastname;
    @Basic(optional = false)
    @NotNull(message = "{user.register.notnullErr}")
    @Column(name = "birthdate")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date birthdate;
    @Size(max = 45)
    @Column(name = "address")
    private String address;
    @Size(max = 45)
    @Column(name = "hometown")
    private String hometown;
    @Size(max = 45)
    @Column(name = "job")
    private String job;
    @Pattern(regexp = "^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$", message = "{user.register.phoneErr}")//if the field contains phone or fax number consider using this annotation to enforce field validation
    @Size(max = 45)
    @Column(name = "phone")
    private String phone;
    @Basic(optional = false)
    @Column(name = "created_date")
    @Temporal(TemporalType.DATE)
    private Date createdDate;
    @Size(max = 200)
    @Column(name = "avatar")
    private String avatar;
    @Basic(optional = false)
    @Column(name = "user_role")
    private String userRole;
    @Column(name = "active")
    private Short active;
    @JoinTable(name = "follow", joinColumns = {
        @JoinColumn(name = "follower_id", referencedColumnName = "id")}, inverseJoinColumns = {
        @JoinColumn(name = "followed_id", referencedColumnName = "id")})
    @ManyToMany
    @JsonIgnore
    private Set<User> userSet;
    @ManyToMany(mappedBy = "userSet")
    @JsonIgnore
    private Set<User> userSet1;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<Post> postSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<PostNotif> postNotifSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<Comment> commentSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIgnore
    private Set<React> reactSet;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user")
    @JsonIgnore
    private Set<ReactComment> reactCommentSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    @JsonIgnore
    private Set<Bid> bidSet;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userId")
    @JsonIgnore
    private Set<Auction> auctionSet;
    @Transient
    @JsonIgnore
    @XmlTransient
    private MultipartFile file;

    public User() {
    }

    public User(String id) {
        this.id = id;
    }

    public User(String id, String email, String password, String firstname, String lastname, Date birthdate, Date createdDate, String userRole) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.createdDate = createdDate;
        this.userRole = userRole;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHometown() {
        return hometown;
    }

    public void setHometown(String hometown) {
        this.hometown = hometown;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public Short getActive() {
        return active;
    }

    public void setActive(Short active) {
        this.active = active;
    }

    @XmlTransient
    public Set<User> getUserSet() {
        return userSet;
    }

    public void setUserSet(Set<User> userSet) {
        this.userSet = userSet;
    }

    @XmlTransient
    public Set<User> getUserSet1() {
        return userSet1;
    }

    public void setUserSet1(Set<User> userSet1) {
        this.userSet1 = userSet1;
    }

    @XmlTransient
    public Set<Post> getPostSet() {
        return postSet;
    }

    public void setPostSet(Set<Post> postSet) {
        this.postSet = postSet;
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
    public Set<Bid> getBidSet() {
        return bidSet;
    }

    public void setBidSet(Set<Bid> bidSet) {
        this.bidSet = bidSet;
    }

    @XmlTransient
    public Set<Auction> getAuctionSet() {
        return auctionSet;
    }

    public void setAuctionSet(Set<Auction> auctionSet) {
        this.auctionSet = auctionSet;
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
        if (!(object instanceof User)) {
            return false;
        }
        User other = (User) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.charitysm.pojo.User[ id=" + id + " ]";
    }

    @XmlTransient
    public Set<ReportAuction> getReportAuctionSet() {
        return reportAuctionSet;
    }

    public void setReportAuctionSet(Set<ReportAuction> reportAuctionSet) {
        this.reportAuctionSet = reportAuctionSet;
    }

    @XmlTransient
    public Set<ReportPost> getReportPostSet() {
        return reportPostSet;
    }

    public void setReportPostSet(Set<ReportPost> reportPostSet) {
        this.reportPostSet = reportPostSet;
    }

    @XmlTransient
    public Set<ReportUser> getReportUserSet() {
        return reportUserSet;
    }

    public void setReportUserSet(Set<ReportUser> reportUserSet) {
        this.reportUserSet = reportUserSet;
    }

    /**
     * @return the file
     */
    @XmlTransient
    public MultipartFile getFile() {
        return file;
    }

    /**
     * @param file the file to set
     */
    public void setFile(MultipartFile file) {
        this.file = file;
    }

    /**
     * @return the reactCommentSet
     */
    public Set<ReactComment> getReactCommentSet() {
        return reactCommentSet;
    }

    /**
     * @param reactCommentSet the reactCommentSet to set
     */
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
    
}
