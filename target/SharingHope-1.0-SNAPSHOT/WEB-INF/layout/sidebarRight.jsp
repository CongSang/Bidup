<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="row g-3">
    <div class="col-12 ">
        <div class="card chat-card">
            <div class="card-header pb-0 pt-4 border-0 d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">Trò chuyện</h5>
                <div class="modal--close d-lg-none chat--close">
                    <i class="fa-solid fa-xmark p-2"></i>
                </div>
            </div>

            <div class="card-body pb-3 px-0">
                <div class="d-flex justify-content-between align-items-center mb-1 chat--item">
                    <div class="d-flex align-items-center">
                        <c:url value="/resources/img/non-avatar.png" var="avatar" />
                        <img class="avatar-img rounded-circle me-2" src="${avatar}" alt="">
                        <p class="chat-side">Username</p>
                    </div>
                    <i class="fa-solid fa-chevron-right go-search text-secondary"></i>
                </div>
                <div class="d-flex justify-content-between align-items-center chat--item">
                    <div class="d-flex align-items-center">
                        <c:url value="/resources/img/non-avatar.png" var="avatar" />
                        <img class="avatar-img rounded-circle me-2" src="${avatar}" alt="">
                        <p class="chat-side">Username</p>
                    </div>
                    <i class="fa-solid fa-chevron-right go-search text-secondary"></i>
                </div>
            </div>
        </div>
    </div>
</div>
