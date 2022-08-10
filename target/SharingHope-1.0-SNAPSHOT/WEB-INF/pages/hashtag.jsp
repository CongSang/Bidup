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
    <div class="hashtag-name-container-desciption">3.5N bai viet voi hash tag nay</div>
</div>
<div class="home-content">
    <div class="text-center mt-3 post-loading" id="loadingTop" style="display:none;">
        <div class="spinner-border text-muted"></div>
    </div>
    <div id="feeds-container">

    </div>

    <div class="text-center mt-3 post-loading" id="loadingBottom">
        <div class="spinner-border text-muted"></div>
    </div>
</div>
<script>
    hashTagSearch('${hashtag}');
    $("textarea").hashtags();
</script>