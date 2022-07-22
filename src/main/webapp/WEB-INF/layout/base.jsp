<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><tiles:insertAttribute name="title" /></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <c:url value="/resources/css/global.css" var="globalCss" />
        <c:url value="/resources/css/style.css" var="mainCss" />
        <c:url value="/resources/css/home.css" var="homeCss" />
        <link href="${globalCss}" rel="stylesheet" />
        <link href="${mainCss}" rel="stylesheet" />
        <link href="${homeCss}" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/b448f5f567.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="main">
            <tiles:insertAttribute name="header" />
            <div class="container content">
                <div class="row g-3">
                    <div class="d-lg-block d-none col-lg-3">
                        <tiles:insertAttribute name="sidebarLeft" />
                    </div>
                    <div class="col-sm-12 col-md-8 col-lg-6 g-3">
                        <tiles:insertAttribute name="content" />
                    </div>
                    <div class="col-lg-3">
                        <tiles:insertAttribute name="sidebarRight" />
                    </div>
                </div>
            </div>
            <tiles:insertAttribute name="footer" />
        </div>
        
        <c:url value="/resources/js/main.js" var="mainJs" />
        <script src="${mainJs}"></script>
    </body>
</html>
