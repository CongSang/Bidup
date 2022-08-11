<%@page import="com.fasterxml.jackson.core.JsonProcessingException"%>
<%@page import="com.fasterxml.jackson.databind.ObjectMapper"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="java.util.List"%>
<%@ page isErrorPage="true" %>
<%@ page errorPage="index.jsp" %>
<%@page import="com.charitysm.pojo.Post"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div>
    <div class="hashtag-header">
        <div class="hashtag-name-container">#${hashtag}</div>
        <div class="hashtag-name-container-desciption mb-3"></div>
        <div class="justify-content-center align-items-center mb-3" style="display: flex">
            <img src="https://res.cloudinary.com/dynupxxry/image/upload/v1660150941/netflix/pixel-cat_tueoj0.gif" width="70px" height="70px" alt="No data"/>
        </div>
    </div>
    <div class="home-content row justify-content-center container mx-auto g-0 pb-5">
        <div class="text-center mt-3 post-loading" id="loadingTop" style="display:none;">
            <div class="spinner-border text-muted"></div>
        </div>
        <div id="feeds-container" class="col-sm-12 col-md-12 col-lg-6">


            <div class="text-center mt-3 post-loading" id="loadingBottom">
                <div class="spinner-border text-muted"></div>
            </div>
        </div>
    </div>
</div>
<div id="modal01" class="modal align-items-center" onclick="this.style.display = 'none'">
    <div class="modal--picture position-relative d-flex align-items-center justify-content-center">
        <i class="fa-solid fa-xmark p-2 position-absolute" style="top: 0; right: 4px; font-size: 20px"></i>
        <img id="img01" style="max-width:100%; max-height:100vh;">
    </div>
</div>
<script src="<c:url value="/resources/js/feeds.js" />"></script>
<script src="<c:url value="/resources/js/comment.js" />"></script>
<script src="<c:url value="/resources/js/post.js" />"></script>
<script>
            window.onload = function () {
                $('.content').hide();
                currentUserId = '${sessionScope.currentUser.id}';
                postPage = 1;
                disableLoadMorePost = false;
                $('#userNotification').on("click", function () {
                    $('.notif-count').css('opacity', '0');
                });

                hashTagSearch();
            };
            $("textarea").hashtags();
</script>