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

    <div class="post">

        <!--Phan nay fecth du lieu de render-->
        <div class="card post--item">
            <div class="card-header border-0 pb-0 pt-3">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-start">
                        <div class="me-2">
                            <c:url value="/resources/img/non-avatar.png" var="avatar" />
                            <a href="#">
                                <img class="avatar-img rounded-circle" src="${avatar}" alt="">
                            </a>
                        </div>
                        <!-- Info -->
                        <div>
                            <div class="nav nav-divider">
                                <h6 class="nav-item card-title mb-0">
                                    <a href="#">Công Sang</a>
                                </h6>
                                <span class="ms-2 nav-item small text-secondary">2 tiếng trước</span>
                            </div>
                        </div>
                    </div>
                    <!--Menu-->
                    <div class="dropdown">
                        <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">

                            <!--Chuc nang chi nguoi dung so huu bai viet moi hien-->
                            <li>
                                <a class="dropdown-item" href="#">
                                    Chỉnh sửa bài viết
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    Báo cáo
                                </a>
                            </li>
                            <!--Chuc nang chi nguoi dung so huu bai viet moi hien-->
                            <li>
                                <a class="dropdown-item" href="#">
                                    Xóa bài viết
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="card-body pb-2">
                <p class="post--content mb-1">
                    I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.
                </p>
                <div class="post--hashtag mb-3">
                    <span>#hahaha</span>
                </div>
                <c:url value="/resources/img/bg-login.jpg" var="imageTest" />
                <img class="card-img post--img" src="${imageTest}" alt="Post image" onclick="showFull(this)">

                <div class="line"></div>

                <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                    <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                        <div class="post--action-hover">
                            <i class="fa-regular fa-heart post--action-icon"></i>
                            <span class="post--action-text">Thích (56)</span>
                        </div>
                    </div>
                    <div class="post--action-comment w-100 d-flex justify-content-center align-items-center">
                        <div class="post--action-hover" onclick="showComment()">
                            <i class="fa-regular fa-message post--action-icon"></i>
                            <span class="post--action-text">Bình luận</span>
                        </div>
                    </div>
                </div>

                <div class="comment">
                    <div class="d-flex align-items-center my-2">
                        <div class="me-2">
                            <c:url value="/resources/img/non-avatar.png" var="avatar" />
                            <a href="#">
                                <img class="comment--avatar rounded-circle" src="${avatar}" alt="">
                            </a>
                        </div>
                        <form class="w-100">
                            <input type="text" placeholder="Thêm bình luận" class="add-comment" />
                        </form>
                    </div>

                    <!--Phan render binh luan cua bai viet-->        
                    <div class="d-flex comment--item py-2">
                        <div class="me-2">
                            <c:url value="/resources/img/non-avatar.png" var="avatar" />
                            <a href="#">
                                <img class="comment--avatar rounded-circle" src="${avatar}" alt="">
                            </a>
                        </div>
                        <div>
                            <div class="bg-light comment--item-content">
                                <div class="d-flex justify-content-between">
                                    <h6 class="mb-1"><a href="#">Công Sang</a></h6>
                                    <small>5 tiếng</small>
                                </div>

                                <p class="small mb-0">
                                    See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex comment--item py-2">
                        <div class="me-2">
                            <c:url value="/resources/img/non-avatar.png" var="avatar" />
                            <a href="#">
                                <img class="comment--avatar rounded-circle" src="${avatar}" alt="">
                            </a>
                        </div>
                        <div>
                            <div class="bg-light comment--item-content">
                                <div class="d-flex justify-content-between">
                                    <h6 class="mb-1"><a href="#">Công Sang</a></h6>
                                    <small>5 tiếng</small>
                                </div>

                                <p class="small mb-0">
                                    Wishing calling is warrant settled was lucky.
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--Phan render binh luan cua bai viet-->   
                </div>
            </div>
        </div>

        <!--Phan nay fecth du lieu de render-->
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