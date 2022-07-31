
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

    </div>

    <div class="text-center mt-3 auction-loading">
        <div class="spinner-border text-muted"></div>
    </div>


    <!--modal create post-->
    <div class="modal modal-auction">
        <div class="modal-container modal-container-auction">
            <div class="modal-header">
                <h5 class="my-2">Thêm bài viết đấu giá</h5>
                <div class="modal--close modal--close-auction">
                    <i class="fa-solid fa-xmark p-2"></i>
                </div>
            </div>

            <div class="modal-body ">
                <div class="d-flex mb-3">
                    <div>
                        <a href="#"> <img class="avatar-img rounded-circle" src="${currentUser.getAvatar()}" alt=""> </a>
                    </div>
                    <form class="w-100 ms-1">
                        <textarea class="form-control pe-4 border-0 theSelector" rows="2" placeholder="Bạn đang nghĩ gì thế?" style="height: 115px;"></textarea>

                        <div class="form-group">
                            <label for="start-price">Giá khởi điểm</label>
                            <input id="start-price" type="number" class="form-control"/>
                        </div>
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
<script>
    <c:url value="/api/auctions" var="endpoint" />
        $(function () {
            loadAuctions('${endpoint}', '${currentUser.getId()}');
            $("textarea").hashtags();
        });

        $(window).scroll(function () {
            var scrollTop = $(this).scrollTop();
            var windowHeight = $(this).height();
            var documentHeight = $(document).height();

            if ((windowHeight + scrollTop) >= documentHeight) {
                auctionNextPage();
                !disableLoadMoreAuction && loadAuctions('${endpoint}', '${currentUser.getId()}', auctionPage);
            }
        });
</script>