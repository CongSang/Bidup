/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.charitysm.pojo.enumtype;

/**
 *
 * @author CÔNG SANG
 */
public enum ReportType {
    PAY {
        public String message() {
            String  msg = "Đấu giá nhưng không thanh toán";
            return msg;
        }
    },
    WORDS {
        public String message() {
            String  msg = "Dùng từ ngữ không đúng đắn";
            return msg;
        }
    },
    IMAGE {
        public String message() {
            String  msg = "Ảnh bài viết không phù hợp";
            return msg;
        }
    },
    CONTENT {
        public String message() {
            String  msg = "Nội dung bài viết không phù hợp";
            return msg;
        }
    },
    SPAM {
        public String message() {
            String  msg = "Spam";
            return msg;
        }
    },
}
