
var auctionPage = 1;
var auctionFetching = false;
var disableLoadMoreAuction = false;

var postPage = 1;
var postFetching = false;
var disableLoadMorePost = false;

function auctionNextPage() {
    if (auctionFetching) return;
    
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

function closeReportUser () {
    $('.modal-report-user').removeClass('open');
}

function openReportUser () {
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
