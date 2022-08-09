
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div id="chat-box">
    <div class="chat-box-header">
        <div class="d-flex justify-content-start align-items-center">
            <img src="${sessionScope.currentUser.getAvatar()}" alt="avatar" class="chat-user-avatar" />
            <h6 class="chat-box-userchat ms-2">Cong Sang</h6>
        </div>

            <div onclick="closeChatBox()">
            <i class="fa-solid fa-xmark chat-box--close"></i>
        </div>
    </div>

    <div class="chat-box-body w-100 d-flex flex-column">
        <div class="chat-box-message">
            <div class="message-container mCustomScrollbar">
                <div class="messages">
                    <div class="message-chat message--left new">
                        <img class="avatar" src="http://askavenue.com/img/17.jpg">
                        hehehe
                        <div class="send-time-left">16:20</div>
                    </div>

                    <div class="message-chat message--right new">
                        hehehe
                        <div class="send-time-right">16:20</div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="chat-box--send">
            <form class="d-flex justify-content-between align-items-center">
                <input type="text" placeholder="Aa" class="form-control chat-input" />

                <button type="submit" class="btn-send">
                    <i class="fa-solid fa-paper-plane p-2"></i>
                </button>
            </form>
        </div>
    </div>
</div>