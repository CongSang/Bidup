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
            <div class="btn-post w-100 d-flex align-items-center btn-show--modal">
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
    <div class="text-center mt-3 post-loading" id="loadingTop" style="display:none;">
        <div class="spinner-border text-muted"></div>
    </div>
    <div id="feeds-container">

    </div>
            
    <div class="auction-container">

    </div>

    <div class="text-center mt-3 post-loading" id="loadingBottom">
        <div class="spinner-border text-muted"></div>
    </div>

    <!--modal create post-->
    <div id="modalCreatePost" class="modal modal-post">
        <div class="modal-container modal-container-post">
            <div class="modal-header">
                <h5 class="my-2">Thêm bài viết</h5>
                <div class="modal--close modal--close-post modal-close-btn">
                    <i class="fa-solid fa-xmark p-2"></i>
                </div>
            </div>

            <div class="modal-body ">
                <div class="d-flex mb-3">
                    <div>
                        <a href="#"> <img class="avatar-img rounded-circle" src="${currentUser.getAvatar()}" alt=""> </a>
                    </div>
                    <form class="w-100">
                        <textarea id="statusContent" class="form-control ms-2 pe-4 border-0 theSelector" rows="2" placeholder="Bạn đang nghĩ gì thế?" style="height: 115px;"></textarea>
                    </form>
                </div>

                <div class="dropzone card shadow-none w-100">
                    <div class="d-flex modal--remove-img justify-content-end" onclick="removeImg(this)">
                        <i class="fa-solid fa-xmark p-2"></i>
                    </div>
                    <label class="d-flex align-items-center justify-content-center" style="cursor: pointer;">
                        <img class="imagePreview" id="uploadPreview" />
                        <div class="d-flex justify-content-center align-items-center h-100">
                            <div class="d-flex flex-column justify-content-center align-items-center">
                                <i class="fa-solid fa-images images-icon"></i>
                                <p class="text-secondary mt-2">Nhấn để thêm ảnh</p>
                            </div>
                        </div>
                        <input id="uploadImage" type='file' name='upload-image' class='upload-image' onchange="previewImage(this)" />
                    </label>
                </div>
            </div>

            <div class="modal-footer ">
                <button type="button" class="btn btn-danger me-2 modal-close-btn modal--close-post">Huỷ</button>
                <button type="button" class="btn btn-success" onclick="createPost()">Đăng</button>
            </div>
        </div>
    </div>

    <div id="modal01" class="modal align-items-center" onclick="this.style.display = 'none'">
        <div class="modal--picture position-relative d-flex align-items-center justify-content-center">
            <img id="img01" style="max-width:100%; max-height:100vh;">
        </div>
    </div>
                    
        <!--modal create post-->
    <div class="modal modal-auction modal-post">
        <div class="modal-container modal-container-auction">
            <div class="modal-header">
                <h5 class="my-2">Thêm bài viết đấu giá</h5>
                <div class="modal--close modal--close-auction modal-close-btn">
                    <i class="fa-solid fa-xmark p-2"></i>
                </div>
            </div>

            <div class="modal-body ">
                <div class="d-flex mb-2">
                    <div>
                        <a href="#"> <img class="avatar-img rounded-circle" src="${currentUser.getAvatar()}" alt=""> </a>
                    </div>

                    <form class="w-100" id="postAuctionForm">
                        <textarea id="statusContent1" class="form-control ms-2 pe-1 border-0 theSelector" rows="2" placeholder="Bạn đang nghĩ gì thế?" style="height: 115px;"></textarea>
                    </form>
                </div>
                <div class="form-group mt-2">
                    <label for="start-price" class="small">Giá khởi điểm</label>
                    <input id="start-price" type="number" class="form-control"/>
                    <span class="text-danger err-validate start-price-validate" style="display: none">Số tiền đấu giá tối thiểu phải là 1.000.000đ</span>
                </div>
                <div class="form-group mt-2">
                    <label for="end-date" class="small">Ngày kết thúc</label>
                    <div class="d-flex align-items-center">
                        <input id="end-date" type="date" class="form-control me-1"/>
                        <input id="end-time" type="time" class="form-control"/>
                    </div>
                    <span class="text-danger err-validate endDate-validate" style="display: none">Ngày giờ phải lớn hơn ngày giờ hiện tại</span>
                </div>
                <div class="dropzone card shadow-none mt-4">
                    <div class="d-flex modal--remove-img justify-content-end" onclick="removeImg(this)">
                        <i class="fa-solid fa-xmark p-2"></i>
                    </div>
                    <label class="d-flex align-items-center justify-content-center" style="cursor: pointer;">
                        <img id="uploadPreview1" class="imagePreview" />
                        <div class="d-flex justify-content-center align-items-center h-100">
                            <div class="d-flex flex-column justify-content-center align-items-center">
                                <i class="fa-solid fa-images images-icon"></i>
                                <p class="text-secondary mt-2">Nhấn để thêm ảnh</p>
                            </div>
                        </div>
                        <input id="uploadImage1" type='file' name='upload-image' class='upload-image' onchange="previewImage1(this)" />
                    </label>
                </div>

                <div class="d-flex align-items-center justify-content-end mt-3">
                    <button type="button" class="btn btn-danger me-2 modal--close-auction modal-close-btn">Huỷ</button>
                    <button type="button" class="btn btn-success" onclick="createAuction()">Đăng</button>
                </div>
            </div>
        </div>
    </div>  

    <div id="modal02" class="modal align-items-center justify-content-center" onclick="this.style.display = 'none'">
        <div class="modal--picture position-relative d-flex align-items-center justify-content-center">
            <img id="img02" style="max-width:100%; max-height:100vh;">
        </div>
    </div>
                    
   <div class="send-email-loading">
        <div class="spinner-border text-light"></div>
        <p class="ms-3 mb-0">Đang gửi email...</p>
    </div>
                    
</div>

<script>
    <c:url value="/api/posts" var="endpoint" />
        $(function () {
            currentUserId = '${sessionScope.currentUser.id}';
            $("textarea").hashtags();
            
        });
        window.onload = function() {
            disableLoadMorePost = false;
            $('#userNotification').on("click", function () {
                $('.notif-count').css('opacity', '0');
            });
        };
        $(window).scroll(function () {
            if ($(this).scrollTop() >= 300) {
                $('#go-to-top').css("display", "flex");
            } else {
                $('#go-to-top').fadeOut();
            }
        });
</script>