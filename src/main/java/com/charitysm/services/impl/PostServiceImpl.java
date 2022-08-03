/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.services.impl;

import com.charitysm.pojo.Post;
import com.charitysm.repositories.PostRepository;
import com.charitysm.services.PostService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ADMIN
 */
@Service
public class PostServiceImpl implements PostService{
    @Autowired
    private PostRepository postRepository;

    @Override
    public List<Post> getPosts(Map<String, String> params, int page) {
        return this.postRepository.getPosts(params, page);
    }

    @Override
    public int countPosts() {
        return this.postRepository.countPosts();
    }

    @Override
    public Post getPostById(int id) {
        return this.postRepository.getPostById(id);
    }

    @Override
    public int createPost(Post p) {
        return this.postRepository.createPost(p);
    }

    @Override
    public void deletePost(int id) {
        this.postRepository.deletePost(id);
    }
    
}
