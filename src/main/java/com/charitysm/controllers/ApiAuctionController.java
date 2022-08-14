/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.controllers;

import com.charitysm.pojo.Auction;
import com.charitysm.pojo.Bid;
import com.charitysm.pojo.BidPK;
import com.charitysm.pojo.reobj.BidRequest;
import com.charitysm.pojo.User;
import com.charitysm.pojo.enumtype.NotifType;
import com.charitysm.pojo.reobj.AuctionRequest;
import com.charitysm.services.AuctionService;
import com.charitysm.services.BidService;
import com.charitysm.services.NotificationService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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

/**
 *
 * @author CÔNG SANG
 */
@RestController
@RequestMapping("/api")
public class ApiAuctionController {

    @Autowired
    private AuctionService auctionService;
    @Autowired
    private BidService bidService;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private Cloudinary cloudinary;
    @Autowired
    private NotificationService notificationService;

    @Async
    @GetMapping("/auction-side")
    public ResponseEntity<List<Auction>> getActionSideBar() {

        return new ResponseEntity<>(this.auctionService.getAuctionSideBar(), HttpStatus.OK);
    }
    
     @Async
    @GetMapping("/auction-single/{auctionId}")
    public ResponseEntity<Auction> getActionSingle(@PathVariable(value="auctionId") int auctionId) {

        return new ResponseEntity<>(this.auctionService.getAuctionById(auctionId), HttpStatus.OK);
    }

    @Async
    @GetMapping("/auctions")
    public ResponseEntity<List<Auction>> getPosts(@RequestParam Map<String, String> params) {

        return new ResponseEntity<>(this.auctionService.getAuctions(params), HttpStatus.OK);
    }

    @Async
    @RequestMapping("/create-auction")
    public ResponseEntity<Auction> createAuction(@RequestBody AuctionRequest ar, HttpSession session) throws ParseException {
        User u = (User) session.getAttribute("currentUser");
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date endDate = format.parse(ar.getEndDate() + " " + ar.getEndTime());

        Auction a = new Auction();
        a.setActive((short) 1);
        a.setContent(ar.getContent());
        a.setStartingPrice(ar.getStartPrice());
        a.setHashtag(ar.getHashtag());
        a.setAuctionDate(new Date());
        a.setEndDate(endDate);
        a.setImage(ar.getImgUrl());
        a.setUserId(u);
        a.setMailTo((short) 0);

        if (this.auctionService.createAuction(a) < 1) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(a, HttpStatus.CREATED);
    }

    @Async
    @PutMapping("/edit-auction/{auctionId}")
    public ResponseEntity<Auction> editPost(@PathVariable(value = "auctionId") int id,
            @RequestBody AuctionRequest ar, HttpSession session) throws IOException, ParseException {
        User u = (User) session.getAttribute("currentUser");
        Auction a = auctionService.getAuctionById(id);

        if (!a.getUserId().getId().equals(u.getId())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if (a != null) {
            a.setContent(ar.getContent());
            a.setHashtag(ar.getHashtag());
            a.setAuctionDate(new Date());
            if (!a.getImage().isEmpty() && !a.getImage().equals(ar.getImgUrl())) {
                String public_id = a.getImage().substring(a.getImage().lastIndexOf("public_id=") + 10);
                deleteImg(public_id);
            }

            a.setImage(ar.getImgUrl());
            if (this.auctionService.updateAuction(a) >= 1) {
                return new ResponseEntity<>(a, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Async
    @DeleteMapping("/auctions/{auctionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAuction(@PathVariable(value = "auctionId") int id) throws IOException {
        Auction a = this.auctionService.getAuctionById(id);
        if (a != null) {
            this.auctionService.deleteAuction(id);
            if (!a.getImage().isEmpty()) {
                String public_id = a.getImage().substring(a.getImage().lastIndexOf("public_id=") + 10);
                System.out.println(public_id);
                deleteImg(public_id);
            }
        }
    }

    public void sendEmail(String from, String to, String subject, String content, boolean isHtmlMail) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            
            if (isHtmlMail) {
                helper.setText("<html><body>" + content + "</html></body>", true);
            } else {
                helper.setText(content);
            }
            
            mailSender.send(mimeMessage);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Async
    @PutMapping("/send-email/{auctionId}")
    public ResponseEntity<Auction> sendEmailAuction(@PathVariable(value = "auctionId") int id,
            HttpSession session) throws IOException, ParseException {
        User u = (User) session.getAttribute("currentUser");
        Auction a = auctionService.getAuctionById(id);

        if (!a.getUserId().getId().equals(u.getId())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if (a != null) {
            for (Bid b : a.getBidSet()) {
                if (b.getIsWinner() == 1) {
                    sendEmail("honguyencongsang.dev@gmail.com", b.getUser().getEmail(), "ĐẤU GIÁ THÀNH CÔNG",
                            String.format("<p>Chúc mừng bạn %s đã đấu giá thành công bài viết của %s (%s). "
                                    + "Vui lòng thanh toán cho chủ sở hữu bài viết trong thời gian sớm nhất. "
                                    + "Cám ơn bạn đã tham gia.</p>"
                                    + "<img src='https://res.cloudinary.com/dynupxxry/image/upload/v1659719016/netflix/logo-sharing-hope_G_ql7czy.png' />",
                                    b.getUser().getFirstname(), u.getFirstname(), u.getEmail()), true);
                } else {
                    sendEmail("honguyencongsang.dev@gmail.com", b.getUser().getEmail(), "ĐẤU GIÁ THẤT BẠI",
                            String.format("<p>Bài đấu giá của %s (%s) đã quyết định được người chiến thắng. "
                                    + "Cám ơn bạn đã dành thời gian tham gia. Chúc bạn một ngày tốt lành.</p>"
                                    + "<img src='https://res.cloudinary.com/dynupxxry/image/upload/v1659719016/netflix/logo-sharing-hope_G_ql7czy.png' />",
                                    u.getFirstname(), u.getEmail()), true);
                }
            }

            a.setMailTo((short) 1);
            this.auctionService.sendEmailAuction(a);
            return new ResponseEntity<>(a, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Async
    @PutMapping("/confirm-auction/{auctionId}")
    public ResponseEntity<Auction> confirmCompleteCharity(@PathVariable(value = "auctionId") int id,
            HttpSession session) throws IOException, ParseException {
        User u = (User) session.getAttribute("currentUser");
        Auction a = auctionService.getAuctionById(id);

        if (!a.getUserId().getId().equals(u.getId())) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if (a != null) {
            a.setActive((short) 0);

            if (this.auctionService.updateAuction(a) >= 1) {
                return new ResponseEntity<>(a, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Async
    @PostMapping("/create-bid")
    public ResponseEntity<Bid> createBid(@RequestBody BidRequest b, HttpSession session) {
        Bid bid = new Bid();
        bid.setBidDate(new Date());
        bid.setMessage("");
        bid.setMoney(b.getMoney());
        bid.setIsWinner((short) 0);

        User u = (User) session.getAttribute("currentUser");
        Auction a = auctionService.getAuctionById(b.getAuctionId());

        BidPK bidPK = new BidPK();
        bidPK.setUserId(u.getId());
        bidPK.setAuctionId(b.getAuctionId());

        bid.setBidPK(bidPK);
        bid.setUser(u);
        bid.setAuction(a);
        
        return new ResponseEntity<>(this.bidService.createBid(bid), HttpStatus.CREATED);
    }

    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/delete-bid")
    public void deleteReact(@RequestBody BidRequest b, HttpSession session) {
        User u = (User) session.getAttribute("currentUser");
        Bid bid = bidService.findBid(u.getId(), b.getAuctionId());
        if (bid != null) {
            bidService.deleteBid(bid);
        }
    }

    public void deleteImg(String public_id) throws IOException {
        cloudinary.uploader().destroy(public_id,
                ObjectUtils.asMap("resource_type", "image"));
    }

    @Async
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/update-bid/{userId}")
    public void updateBid(@RequestBody BidRequest br, @PathVariable(value = "userId") String userId) {
        Bid b = this.bidService.findBid(userId, br.getAuctionId());

        if (b != null) {
            if (b.getIsWinner() == 0) {
                b.setIsWinner((short) 1);
            } else {
                b.setIsWinner((short) 0);
            }

            this.bidService.updateWinner(b);
        }
    }
}
