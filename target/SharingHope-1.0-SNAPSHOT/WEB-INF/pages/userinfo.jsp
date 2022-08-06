<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><tiles:insertAttribute name="title" /></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.28.0/moment.min.js" integrity="sha512-Q1f3TS3vSt1jQ8AwP2OuenztnLU6LwxgyyYOG1jgMW/cbEMHps/3wjvnl1P3WTrF3chJUWEoxDUEjMxDV8pujg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.28.0/locale/vi.min.js" integrity="sha512-KFhB7C5HhK+ySzLQNJveDmB1h8qlsd51JX0p5o/PwL4EPdbj+TlhdVENbR9SFn+sz2sX30M4nqchhtPmz/wtiw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

        <script src="<c:url value="/resources/js/hashtag/jquery.hashtags.js" />"></script>
        <script src="<c:url value="/resources/js/hashtag/jquery.autosize.js" />"></script>

        <c:url value="/resources/css/global.css" var="globalCss" />
        <c:url value="/resources/css/style.css" var="mainCss" />
        <c:url value="/resources/css/home.css" var="homeCss" />
        <link href="${globalCss}" rel="stylesheet" />
        <link href="${mainCss}" rel="stylesheet" />
        <link href="${homeCss}" rel="stylesheet" />
        <link href="<c:url value="/resources/css/auction.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/userinfo.css" />" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/b448f5f567.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="main">
            <tiles:insertAttribute name="header" />

            <div class="user-profile home-content">
                <div class="wrap">
                    <div class="container">
                        <div class="user-profile-header d-flex flex-column justify-content-start align-items-start">
                            <div class="w-100">
                                <img src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                                     alt="cover-image"
                                     class="cover-img "
                                     />
                            </div>

                            <div class="user-avatar d-flex flex-lg-row flex-column align-items-center justify-content-between w-100">
                                <div class="d-flex flex-lg-row flex-column justify-content-center align-items-center position-relative">
                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                    <img src="${userInfo.avatar}" alt="avatar" class="user-avatar-img" />
                                    <div class="height-element d-flex align-items-center justify-content-center">
                                        <h1 class="user-profile-name">${userInfo.lastname} ${userInfo.firstname}</h1>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center align-items-center">
                                    <c:if test="${userInfo.id == currentUser.id}">
                                        <div class="btn-fix-profile">
                                            <i class="fa-solid fa-pen me-2"></i>
                                            Cập nhật trang cá nhân
                                        </div>
                                    </c:if>
                                    <c:if test="${userInfo.id != currentUser.id}">
                                        <div class="btn-report-user">
                                            <i class="fa-solid fa-flag me-2"></i>
                                            Báo cáo người dùng
                                        </div>
                                    </c:if>
                                </div>
                            </div>
                        </div>

                        <div class="user-menu">
                            <div class="user-menu--item active userPost" id="userPost" onclick="menu(this)">
                                <div class="user-menu--hover">
                                    Bài viết 
                                </div>
                            </div>
                            <div class="user-menu--item userAuction" id="userAuction" onclick="menu(this)">
                                <div class="user-menu--hover">
                                    Đấu giá
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container user-profile--content">
                    <div class="row g-3">
                        <div class="col-12 col-lg-5">
                            <div class="card user-intro">
                                <div class="card-header pb-0 pt-3 border-0">
                                    <h5 class="card-title mb-0">Giới thiệu</h5>
                                </div>

                                <div class="card-body pb-2">
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-a"></i>
                                        </div>
                                        <span class="intro-text">${userInfo.lastname} ${userInfo.firstname}</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-envelope"></i>
                                        </div>
                                        <span class="intro-text">${userInfo.email}</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-house"></i>
                                        </div>
                                        <span class="intro-text">Sống tại ${userInfo.address}</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        <span class="intro-text">${userInfo.job}</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-phone"></i>
                                        </div>
                                        <span class="intro-text">${userInfo.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-7 mt-0">
                            <div class="text-center mt-3 post-loading" id="userLoadingTop" style="display:none;">
                                <div class="spinner-border text-muted"></div>
                            </div>

                            <div class="user-content-container"></div>

                            <div class="text-center mt-3 user-loading" style="display:none;">
                                <div class="spinner-border text-muted"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: none" class="sidebar-right"><tiles:insertAttribute name="sidebarRight" /></div>
        <tiles:insertAttribute name="footer" />

        <div id="modal01" class="modal align-items-center" onclick="this.style.display = 'none'">
            <div class="modal--picture position-relative d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-xmark p-2 position-absolute" style="top: 0; right: 4px; font-size: 20px"></i>
                <img id="img01" style="max-width:100%; max-height:100vh;">
            </div>
        </div>

        <div id="modal02" class="modal align-items-center justify-content-center" onclick="this.style.display = 'none'">
            <div class="modal--picture position-relative d-flex align-items-center justify-content-center">
                <i class="fa-solid fa-xmark p-2 position-absolute" style="top: 0; right: 4px; font-size: 24px"></i>
                <img id="img02" style="max-width:100%; max-height:100vh;">
            </div>
        </div>

        <div class="send-email-loading">
            <div class="spinner-border text-light"></div>
            <p class="ms-3 mb-0">Đang gửi email...</p>
        </div>

        <script src="<c:url value="/resources/js/main.js" />"></script>
        <script src="<c:url value="/resources/js/userPage.js" />"></script>
        <script src="<c:url value="/resources/js/auction.js" />"></script>
        <script src="<c:url value="/resources/js/bid.js" />"></script>
        <script src="<c:url value="/resources/js/post.js" />"></script>
        <script src="<c:url value="/resources/js/comment.js" />"></script>
        <script>
            <c:url value="/api/user/${userInfo.id}/auctions" var="endpoint1" />
            <c:url value="/api/user/${userInfo.id}/posts" var="endpoint2" />
            $(function () {
                if ($('#userAuction').hasClass('active')) {
                    loadUserAuctions('${endpoint1}', '${currentUser.getId()}');
                } else {
                    loadUserPosts('${endpoint2}', '${currentUser.getId()}');
                }
            });

            function menu(element) {
                if ($(element).hasClass('active')) {
                    return;
                } else {
                    $(element).parents('.user-menu').find('.user-menu--item.active').removeClass('active');
                    $(element).addClass('active');
                    if ($(element).hasClass('userAuction')) {
                        $('.user-content-container').html('');
                        loadUserAuctions('${endpoint1}', '${currentUser.getId()}');
                    }
                    if ($(element).hasClass('userPost')) {
                        $('.user-content-container').html('');
                        loadUserPosts('${endpoint2}', '${currentUser.getId()}');
                    }
                }
            }
        </script>
    </body>
</html>