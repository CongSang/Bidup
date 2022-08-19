<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page session="true" %>
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
        <script src="<c:url value="/resources/js/hashtag/jquery.hashtags.js" />"></script>
        <script src="<c:url value="/resources/js/hashtag/jquery.autosize.js" />"></script>
        <script src="<c:url value="/resources/js/main.js" />"></script>
        
        
        <c:url value="/resources/css/global.css" var="globalCss" />
        <c:url value="/resources/css/style.css" var="mainCss" />
        <c:url value="/resources/css/home.css" var="homeCss" />
        <link href="${globalCss}" rel="stylesheet" />
        <link href="${mainCss}" rel="stylesheet" />
        <link href="${homeCss}" rel="stylesheet" />
        <link href="<c:url value="/resources/css/notification.css"/>" rel="stylesheet" />
        <link href="<c:url value="/resources/css/auction.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/search.css"/>" rel="stylesheet" />
        <link href="<c:url value="/resources/css/comment.css"/>" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/b448f5f567.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <script>
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '800114437619089',
                    autoLogAppEvents: true,
                    xfbml: true,
                    version: 'v14.0'
                });
            };
        </script>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
        <div class="main">
            <tiles:insertAttribute name="header" />
            <tiles:insertAttribute name="singleContent"/>
                <div class="container content">
                <div class="row g-3">
                    <div class="d-lg-block d-none col-lg-3">
                        <tiles:insertAttribute name="sidebarLeft" />
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-6 g-3">
                        <tiles:insertAttribute name="content" />
                    </div>
                    <div class="d-lg-block d-none col-lg-3 sidebar-right">
                        <tiles:insertAttribute name="sidebarRight" />
                    </div>
                </div>
            </div>
            <tiles:insertAttribute name="footer" />
        </div>
            <tiles:insertAttribute name="chatbox" />
        <script src="<c:url value="/resources/js/chat.js" />"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.5/dayjs.min.js" integrity="sha512-Ot7ArUEhJDU0cwoBNNnWe487kjL5wAOsIYig8llY/l0P2TUFwgsAHVmrZMHsT8NGo+HwkjTJsNErS6QqIkBxDw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="<c:url value="/resources/js/search.js" />"></script>
    </body>
</html>
