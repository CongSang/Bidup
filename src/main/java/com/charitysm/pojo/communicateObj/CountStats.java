/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo.communicateObj;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

/**
 *
 * @author ADMIN
 */
public class CountStats implements Serializable{
    private List<Long> countUser = Arrays.asList(new Long[12]);
    private List<Long> countPost = Arrays.asList(new Long[12]);
    private List<Long> countAuction = Arrays.asList(new Long[12]);
    private List<Long> countReportUser = Arrays.asList(new Long[12]);
    private List<Long> countReact = Arrays.asList(new Long[12]);
    private List<Long> countComment = Arrays.asList(new Long[12]);
    

    public CountStats() {
    }

    /**
     * @return the countUser
     */
    public List<Long> getCountUser() {
        return countUser;
    }

    /**
     * @param countUser the countUser to set
     */
    public void setCountUser(List<Long> countUser) {
        this.countUser = countUser;
    }

    /**
     * @return the countPost
     */
    public List<Long> getCountPost() {
        return countPost;
    }

    /**
     * @param countPost the countPost to set
     */
    public void setCountPost(List<Long> countPost) {
        this.countPost = countPost;
    }

    /**
     * @return the countAuction
     */
    public List<Long> getCountAuction() {
        return countAuction;
    }

    /**
     * @param countAuction the countAuction to set
     */
    public void setCountAuction(List<Long> countAuction) {
        this.countAuction = countAuction;
    }

    /**
     * @return the countReportUser
     */
    public List<Long> getCountReportUser() {
        return countReportUser;
    }

    /**
     * @param countReportUser the countReportUser to set
     */
    public void setCountReportUser(List<Long> countReportUser) {
        this.countReportUser = countReportUser;
    }

    /**
     * @return the countReact
     */
    public List<Long> getCountReact() {
        return countReact;
    }

    /**
     * @param countReact the countReact to set
     */
    public void setCountReact(List<Long> countReact) {
        this.countReact = countReact;
    }

    /**
     * @return the countComment
     */
    public List<Long> getCountComment() {
        return countComment;
    }

    /**
     * @param countComment the countComment to set
     */
    public void setCountComment(List<Long> countComment) {
        this.countComment = countComment;
    }

   
}
