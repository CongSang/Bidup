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
        @Override
        public String toString() {
            String  msg = "Đấu giá nhưng không thanh toán";
            return msg;
        }
    },
    WORDS {
        @Override
        public String toString() {
            String  msg = "Dùng từ ngữ không đúng đắn";
            return msg;
        }
    },
    IMAGE {
        @Override
        public String toString() {
            String  msg = "Ảnh bài viết không phù hợp";
            return msg;
        }
    },
    CONTENT {
        @Override
        public String toString() {
            String  msg = "Nội dung bài viết không phù hợp";
            return msg;
        }
    },
    SPAM {
        @Override
        public String toString() {
            String  msg = "Spam";
            return msg;
        }
    },
}
