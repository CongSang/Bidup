<%@page import="com.fasterxml.jackson.core.JsonProcessingException"%>
<%@page import="com.fasterxml.jackson.databind.ObjectMapper"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="java.util.List"%>
<%@ page isErrorPage="true" %>
<%@ page errorPage="index.jsp" %>
<%@page import="com.charitysm.pojo.Post"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div class="hashtag-header">
    <div class="hashtag-name-container">#${hashtag}</div>
    <div class="hashtag-name-container-desciption"></div>
</div>
<div class="home-content row justify-content-center">
    <div class="text-center mt-3 post-loading" id="loadingTop" style="display:none;">
        <div class="spinner-border text-muted"></div>
    </div>
    <div id="feeds-container" class="col-md-6">

    </div>

    <div class="text-center mt-3 post-loading" id="loadingBottom">
        <div class="spinner-border text-muted"></div>
    </div>
</div>
<script src="<c:url value="/resources/js/feeds.js" />"></script>
<script src="<c:url value="/resources/js/comment.js" />"></script>
<script src="<c:url value="/resources/js/main.js" />"></script>
<script src="<c:url value="/resources/js/post.js" />"></script>
<script>
    window.onload = function() {
        currentUserId = '${sessionScope.currentUser.id}';
        postPage = 1;
        disableLoadMorePost = false;
        getNotifs();
        $('#userNotification').on("click", function () {
                $('.notif-count').css('opacity', '0');
        });
            
        hashTagSearch();
    };
    $("textarea").hashtags();
</script>