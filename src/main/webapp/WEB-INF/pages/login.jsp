<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/fmt" prefix = "fmt" %>

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
                        <c:if test="${param.error != null}">
                            <div class="alert alert-danger">
                                <fmt:bundle basename = "messages">
                                    <fmt:message key = "user.login.error1"/><br/>
                                </fmt:bundle>
                            </div>
                        </c:if>
                        <c:if test="${param.accessDenied != null}">
                            <div class="alert alert-danger">
                                <fmt:bundle basename = "messages">
                                    <fmt:message key = "user.login.error2"/><br/>
                                </fmt:bundle>
                            </div>
                        </c:if>
                        <c:url value="/login" var="action" />
                        <form action="${action}" method="post">
                            <div class="form-group">
                                <input type="text" name="email" placeholder="Email"  class="form-control" />
                            </div>
                            <div class="form-group">
                                <input type="password" name="password" placeholder="Mật khẩu" class="form-control" />
                            </div>
                            <div class="form-group">
                                <input type="submit" class="b btn-login" value="Đăng nhập" />
                            </div>
                        </form>

                        <p class="text-center my-2 text-secondary">Hoặc</p>
                        <a href="#">
                            <div class="form-group">
                                <button class="b btn-google text-white">
                                    <i class="fa-brands fa-google me-1"></i>
                                    Đăng nhập với Google
                                </button>
                            </div>
                        </a>

                        <a href="https://www.facebook.com/dialog/oauth?client_id=800114437619089&redirect_uri=http://localhost:8080/SharingHope/login-facebook&scope=email,public_profile">
                            <div class="form-group">
                                <button class="b btn-facebook text-white">
                                    <i class="fa-brands fa-facebook-f me-1"></i>
                                    Đăng nhập với Facebook
                                </button>
                            </div>
                        </a>

                        <div class="line"></div>

                        <div class="form-group">
                            <button class="b btn-register text-white">
                                <c:url value="/register" var="reUrl" />
                                <a href="${reUrl}">Tạo tài khoản mới</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <tiles:insertAttribute name="footer" />

        <c:url value="/resources/js/login.js" var="loginJs" />
        <script src="${loginJs}"></script>
    </body>
</html>
