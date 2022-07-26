
package com.charitysm.controllers.apis;

import com.charitysm.pojo.communicateObj.FileUploadResponse;
import com.charitysm.pojo.Post;
import com.charitysm.pojo.React;
import com.charitysm.pojo.ReactPK;
import com.charitysm.pojo.User;
import com.charitysm.pojo.communicateObj.PostRequest;
import com.charitysm.services.PostService;
import com.charitysm.services.ReactService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author CÔNG SANG
 */
@RestController
@RequestMapping("/api")
public class APIPostController {
    @Autowired
    private PostService postService;
    @Autowired
    private ReactService reactService;
    @Autowired
    private Cloudinary cloudinary;
    
    @Async
    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getPosts(@RequestParam Map<String, String> params, HttpSession session) {
        User currentUser = (User)session.getAttribute("currentUser");
        return new ResponseEntity<>(this.postService.getPosts(params, currentUser.getId()), HttpStatus.OK);
    }
    
    @Async
    @GetMapping("/find-post/{commentId}")
    public ResponseEntity<Post> findPost(@PathVariable(value="commentId") int commentId) {
        
        return new ResponseEntity<>(this.postService.findPostByCommentId(commentId), HttpStatus.OK);
    }
    
    @Async
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/create-react/{postId}")
    public void createReact(@PathVariable(value="postId") int postId, HttpSession session) throws IOException {
        React react = new React();
        react.setType((short)1);

        Post p = this.postService.getPostById(postId);
        User u = (User)session.getAttribute("currentUser");
        ReactPK rPK = new ReactPK();
        rPK.setPostId(postId);
        rPK.setUserId(u.getId());

        react.setReactPK(rPK);
        react.setPost(p);
        react.setUser(u);
        react.setCreatedDate(new Date());
        
        this.reactService.createReact(react);
    }
    
    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete-react/{postId}")
    public void deleteReact(@PathVariable(value="postId") int postId, HttpSession session) {
        User u = (User)session.getAttribute("currentUser");
        this.reactService.deleteReact(u.getId(), postId);
    }
    
    @Async
    @RequestMapping("/post-img")
    public ResponseEntity<FileUploadResponse> imagePosting(
            @RequestParam("file") MultipartFile image) {
        FileUploadResponse res = new FileUploadResponse();
        try {
            Map rs = cloudinary.uploader().upload(image.getBytes(),
                    ObjectUtils.asMap("resource_type", "auto"));
            
            res.setFileName("fileName");
            res.setUrl((String) rs.get("secure_url")+ "?public_id="+ rs.get("public_id"));
            res.setSize(12);
        } catch (IOException ex) {
            Logger.getLogger(APIPostController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(res, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
    @Async
    @RequestMapping("/create-post")
    public ResponseEntity<Post> createPost(@RequestBody PostRequest pr, HttpSession session) {
        User u = (User)session.getAttribute("currentUser");
        
        Post p = new Post();
        p.setContent(pr.getContent());
        p.setHashtag(pr.getHashtag());
        p.setImage(pr.getImgUrl());
        p.setPostedDate(new Date());
        p.setUserId(u);
        p.setActive((short)1);
        
        if(this.postService.createPost(p) < 1)
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        
        return new ResponseEntity<>(p, HttpStatus.CREATED);
    }
    
    
    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete-post/{id}")
    public void deletePost(@PathVariable(value="id") int id, HttpSession session) throws IOException {
        Post p = this.postService.getPostById(id);
        User u = (User) session.getAttribute("currentUser");
        if ((p != null && p.getUserId().getId().equals(u.getId())) || u.getUserRole().equals("ROLE_ADMIN")) {
            this.postService.deletePost(id);
            if (!p.getImage().isEmpty()) {
                String public_id = p.getImage().substring(p.getImage().lastIndexOf("public_id=") + 10);
                System.out.println(public_id);
                deleteImg(public_id);
            }
        }
    }
    
    public void deleteImg(String public_id) throws IOException {
        cloudinary.uploader().destroy(public_id,
                ObjectUtils.asMap("resource_type", "image"));
    }
    
    @Async
    @PutMapping("/edit-post/{id}")
    public ResponseEntity<Post> editPost(@PathVariable(value="id") int id
            , @RequestBody PostRequest pr, HttpSession session) throws IOException {
        User u = (User)session.getAttribute("currentUser");
        Post p = postService.getPostById(id);
        
        if (!p.getUserId().getId().equals(u.getId()))
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        if (p != null) {
            p.setContent(pr.getContent());
            p.setHashtag(pr.getHashtag());
            p.setPostedDate(new Date());
            if (!p.getImage().isEmpty() && !p.getImage().equals(pr.getImgUrl())) {
                String public_id = p.getImage().substring(p.getImage().lastIndexOf("public_id=") + 10);
                deleteImg(public_id);
            }
            
            p.setImage(pr.getImgUrl());
            if(this.postService.updatePost(p) >= 1)
                return new ResponseEntity<>(p, HttpStatus.OK);
        }
        
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
