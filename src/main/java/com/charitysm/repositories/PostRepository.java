/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.charitysm.repositories;

import com.charitysm.pojo.Post;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ADMIN
 */
public interface PostRepository {

    List<Post> getPosts(Map<String, String> params, String currentUserId);

    List<Post> getFollowPosts(Map<String, String> params, String currentUserId);

    long countPostStats(int month, int year);

    Post getPostById(int id);

    int createPost(Post p);

    void deletePost(int id);

    int updatePost(Post p);

    Post findPostByCommentId(int commentId);

    List<Post> getUserPosts(String userId, int page);
}
