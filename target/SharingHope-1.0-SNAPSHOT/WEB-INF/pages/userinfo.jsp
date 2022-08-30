<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><tiles:insertAttribute name="title" /></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-2.2.4.js" integrity="sha256-iT6Q9iMJYuQiMWNd9lDyBUStIq/8PuOW33aOqmvFpqI=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.28.0/moment.min.js" integrity="sha512-Q1f3TS3vSt1jQ8AwP2OuenztnLU6LwxgyyYOG1jgMW/cbEMHps/3wjvnl1P3WTrF3chJUWEoxDUEjMxDV8pujg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.28.0/locale/vi.min.js" integrity="sha512-KFhB7C5HhK+ySzLQNJveDmB1h8qlsd51JX0p5o/PwL4EPdbj+TlhdVENbR9SFn+sz2sX30M4nqchhtPmz/wtiw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

        <script src="<c:url value="/resources/js/hashtag/jquery.hashtags.js" />"></script>
        <script src="<c:url value="/resources/js/hashtag/jquery.autosize.js" />"></script>

        <c:url value="/resources/css/global.css" var="globalCss" />
        <c:url value="/resources/css/style.css" var="mainCss" />
        <c:url value="/resources/css/home.css" var="homeCss" />
        <link href="${globalCss}" rel="stylesheet" />
        <link href="${mainCss}" rel="stylesheet" />
        <link href="${homeCss}" rel="stylesheet" />
        <link href="<c:url value="/resources/css/auction.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/userinfo.css" />" rel="stylesheet" />
        <link href="<c:url value="/resources/css/notification.css"/>" rel="stylesheet" />
        <link href="<c:url value="/resources/css/comment.css"/>" rel="stylesheet" />
        <link href="<c:url value="/resources/css/login.css"/>" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/b448f5f567.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="main">
            <tiles:insertAttribute name="header" />

            <div class="user-profile home-content">
                <div class="wrap">
                    <div class="container">
                        <div class="user-profile-header d-flex flex-column justify-content-start align-items-start">
                            <div class="w-100">
                                <img src="https://source.unsplash.com/1600x900/?nature,photography,technology"
                                     alt="cover-image"
                                     class="cover-img "
                                     />
                            </div>

                            <div class="user-avatar d-flex flex-lg-row flex-column align-items-center justify-content-between w-100">
                                <div class="d-flex flex-lg-row flex-column justify-content-center align-items-center position-relative">
                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                    <img src="${userInfo.avatar}" alt="avatar" class="user-avatar-img" />
                                    <div class="height-element d-flex align-items-center justify-content-center">
                                        <h1 class="user-profile-name">${userInfo.lastname} ${userInfo.firstname}</h1>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center align-items-center">
                                    <c:if test="${userInfo.id == currentUser.id}">
                                        <div class="btn-fix-profile" onclick="$('.update-info--modal').addClass('open')">
                                            <i class="fa-solid fa-pen me-2"></i>
                                            Cập nhật trang cá nhân
                                        </div>
                                    </c:if>
                                    <c:if test="${userInfo.id != currentUser.id}">
                                        <div class="btn-follow-user">
                                            <i class="fa-solid fa-plus me-2"></i>
                                            Theo dõi
                                        </div>
                                    </c:if>
                                    <c:if test="${userInfo.id != currentUser.id}">
                                        <div class="btn-report-user ms-2" onclick="openReportUser()">
                                            <i class="fa-solid fa-flag me-2"></i>
                                            Báo cáo người dùng
                                        </div>
                                    </c:if>
                                </div>
                            </div>
                        </div>

                        <div class="user-menu">
                            <div class="user-menu--item active userPost" id="userPost" onclick="menu(this)">
                                <div class="user-menu--hover">
                                    Bài viết 
                                </div>
                            </div>
                            <div class="user-menu--item userAuction" id="userAuction" onclick="menu(this)">
                                <div class="user-menu--hover">
                                    Đấu giá
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container user-profile--content">
                    <div class="row g-3">
                        <div class="col-12 col-lg-5">
                            <div class="card user-intro">
                                <div class="card-header pb-0 pt-3 border-0">
                                    <h5 class="card-title mb-0">Giới thiệu</h5>
                                </div>

                                <div class="card-body pb-2">
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-a"></i>
                                        </div>
                                        <span class="intro-text">${userInfo.lastname} ${userInfo.firstname}</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-envelope"></i>
                                        </div>
                                        <span class="intro-text">${userInfo.email}</span>
                                        <c:if test="${userInfo.id == currentUser.id}">
                                            <i class="fa-solid fa-pen-to-square ms-2 btn-change-info" onclick="$('.modal-update-email').addClass('open')"></i>
                                        </c:if>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-phone"></i>
                                        </div>
                                        <span class="intro-text">${userInfo.phone}</span>
                                        <c:if test="${userInfo.id == currentUser.id}">
                                            <i class="fa-solid fa-pen-to-square ms-2 btn-change-info" onclick="$('.modal-update-phone').addClass('open')"></i>
                                        </c:if>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-house"></i>
                                        </div>
                                        <span class="intro-text">Sống tại ${userInfo.address}</span>
                                    </div>
                                    <div class="user-intro--item">
                                        <div class="intro-icon">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        <span class="intro-text">${userInfo.job}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-7 mt-0">
                            <div class="text-center mt-3 post-loading" id="userLoadingTop" style="display:none;">
                                <div class="spinner-border text-muted"></div>
                            </div>

                            <div class="user-content-container" id="feeds-container"></div>

                            <div class="text-center mt-3 user-loading" style="display:none;">
                                <div class="spinner-border text-muted"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: none" class="sidebar-right"><tiles:insertAttribute name="sidebarRight" /></div>
        <tiles:insertAttribute name="footer" />

        <div id="modal01" class="modal align-items-center" onclick="this.style.display = 'none'">
            <div class="modal--picture position-relative d-flex align-items-center justify-content-center">
                <img id="img01" style="max-width:100%; max-height:100vh;">
            </div>
        </div>

        <div id="modal02" class="modal align-items-center justify-content-center" onclick="this.style.display = 'none'">
            <div class="modal--picture position-relative d-flex align-items-center justify-content-center">
                <img id="img02" style="max-width:100%; max-height:100vh;">
            </div>
        </div>

        <div class="modal modal-report-user">
            <div class="modal-container" style="min-height: auto !important;">
                <div class="modal-header">
                    <h5 class="my-2">Báo cáo người dùng</h5>
                    <div class="modal--close modal--close-report-user" onclick="closeReportUser()">
                        <i class="fa-solid fa-xmark p-2"></i>
                    </div>
                </div>

                <div class="modal-body ">
                    <form>
                        <select class="form-control">
                            <option value="PAY">Đấu giá nhưng không thanh toán</option>
                            <option value="WORDS">Dùng từ ngữ không đúng đắn</option>
                        </select>

                        <button type="button" class="btn btn-danger mt-3 ml-auto" onclick="reportUser('${userInfo.id}')">Gửi báo cáo</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="send-email-loading">
            <div class="spinner-border text-light"></div>
        </div>

        <!--Modal chỉnh sửa thông tin user-->
        <div class="modal update-info--modal">
            <div class="modal-container" style="min-height: 400px">
                <div class="modal-header">
                    <h3 class="my-2">Chỉnh sửa thông tin cá nhân</h3>
                    <div class="modal--close modal--close-update" onclick="$('.modal--close-update').parents('.update-info--modal').removeClass('open')">
                        <i class="fa-solid fa-xmark p-2"></i>
                    </div>
                </div>

                <div class="modal-body ">
                    <div class="">
                        <form onsubmit="editUserInfo('${userInfo.id}')" enctype="multipart/form-data" id="form-update-info">
                            <div class="form-group d-flex">
                                <div class="text-start w-100 me-1">
                                    <input id="lastname" placeholder="Họ" class="form-control-sm" />
                                    <div class="text-danger err-validate"></div>
                                </div>
                                <div class="text-start w-100" >
                                    <input id="firstname" placeholder="Tên" class="form-control-sm" />
                                    <div class="text-danger err-validate"></div>
                                </div>
                            </div>
                            <div class="form-group text-start">
                                <label for="dateofbirth" class="me-1 small">Ngày sinh</label>
                                <input type="date" id="dateofbirth" placeholder="Ngày sinh*" class="form-control-sm" />
                                <div class="text-danger err-validate"></div>
                            </div>
                            <div class="form-group text-start">
                                <input id="address" placeholder="Địa chỉ" class="form-control-sm" />
                            </div>
                            <div class="form-group d-flex">
                                <input id="hometown" placeholder="Quê quán" class="form-control-sm me-1" />
                                <input id="job" placeholder="Nghề nghiệp" class="form-control-sm" />
                            </div>
                            <div class="form-group text-start">
                                <label for="avatar" class="me-1 small">Thay đổi ảnh đại diện</form:label>
                                    <input id="avatar" type="file" placeholder="" class="form-control-sm" />
                            </div>
                            <div class="form-group">
                                <button class="b btn-register w-50 mt-2">
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal modal-update-email">
            <div class="modal-container" style="min-height: auto !important;">
                <div class="modal-header">
                    <h5 class="my-2">Chỉnh sửa Email</h5>
                    <div class="modal--close modal--close-email" onclick="$('.modal--close-email').parents('.modal-update-email').removeClass('open')">
                        <i class="fa-solid fa-xmark p-2"></i>
                    </div>
                </div>

                <div class="modal-body ">
                    <form id="form-update-email">
                        <div class="form-group text-start">
                            <input id="email" name="email" placeholder="Nhập Email thay đổi" class="form-control" />
                            <div class="text-danger err-validate"></div>
                        </div>
                        <button type="submit" class="b btn-register mt-3 ml-auto px-4">Cập nhật</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="modal modal-update-phone">
            <div class="modal-container" style="min-height: auto !important;">
                <div class="modal-header">
                    <h5 class="my-2">Chỉnh sửa Số điện thoại</h5>
                    <div class="modal--close modal--close-phone" onclick="$('.modal--close-phone').parents('.modal-update-phone').removeClass('open')">
                        <i class="fa-solid fa-xmark p-2"></i>
                    </div>
                </div>

                <div class="modal-body ">
                    <form id="form-update-phone">
                        <div class="form-group text-start">
                            <input id="phone" name="phone" placeholder="Nhập số điện thoại thay đổi" class="form-control" />
                            <div class="text-danger err-validate"></div>
                        </div>
                        <button type="submit" class="b btn-register mt-3 ml-auto px-4">Cập nhật</button>
                    </form>
                </div>
            </div>
        </div>

        <tiles:insertAttribute name="chatbox" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.11.5/dayjs.min.js" integrity="sha512-Ot7ArUEhJDU0cwoBNNnWe487kjL5wAOsIYig8llY/l0P2TUFwgsAHVmrZMHsT8NGo+HwkjTJsNErS6QqIkBxDw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="<c:url value="/resources/js/main.js" />"></script>
        <script src="<c:url value="/resources/js/feeds.js" />"></script>
        <script src="<c:url value="/resources/js/userPage.js" />"></script>
        <script src="<c:url value="/resources/js/auction.js" />"></script>
        <script src="<c:url value="/resources/js/loadAuctionPage.js" />"></script>
        <script src="<c:url value="/resources/js/bid.js" />"></script>
        <script src="<c:url value="/resources/js/post.js" />"></script>
        <script src="<c:url value="/resources/js/comment.js" />"></script>
        <script src="<c:url value="/resources/js/search.js" />"></script>
        <script src="<c:url value="/resources/js/chat.js" />"></script>
        <script src="<c:url value="/resources/js/validate.js" />"></script>
        <script>
            <c:url value="/api/user/${userInfo.id}/auctions" var="endpoint1" />
            <c:url value="/api/user/${userInfo.id}/posts" var="endpoint2" />

                        $(function () {
                            currentUserId = '${sessionScope.currentUser.id}';
                            if ($('#userAuction').hasClass('active')) {
                                loadUserAuctions('${endpoint1}');
                            } else {
                                loadUserPosts('${endpoint2}');
                            }

                        });

                        function menu(element) {
                            if ($(element).hasClass('active')) {
                                return;
                            } else {
                                $(element).parents('.user-menu').find('.user-menu--item.active').removeClass('active');
                                $(element).addClass('active');
                                if ($(element).hasClass('userAuction')) {
                                    $('.user-content-container').html('');
                                    loadUserAuctions('${endpoint1}');
                                }
                                if ($(element).hasClass('userPost')) {
                                    $('.user-content-container').html('');
                                    loadUserPosts('${endpoint2}');
                                }
                            }
                        }

                        Validator({
                            form: '#form-update-email',
                            formGroupSelector: '.form-group',
                            errSelector: '.err-validate',
                            rules: [
                                Validator.isEmail('#email')
                            ],
                            onSubmit: (data) => {
                                console.log(data);
                                if (!isBlank($.trim(data))) {
                                    updateUser('${userInfo.id}', 0, 0, 0, 0, 0, 0, null, data.email, null);
                                }
                            }
                        });

                        Validator({
                            form: '#form-update-phone',
                            formGroupSelector: '.form-group',
                            errSelector: '.err-validate',
                            rules: [
                                Validator.isPhone('#phone')
                            ],
                            onSubmit: (data) => {
                                console.log(data);
                                if (!isBlank($.trim(data))) {
                                    updateUser('${userInfo.id}', 0, 0, 0, 0, 0, 0, null, null, data.phone);
                                }
                            }
                        });
        </script>
    </body>
</html>