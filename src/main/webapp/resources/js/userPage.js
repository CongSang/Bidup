
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
    
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const birthdate = $('#dateofbirth').val();
    const address = $('#address').val();
    const hometown = $('#hometown').val();
    const job = $('#job').val();
    const phone = $('#phone').val();
    const avatarFile = document.getElementById('avatar');
    if (!isBlank($.trim(firstname)) || !isBlank($.trim(lastname)) || !isBlank($.trim(birthdate)) || !isBlank($.trim(address)) 
            || !isBlank($.trim(address)) || !isBlank($.trim(hometown)) || !isBlank($.trim(job)) || avatarFile.files[0] !== undefined) {
        if(avatarFile === null) {
            updateUser({
                id: userId,
                firstname: firstname,
                lastname: lastname,
                birthdate: birthdate,
                address: address,
                hometown: hometown,
                job: job,
                phone: phone
            });
            return;
        }
        if (avatarFile.files[0] === undefined) {
            updateUser({
                id: userId,
                firstname: firstname,
                lastname: lastname,
                birthdate: birthdate,
                address: address,
                hometown: hometown,
                job: job,
                phone: phone
            });
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
                    updateUser({
                        id: userId,
                        firstname: firstname,
                        lastname: lastname,
                        birthdate: birthdate,
                        address: address,
                        hometown: hometown,
                        job: job,
                        avatar: res.url,
                        phone: phone
                    });
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

function updateUser(user, callback) {
    $.ajax({
        type: 'put',
        url: `${ctxPath}/api/edit-user/${user.id}`,
        data: JSON.stringify({
            'firstname': user.firstname ? $.trim(user.firstname) : null,
            'lastname': user.lastname ? $.trim(user.lastname) : null,
            'birthdate': user.birthdate,
            'address': user.address ? $.trim(user.address) : null,
            'hometown': user.hometown ? $.trim(user.hometown) : null,
            'job': user.job ? $.trim(user.job) : null,
            'avatar': user.avatar,
            'email': user.email,
            'password': user.password,
            'phone': user.phone,
            'active': user.active,
            'userRole': user.userRole
        }),
        contentType: 'application/json',
        success: function () {
            $('.send-email-loading').css("display", "none");
            swal("Cập nhật thông tin cá nhân thành công", {
                icon: "success"
            });
            if (window.location.pathname.toString().includes('/admin/')) {
                removeEditModal();
                callback(user);
                return;
            }
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
