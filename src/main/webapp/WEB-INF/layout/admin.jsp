<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><tiles:insertAttribute name="title" /></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.28.0/moment.min.js" integrity="sha512-Q1f3TS3vSt1jQ8AwP2OuenztnLU6LwxgyyYOG1jgMW/cbEMHps/3wjvnl1P3WTrF3chJUWEoxDUEjMxDV8pujg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.28.0/locale/vi.min.js" integrity="sha512-KFhB7C5HhK+ySzLQNJveDmB1h8qlsd51JX0p5o/PwL4EPdbj+TlhdVENbR9SFn+sz2sX30M4nqchhtPmz/wtiw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <script src="https://kit.fontawesome.com/b448f5f567.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        
        <c:url value="/resources/css/global.css" var="globalCss" />
        <c:url value="/resources/css/style.css" var="mainCss" />
        <link href="${globalCss}" rel="stylesheet" />
        <link href="${mainCss}" rel="stylesheet" />
        <link href="<c:url value="/resources/css/admin.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/home.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/login.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/notification.css" />" rel="stylesheet" />
    </head>
    <body>
        <tiles:insertAttribute name="header" />
        <div class="main admin-wrap">
            <div class="leftside-menu menuitem-active">
                <div class="admin-sidebar--close" onclick="closeSideBar()">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <div class="h-100 show" id="leftside-menu-container" data-simplebar="init">
                    <!--- Sidemenu -->
                    <ul class="side-nav">
                        <li class="side-nav-item">
                            <c:url value="/admin" var="chartUrl" />
                            <a href="${chartUrl}" class="side-nav-link">
                                <i class="fa-solid fa-chart-simple me-2"></i>
                                <span>Thống kê</span>
                            </a>
                        </li>

                        <li class="side-nav-item">
                            <a data-bs-toggle="collapse" href="#sidebarReport" aria-expanded="false" aria-controls="sidebarCrm" class="side-nav-link">
                                <i class="fa-solid fa-flag me-2"></i>
                                <span>Báo cáo</span>
                            </a>
                            <div class="collapse" id="sidebarReport">
                                <ul class="side-nav-second-level">
                                    <li>
                                        <c:url value="/admin/report-post" var="reportPostUrl" />
                                        <a href="${reportPostUrl}" class="side-nav-link">
                                            <i class="fa-solid fa-file-lines me-2"></i>
                                            Báo cáo bài viết
                                        </a>
                                    </li>
                                    <li>
                                        <c:url value="/admin/report-auction" var="reportAuctionUrl" />
                                        <a href="${reportAuctionUrl}" class="side-nav-link">
                                            <i class="fa-solid fa-gavel me-2"></i>
                                            Báo cáo bài đấu giá
                                        </a>
                                    </li>
                                    <li>
                                        <c:url value="/admin/report-user" var="reportUserUrl" />
                                        <a href="${reportUserUrl}" class="side-nav-link">
                                            <i class="fa-solid fa-user me-2"></i>
                                            Báo cáo người dùng
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="side-nav-item">
                            <c:url value="/admin/auction-check" var="cUrl" />
                            <a href="${cUrl}" class="side-nav-link">
                                <i class="fa-solid fa-circle-check me-2"></i>
                                <span>Duyệt bài đấu giá</span>
                            </a>
                        </li>
                        <li class="side-nav-item">
                            <c:url value="/admin/configurations" var="cUrl" />
                            <a href="${cUrl}" class="side-nav-link">
                                <i class="fa-solid fa-gear me-2"></i>
                                <span>Cấu hình trang web</span>
                            </a>
                        </li>
                        <li class="side-nav-item">
                            <c:url value="/admin/user-list" var="cUrl" />
                            <a href="${cUrl}" class="side-nav-link">
                                <i class="fa-solid fa-user-group me-1" style="font-size: 15px"></i>
                                <span>Danh sách người dùng</span>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>

            <div class="content-container">
                <tiles:insertAttribute name="content" />
                <footer class="footer-admin">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6">
                                <script>document.write(new Date().getFullYear());</script> © Bidup
                            </div>
                            <div class="col-md-6">
                                <div class="text-md-end footer-links">
                                    <a target="_blank" href="https://github.com/CongSang/SharingHope">Contact us</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        </div>

        <tiles:insertAttribute name="chatbox" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.5/dayjs.min.js" integrity="sha512-Ot7ArUEhJDU0cwoBNNnWe487kjL5wAOsIYig8llY/l0P2TUFwgsAHVmrZMHsT8NGo+HwkjTJsNErS6QqIkBxDw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="<c:url value="/resources/js/main.js" />"></script>
        <script src="<c:url value="/resources/js/home.js" />"></script>
        <script src="<c:url value="/resources/js/admin.js" />"></script>
        <script src="<c:url value="/resources/js/search.js" />"></script>
        <script src="<c:url value="/resources/js/chat.js" />"></script>
        <script src="<c:url value="/resources/js/userPage.js" />"></script>
        <script src="<c:url value="/resources/js/items.js" />"></script>
    </body>
</html>
