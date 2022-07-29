<%@page import="com.restfb.types.User"%>
<%@page import="com.restfb.types.ProfilePictureSource"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="home-content">
    <div class="create-post card card-body">
        <div class="d-flex align-items-center mb-3">
            <div>
                <a href="#"> <img class="avatar-img rounded-circle" src="${currentUser.getAvatar()}" alt=""> </a>
            </div>
            <div class="btn-post w-100 d-flex align-items-center btn-show--post">
                <span class="pe-4 border-0 text-secondary">Bạn đang nghĩ gì thế?</input>
            </div>
        </div>

        <div class="photo-post">
            <div class="photo-post--item py-1 px-2 mb-0 text-secondary btn-show--post"> 
                <i class="fa-solid fa-image me-1 photo-icon"></i>
                Ảnh
            </div>
        </div>
    </div>
    <div id="feeds-container">

    </div>

    <div class="text-center mt-3 post-loading">
        <div class="spinner-border text-muted"></div>
    </div>

    <!--modal create post-->
    <div class="modal modal-post">
        <div class="modal-container modal-container-post">
            <div class="modal-header">
                <h5 class="my-2">Thêm bài viết</h5>
                <div class="modal--close modal--close-post">
                    <i class="fa-solid fa-xmark p-2"></i>
                </div>
            </div>

            <div class="modal-body ">
                <div class="d-flex mb-3">
                    <div>
                        <a href="#"> <img class="avatar-img rounded-circle" src="${currentUser.getAvatar()}" alt=""> </a>
                    </div>
                    <form class="w-100">
                        <textarea class="form-control pe-4 fs-4 lh-1 border-0" rows="2" placeholder="Bạn đang nghĩ gì thế?" style="height: 115px;"></textarea>
                    </form>
                </div>

                <div class="dropzone card shadow-none position-relative">
                    <img id="uploadPreview" />
                    <label class="d-flex align-items-center" style="cursor: pointer;">
                        <div class="d-flex justify-content-center align-items-center h-100">
                            <div class="d-flex flex-column justify-content-center align-items-center">
                                <i class="fa-solid fa-images images-icon"></i>
                                <p class="text-secondary mt-2">Nhấn để thêm ảnh</p>
                            </div>
                        </div>
                        <input id="uploadImage" type='file' name='upload-image' class='upload-image' onchange="previewImage()" />
                    </label>
                </div>
            </div>

            <div class="modal-footer ">
                <button type="button" class="btn btn-danger me-2 modal--close-post">Huỷ</button>
                <button type="button" class="btn btn-success">Đăng</button>
            </div>
        </div>
    </div>

    <div id="modal01" class="modal align-items-center" onclick="this.style.display = 'none'">
        <div class="modal--picture position-relative">
            <i class="fa-solid fa-xmark p-2 position-absolute" style="top: 0; right: 2px; font-size: 20px"></i>
            <img id="img01" style="width:100%">
        </div>
    </div>
</div>


<script src="<c:url value="/resources/js/post.js" />"></script>
<script src="<c:url value="/resources/js/comment.js" />"></script>
<script>
    <c:url value="/api/posts" var="endpoint" />
        $(function () {
            loadPosts('${endpoint}', '${currentUser.getId()}');

        });
        window.addEventListener("scroll", jQuery(function ($) {
            $('.home-content').on('scroll', function () {
                if ($(this).scrollTop() + $(this).innerHeight() >= ($(this)[0].scrollHeight - 0.4)) {
                    $('.post-loading').css("display", "block");
                    loadPosts('${endpoint}', '${currentUser.getId()}');
                }
            });
        }));

</script>