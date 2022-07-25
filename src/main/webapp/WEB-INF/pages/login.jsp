<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><tiles:insertAttribute name="title" /></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <c:url value="/resources/css/global.css" var="globalCss" />
        <c:url value="/resources/css/style.css" var="styleCss" />
        <c:url value="/resources/css/login.css" var="loginCss" />
        <link href="${globalCss}" rel="stylesheet" />
        <link href="${styleCss}" rel="stylesheet" />
        <link href="${loginCss}" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/b448f5f567.js" crossorigin="anonymous"></script>

</head>
<body>

    <div class="login">
        <div class="container" style="height: 70vh;">
            <div class="d-flex flex-column flex-md-row justify-content-center align-items-center w-100" style="height: 100%;">
                <div class="hide" style="width: 500px; max-width: 100%">
                    <c:url value="/resources/img/bg.png" var="bgLogin" />
                    <img src="${bgLogin}" class="bg-login" />
                </div>

                <div class="form-login">
                    <form:form method="post" modelAttribute="user">
                        <div class="form-group">
                            <form:input path="email" type="text" placeholder="Email"  cssClass="form-control" />
                        </div>
                        <div class="form-group">
                            <form:password path="password" placeholder="Mật khẩu" cssClass="form-control" />
                        </div>
                        <div class="form-group">
                            <form:button type="submit" class="b btn-login">Đăng nhập</form:button>
                            </div>

                    </form:form>

                    <p class="text-center my-2 text-secondary">Hoặc</p>
                    <div class="form-group">
                        <button class="b btn-google text-white">
                            <i class="fa-brands fa-google me-1"></i>
                            Đăng nhập với Google
                        </button>
                    </div>
                    
                    <a href="https://www.facebook.com/dialog/oauth?client_id=800114437619089&redirect_uri=http://localhost:8080/SharingHope/login-facebook&scope=email,public_profile">
                        <div class="form-group">
                        <button class="b btn-facebook text-white">
                            <i class="fa-brands fa-facebook me-1"></i>
                            Đăng nhập với Facebook
                        </button>
                    </div>
                    </a>

                    <div class="line"></div>

                    <div class="form-group">
                        <button class="b btn-register btn-show--register text-white">
                            Tạo tài khoản mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <tiles:insertAttribute name="footer" />

    <div class="modal">
        <div class="modal-container">
            <div class="modal-header">
                <h3 class="my-2">Đăng kí</h3>
                <div class="modal--close">
                    <i class="fa-solid fa-xmark p-2"></i>
                </div>
            </div>

            <div class="modal-body ">
                <div class="authentication register">
                    <form action="" class="form-register">

                        <div class="form-group d-flex">
                            <input type="text" placeholder="Họ*" required class="form-control-sm me-1">
                            <input type="text" placeholder="Tên*" required class="form-control-sm">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Email*" required class="form-control-sm">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Số điện thoại*" required class="form-control-sm">
                        </div>
                        <div class="form-group">
                            <input type="date" placeholder="Ngày sinh*" required class="form-control-sm">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Địa chỉ"  required class="form-control-sm">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Quê quán" required class="form-control-sm">
                        </div>
                        <div class="form-group">
                            <input type="text" placeholder="Nghề nghiệp" required class="form-control-sm">
                        </div> 
                        <div class="form-group">
                            <input type="text" placeholder="Mật khẩu*" required class="form-control-sm">
                        </div> 
                        <div class="form-group">
                            <input type="text" placeholder="Nhập lại mật khẩu*" required class="form-control-sm">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="b btn-register w-50">
                                Đăng kí
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <c:url value="/resources/js/login.js" var="loginJs" />
    <script src="${loginJs}"></script>
</body>
</html>
