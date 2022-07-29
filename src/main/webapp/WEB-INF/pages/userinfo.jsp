<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><tiles:insertAttribute name="title" /></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-2.2.4.js"
                integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI="
        crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.28.0/moment.min.js" integrity="sha512-Q1f3TS3vSt1jQ8AwP2OuenztnLU6LwxgyyYOG1jgMW/cbEMHps/3wjvnl1P3WTrF3chJUWEoxDUEjMxDV8pujg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.28.0/locale/vi.min.js" integrity="sha512-KFhB7C5HhK+ySzLQNJveDmB1h8qlsd51JX0p5o/PwL4EPdbj+TlhdVENbR9SFn+sz2sX30M4nqchhtPmz/wtiw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
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

            <div class="user-profile">
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
                                    <img src="${avatar}" alt="avatar" class="user-avatar-img" />
                                    <div class="height-element d-flex align-items-center justify-content-center">
                                        <h1 class="user-profile-name">Cong Sang</h1>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center align-items-center">
                                    <div class="btn-fix-profile">
                                        <i class="fa-solid fa-pen me-2"></i>
                                        Cập nhật trang cá nhân
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="user-menu">
                            <div class="user-menu--item active">
                                <div class="user-menu--hover">
                                    Bài viết 
                                </div>
                            </div>
                            <div class="user-menu--item">
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
                                        <span class="intro-text">Ho Nguyen Cong Sang</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-envelope"></i>
                                        </div>
                                        <span class="intro-text">abc@gmail.com</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-house"></i>
                                        </div>
                                        <span class="intro-text">Sống tại hehehehe</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        <span class="intro-text">Sinh vien</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-phone"></i>
                                        </div>
                                        <span class="intro-text">0123456789</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-7 mt-0">
                            
                            <!--Phan nay render-->
                            <div class="post">
                                <div class="card post--item">
                                    <div class="card-header border-0 pb-0 pt-3">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-start">
                                                <div class="me-2">
                                                    <a href="#">
                                                        <c:url value="/resources/img/non-avatar.png" var="a" />
                                                        <img class="avatar-img rounded-circle" src="${a}" alt="">
                                                    </a>
                                                </div>
                                                <!-- Info -->
                                                <div>
                                                    <div class="nav nav-divider">
                                                        <h6 class="nav-item card-title mb-0">
                                                            <a href="#">Cong Sang</a>
                                                        </h6>
                                                        <span class="ms-2 nav-item small text-secondary">5 tieng truoc</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--Menu-->
                                            <div class="dropdown">
                                                <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-solid fa-ellipsis"></i>
                                                </a>
                                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                                                    <li>
                                                        <a class="dropdown-item" href="#">
                                                            Báo cáo
                                                        </a>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body pb-2">
                                        <p class="post--content mb-3">
                                            hahahahahahahahah
                                        </p>

                                        <p class="auction--price mb-3">
                                            Giá khởi điểm:<span class="ms-2">1.000.000 VNĐ</span>
                                        </p>

                                        <c:url value="/resources/img/bg-login.jpg" var="test" />
                                        <img class="card-img post--img" src="${test}" alt="Post image" onclick="showFull2(this)">

                                        <div class="line"></div>

                                        <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                                            <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                                <div class="auction--action-hover">
                                                    <i class="fa-solid fa-gavel"></i>
                                                    <span class="auction--action-text ms-2">Đấu giá (12 người đã tham gia)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="auction-user-join">
                                            <div class="d-flex align-items-center my-2">
                                                <div class="me-2">
                                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                                    <a href="#">
                                                        <img class="comment--avatar rounded-circle" src="${avatar}" alt="">
                                                    </a>
                                                </div>
                                                <form class="w-100">
                                                    <input type="text" placeholder="Nhập giá cạnh tranh (VNĐ)" class="add-comment" />
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                                                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>