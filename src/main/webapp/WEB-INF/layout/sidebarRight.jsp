<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="row g-3">
    <div class="col-12 ">
        <div class="card hashtag-card">
            <div class="card-header pb-0 pt-4 border-0">
                <h5 class="card-title mb-0">Hashtag hàng đầu</h5>
            </div>

            <div class="card-body pb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="hashtag-side">#hahaha</p>
                    <p class="post-count text-secondary">1200 bài viết</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="hashtag-side">#hahaha</p>
                    <p class="post-count text-secondary">134 bài viết</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="hashtag-side">#hahaha</p>
                    <p class="post-count text-secondary">50 bài viết</p>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <p class="hashtag-side">#hahaha</p>
                    <p class="post-count text-secondary">12 bài viết</p>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 mb-4">
        <div class="card chat-card">
            <div class="card-header pb-0 pt-4 border-0">
                <h5 class="card-title mb-0">Trò chuyện</h5>
            </div>

            <div class="card-body pb-3">
                <div class="d-flex justify-content-between align-items-center user-chat">
                    <div>
                        <c:url value="/resources/img/non-avatar.png" var="avatar" />
                        <img src="${avatar}" alt="avatar" class="user-img" />
                        <span class="ms-1">Username</span>
                    </div>
                    <div>
                        <i class="fa-brands fa-facebook-messenger chat-icon"></i>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center user-chat">
                    <div>
                        <c:url value="/resources/img/non-avatar.png" var="avatar" />
                        <img src="${avatar}" alt="avatar" class="user-img" />
                        <span class="ms-1">Username</span>
                    </div>
                    <div>
                        <i class="fa-brands fa-facebook-messenger chat-icon"></i>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center user-chat">
                    <div>
                        <c:url value="/resources/img/non-avatar.png" var="avatar" />
                        <img src="${avatar}" alt="avatar" class="user-img" />
                        <span class="ms-1">Username</span>
                    </div>
                    <div>
                        <i class="fa-brands fa-facebook-messenger chat-icon"></i>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center user-chat">
                    <div>
                        <c:url value="/resources/img/non-avatar.png" var="avatar" />
                        <img src="${avatar}" alt="avatar" class="user-img" />
                        <span class="ms-1">Username</span>
                    </div>
                    <div>
                        <i class="fa-brands fa-facebook-messenger chat-icon"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
