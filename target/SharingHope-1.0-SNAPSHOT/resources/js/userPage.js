
var auctionPage = 1;
var auctionFetching = false;
var disableLoadMoreAuction = false;

var postPage = 1;
var postFetching = false;
var disableLoadMorePost = false;

function auctionNextPage() {
    if (auctionFetching)
        return;

    auctionPage++;
}

function loadUserPosts(endpoint, page) {
    if (!page) {
        page = 0;
    }

    $('.user-loading').css("display", "block");
    auctionFetching = true;

    $.ajax({
        type: 'get',
        url: endpoint + '?page=' + page,
        dataType: 'json',
        success: function (data) {
            if (data.length === 0) {
                disableLoadMorePost = true;
                $('.user-loading').css("display", "none");
                $('#feeds-container').append(`<div class="d-flex flex-column justify-content-center align-items-center mt-4">
                                                                            <img style="width: 100px; height: 100px" src="https://res.cloudinary.com/dynupxxry/image/upload/v1659765073/netflix/star_yepdul.png" />
                                                                            <p class="text-center">Chưa có bài viết nào</p>
                                                                        </div>`);
                return;
            }

            loadFeeds(data);
            $('.user-loading').css("display", "none");
            postFetching = false;
        }
    });
}

function loadUserAuctions(endpoint, page) {
    if (!page) {
        page = 0;
    }

    $('.user-loading').css("display", "block");
    auctionFetching = true;

    $.ajax({
        type: 'get',
        url: endpoint + '?page=' + page,
        dataType: 'json',
        success: function (data) {
            if (data.length === 0) {
                disableLoadMoreAuction = true;
                $('.user-loading').css("display", "none");
                $('#feeds-container').append(`<div class="d-flex flex-column justify-content-center align-items-center mt-4">
                                                                            <img style="width: 100px; height: 100px" src="https://res.cloudinary.com/dynupxxry/image/upload/v1659765073/netflix/star_yepdul.png" />
                                                                            <p class="text-center">Chưa có bài viết nào</p>
                                                                        </div>`);
                return;
            }

            loadAuctionFeeds(data, '#feeds-container');
            $('.user-loading').css("display", "none");
            auctionFetching = false;
        }
    });
}

function closeReportUser() {
    $('.modal-report-user').removeClass('open');
}

function openReportUser() {
    $('.modal-report-user').addClass('open');
}

function reportUser(reportedUserId) {
    var reason = $('.modal-report-user').find(':selected').val();
    $.ajax({
        type: 'post',
        url: `${ctxPath}/api/report-user`,
        data: JSON.stringify({
            'articleId': "",
            'userId': reportedUserId,
            'reason': reason
        }),
        contentType: 'application/json',
        success: function () {
            swal("Báo cáo người dùng này thành công", {
                icon: "success"
            });
        }
    }).fail(function () {
        swal("Có lỗi xảy ra!", {
            icon: "error"
        });
    });

    closeReportUser();
}

function editUserInfo(userId) {
    event.preventDefault();
    $('.send-email-loading').css("display", "flex");

    var formData = new FormData();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let birthday = $('#dateofbirth').val();
    let address = $('#address').val();
    let hometown = $('#hometown').val();
    let job = $('#job').val();
    let avatarFile = document.getElementById('avatar');
    if (!isBlank($.trim(firstname)) || !isBlank($.trim(lastname)) || !isBlank($.trim(birthday)) || !isBlank($.trim(address)) 
            || !isBlank($.trim(address)) || !isBlank($.trim(hometown)) || !isBlank($.trim(job)) || avatarFile.files[0] !== undefined) {
        if (avatarFile.files[0] === undefined) {
            updateUser(userId, firstname, lastname, birthday, address, hometown, job, null, null, null);
        } else {
            var fileType = avatarFile.files[0]['type'];
            var validImageTypes = ['image/jpeg', 'image/png'];
            if (!validImageTypes.includes(fileType)) {
                alert("Không thể nhận loại file này!");
            } else {
                for (const file of avatarFile.files) {
                    formData.append("file", file);
                }
                $.ajax({
                    type: 'post',
                    url: `${ctxPath}/api/post-img`,
                    data: formData,
                    dataType: "json",
                    processData: false,
                    cache: false,
                    contentType: false
                }).done(function (res) {
                    updateUser(userId, firstname, lastname, birthday, address, hometown, job, res.url, null, null);
                }).fail(function () {
                    $('.send-email-loading').css("display", "none");
                    swal("Có lỗi xảy ra. Cập nhật thất bại", {
                        icon: "warning"
                    });
                });
            }
        }
    }
}

function updateUser(userId, firstname, lastname, birthday, address, hometown, job, res, email, phone) {
    $.ajax({
        type: 'put',
        url: `${ctxPath}/api/edit-user/${userId}`,
        data: JSON.stringify({
            'firstname': firstname ? $.trim(firstname) : null,
            'lastname': lastname ? $.trim(lastname) : null,
            'birthday': birthday,
            'address': address ? $.trim(address) : null,
            'hometown': hometown ? $.trim(hometown) : null,
            'job': job ? $.trim(job) : null,
            'avatar': res,
            'email': email,
            'phone': phone
        }),
        contentType: 'application/json',
        success: function () {
            $('.send-email-loading').css("display", "none");
            swal("Cập nhật thông tin cá nhân thành công", {
                icon: "success"
            });
            setTimeout(function () {
                window.location.reload(true);
            }, 1000);
        }
    }).fail(function () {
        $('.send-email-loading').css("display", "none");
        swal("Có lỗi xảy ra. Cập nhật thất bại", {
            icon: "warning"
        });
    });
}
