<%@page import="java.util.stream.Collectors"%>
<%@page import="com.charitysm.pojo.User"%>
<%@page import="com.charitysm.pojo.React"%>
<%@page import="com.charitysm.pojo.Post"%>
<%@page import="java.util.List"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<div class="home-content">
    <div id="feeds-container">
        <div class="post" id="post${post.id}">
            <div class="card post--item mt-0">
                <div class="card-header border-0 pb-0 pt-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-start">
                            <div class="me-2">

                                <a href="<c:url value="/user/${post.userId.id}"/>">
                                    <img class="avatar-img rounded-circle" src="${post.userId.avatar}" alt="">
                                </a>
                            </div>

                            <div>
                                <div class="nav nav-divider">
                                    <h6 class="nav-item card-title mb-0">

                                        <a href="<c:url value="/user/${post.userId.id}" />">${post.userId.lastname} ${post.userId.firstname}</a>
                                    </h6>
                                    <span class="ms-2 nav-item small text-secondary" id="timeFromNow"></span>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown">
                            <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                                <c:if test="${post.userId.id == sessionScope.currentUser.id}">
                                    <li>
                                        <a class="dropdown-item" href="#" onclick="editPost(${post.id}, this)">Chỉnh sửa bài viết</a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#" onclick="deletePost(${post.id}, this)">Xóa bài viết</a>
                                    </li>
                                </c:if>
                                <c:if test="${post.userId.id != sessionScope.currentUser.id}">
                                    <li>
                                        <a class="dropdown-item" href="#">Báo cáo</a>
                                    </li>
                                </c:if>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="card-body pb-2">
                    <p class="post--content mb-3 content--hashtag post-${post.id}">
                        ${post.content}
                    </p>
                    <!--<img class="card-img post--img" src="" alt="Post image" onclick="showFull(this)" style="display:none;">-->

                    <img class="card-img post--img" src="${post.image}" alt="Post image" onclick="showFull(this)">


                    <div class="line"></div>

                    <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                        <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                            <div class="post--action-hover" id="likeAction" onclick="createReact('${post.id}', this)">
                                <%
                                    Post p = (Post) request.getAttribute("post");
                                    List<String> rUserListId = p.getReactSet().stream().map(React::getUser).map(User::getId).collect(Collectors.toList());
                                    User currentUser = (User) session.getAttribute("currentUser");
                                    if (rUserListId.contains(currentUser.getId()))
                                        out.write("<div class='heart-like-button liked'></div>");
                                    else
                                        out.write("<div class='heart-like-button'></div>");
                                %>
                                <span class="post--action-text ms-2">Thích (<span id="likeCounter">${fn:length(post.reactSet)}</span>)</span>
                            </div>
                        </div>
                        <div class="post--action-comment w-100 d-flex justify-content-center align-items-center">
                            <div class="post--action-hover" onclick="showComment(this, ${post.id})">
                                <i class="fa-regular fa-message post--action-icon"></i>
                                <span class="post--action-text ms-2">Bình luận (<span id="commentCounter">${fn:length(post.commentSet)}</span>)</span>
                            </div>
                        </div>
                    </div>

                    <div class="comment">
                        <div class="d-flex align-items-center my-2">
                            <div class="me-2">
                                <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="${sessionScope.currentUser.avatar}" alt="">
                                </a>
                            </div>
                            <form class="w-100" onsubmit="addComment('${post.id}', this)" id="commentForm">
                                <input name="commentContent" type="text" placeholder="Thêm bình luận" class="add-comment" />
                            </form>
                        </div>
                        <div class="text-center mt-3 comment-loading" style="display:none;">
                            <div class="spinner-border text-muted"></div>
                        </div>
                        <div id="commentedComment" class="flex">
                            <c:if test="${post.userId.id == sessionScope.currentUser.id}"></c:if>
                            </div>
                            
                            <!--show more comment-->
                            <div class="show-more-comment">
                                <span class="showMore">Xem thêm bình luận</span>
                                <span>10/20</span>
                            </div>
                        </div>
                    </div>
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
    <script src="<c:url value="/resources/js/comment.js" />"></script>
<script src="<c:url value="/resources/js/post.js" />"></script>
<script src="<c:url value="/resources/js/feeds.js" />"></script>
<script>
        window.onload = function () {
            currentUserId = '${sessionScope.currentUser.id}';
            $('#userNotification').on("click", function () {
                $('.notif-count').css('opacity', '0');
            });
        };
        $(function () {
            $('.sidebar-right').hide();
        });
        $('#timeFromNow').text(moment('${post.postedDate}').fromNow());
        customHashtag(`.post-${post.id}`);

//    ((${post.reactSet}).some((react) => react.userId.id === currentUserId)) ?
//        ($('.heart-like-button').addClass('liked')) : ``;
</script>