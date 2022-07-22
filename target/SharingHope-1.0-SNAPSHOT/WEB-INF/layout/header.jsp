<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<header class="navbar-light fixed-top header-static">
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="/">
                <c:url value="/resources/img/logo.png" var="logo" />
                <img class="light-mode-item navbar-brand-item logo-img" src="${logo}" alt="logo">
            </a>

            <button class="navbar-toggler ms-auto icon-md px-2 py-1 collapsed" type="button" 
                    data-bs-toggle="collapse" data-bs-target="#navbarCollapse" 
                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>

            <div class="navbar-collapse collapse" id="navbarCollapse">
                <div class="nav my-3 my-lg-0 flex-nowrap align-items-center px-2 px-lg-0">
                    <div class="nav-item w-100">
                        <form class="form-search position-relative">
                            <input class="form-control ps-5 bg-light w-100" type="search" placeholder="Tìm kiếm" aria-label="Search">
                            <button class="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y" type="submit">
                                <i class="fa-solid fa-magnifying-glass text-secondary"></i>
                            </button>
                        </form>
                    </div>
                </div>

                <ul class="navbar-nav navbar-nav-scroll ms-auto">
                    <li class="nav-item px-2">
                        <a class="nav-link active" href="/SharingHope" id="homeMenu">
                            <i class="fa-solid fa-house menu-icon"></i>
                            Trang chủ
                        </a>
                    </li>
                    <li class="nav-item px-2">
                        <a class="nav-link" href="#" id="auction">
                            <i class="fa-solid fa-gavel menu-icon"></i>
                            Đấu giá
                        </a>
                    </li>
                    
                    <!--Link này dành cho admin đăng nhập mới hiển thị-->
<!--                    <li class="nav-item px-2">
                        <a class="nav-link" href="#" id="chart">
                            <i class="fa-solid fa-chart-simple menu-icon"></i>
                            Thống kê & báo cáo
                        </a>
                    </li>-->


                    <li class="d-lg-none d-block nav-item px-2">
                        <a class="nav-link" href="#" id="notify">
                            <i class="fa-solid fa-bell menu-icon"></i>
                            Thông báo
                        </a>
                    </li>
                    <li class="d-lg-none d-block nav-item px-2">
                        <a class="nav-link d-flex align-items-center" href="#" id="userMenu">
                            <c:url value="/resources/img/non-avatar.png" var="avatar" />
                            <img src="${avatar}" alt="avatar" class="user-img me-2" />
                            Username
                        </a>
                    </li>
                </ul>
            </div>

            <div class="d-lg-flex d-none flex-nowrap align-items-center ms-4">
                <div>
                    <i class="fa-solid fa-bell me-4 notify-icon"></i>
                </div>
                <div>
                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                    <img src="${avatar}" alt="avatar" class="user-img" />
                </div>
            </div>
        </div>
    </nav>
</header>