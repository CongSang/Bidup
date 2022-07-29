
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<div class="home-content">
    <div class="create-post card card-body">
        <div class="d-flex align-items-center mb-3">
            <div>
                <a href="#"> <img class="avatar-img rounded-circle" src="${currentUser.getAvatar()}" alt=""> </a>
            </div>
            <div class="btn-post w-100 d-flex align-items-center btn-show--auction">
                <span class="pe-4 border-0 text-secondary">Bạn đang nghĩ gì thế?</input>
            </div>
        </div>

        <div class="photo-post">
            <div class="photo-post--item py-1 px-2 mb-0 text-secondary btn-show--auction"> 
                <i class="fa-solid fa-image me-1 photo-icon"></i>
                Ảnh
            </div>
        </div>
    </div>

    <div class="auction-container">

        <!--Bai dau gia nguoi khac thay-->
        <div class="post">
            <div class="card post--item">
                <div class="card-header border-0 pb-0 pt-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-start">
                            <div class="me-2">
                                <a href="#">
                                    <c:url value="/resources/img/non-avatar.png" var="a" />
                                    <img class="avatar-img rounded-circle" src="${a}" alt="">
                                </a>
                            </div>
                            <!-- Info -->
                            <div>
                                <div class="nav nav-divider">
                                    <h6 class="nav-item card-title mb-0">
                                        <a href="#">Cong Sang</a>
                                    </h6>
                                    <span class="ms-2 nav-item small text-secondary">5 tieng truoc</span>
                                </div>
                            </div>
                        </div>
                        <!--Menu-->
                        <div class="dropdown">
                            <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        Báo cáo
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body pb-2">
                    <p class="post--content mb-3">
                        hahahahahahahahah
                    </p>

                    <p class="auction--price mb-3">
                        Giá khởi điểm:<span class="ms-2">1.000.000 VNĐ</span>
                    </p>

                    <c:url value="/resources/img/bg-login.jpg" var="test" />
                    <img class="card-img post--img" src="${test}" alt="Post image" onclick="showFull2(this)">

                    <div class="line"></div>

                    <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                        <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                            <div class="auction--action-hover">
                                <i class="fa-solid fa-gavel"></i>
                                <span class="auction--action-text ms-2">Đấu giá (12 người đã tham gia)</span>
                            </div>
                        </div>
                    </div>

                    <div class="auction-user-join">
                        <div class="d-flex align-items-center my-2">
                            <div class="me-2">
                                <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="${avatar}" alt="">
                                </a>
                            </div>
                            <form class="w-100">
                                <input type="text" placeholder="Nhập giá cạnh tranh (VNĐ)" class="add-comment" />
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!--Bai dau gia cua chu so huu thay-->                        
        <div class="post">
            <div class="card post--item">
                <div class="card-header border-0 pb-0 pt-3">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="d-flex align-items-start">
                            <div class="me-2">
                                <a href="#">
                                    <c:url value="/resources/img/non-avatar.png" var="a" />
                                    <img class="avatar-img rounded-circle" src="${a}" alt="">
                                </a>
                            </div>
                            <!-- Info -->
                            <div>
                                <div class="nav nav-divider">
                                    <h6 class="nav-item card-title mb-0">
                                        <a href="#">Cong Sang</a>
                                    </h6>
                                    <span class="ms-2 nav-item small text-secondary">5 tieng truoc</span>
                                </div>
                            </div>
                        </div>
                        <!--Menu-->
                        <div class="dropdown">
                            <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                                <li>
                                    <a class="dropdown-item" href="#">
                                        Báo cáo
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="card-body pb-2">
                    <p class="post--content mb-3">
                        hahahahahahahahah
                    </p>

                    <p class="auction--price mb-3">
                        Giá khởi điểm:<span class="ms-2">1.000.000 VNĐ</span>
                    </p>

                    <c:url value="/resources/img/bg-login.jpg" var="test" />
                    <img class="card-img post--img" src="${test}" alt="Post image" onclick="showFull2(this)">

                    <div class="line"></div>

                    <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                        <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                            <div class="auction--action-hover">
                                <i class="fa-solid fa-eye"></i>
                                <span class="auction--action-text ms-2">Theo dõi (12 người đã tham gia)</span>
                            </div>
                        </div>
                    </div>

                    <div class="auction-user-join">

                        <div class="d-flex comment--item py-2">
                            <div class="me-2">
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="${avatar}" alt="avatar">
                                </a>
                            </div>
                            <div>
                                <div class="bg-light comment--item-content">
                                    <div class="d-flex justify-content-between">
                                        <h6 class="mb-1 me-2"><a href="#">Cong Sang</a></h6>
                                        <small>1 giay truoc</small>
                                    </div>

                                    <p class="small mb-0">
                                        9.000.000
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <!--modal create post-->
    <div class="modal modal-auction">
        <div class="modal-container modal-container-auction">
            <div class="modal-header">
                <h5 class="my-2">Thêm bài viết</h5>
                <div class="modal--close modal--close-auction">
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
                    <label class="d-flex align-items-center justify-content-center" style="cursor: pointer;">
                        <img id="uploadPreview1" />
                        <div class="d-flex justify-content-center align-items-center h-100">
                            <div class="d-flex flex-column justify-content-center align-items-center">
                                <i class="fa-solid fa-images images-icon"></i>
                                <p class="text-secondary mt-2">Nhấn để thêm ảnh</p>
                            </div>
                        </div>
                        <input id="uploadImage1" type='file' name='upload-image' class='upload-image' onchange="previewImage1()" />
                    </label>
                </div>
            </div>

            <div class="modal-footer ">
                <button type="button" class="btn btn-danger me-2 modal--close-auction">Huỷ</button>
                <button type="button" class="btn btn-success">Đăng</button>
            </div>
        </div>
    </div>  

    <div id="modal02" class="modal align-items-center" onclick="this.style.display = 'none'">
        <div class="modal--picture position-relative">
            <i class="fa-solid fa-xmark p-2 position-absolute" style="top: 0; right: 4px; font-size: 20px"></i>
            <img id="img02" style="width:100%">
        </div>
    </div>
</div>

<script src="<c:url value="/resources/js/auction.js" />"></script>