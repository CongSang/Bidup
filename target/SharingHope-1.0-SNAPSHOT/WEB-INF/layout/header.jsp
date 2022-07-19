<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
        <c:url value="/" var="homeUrl"></c:url>
        <li class="nav-item active">
            <a class="nav-link" href="${homeUrl}">Trang chủ</a>
        </li>
        <c:url value="/test" var="testUrl"></c:url>
        <li class="nav-item">
            <a class="nav-link" href="${testUrl}">Danh mục</a>
        </li>
    </ul>
</nav>