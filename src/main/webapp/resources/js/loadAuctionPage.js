
var auctionPage = 1;
var auctionFetching = false;
var disableLoadMoreAuction = false;
var errorHtml =  `<div class="text-center mt-3 post-loading">
                                <p class="post--content mb-3" style="font-size:30xp;">
                                    Có lỗi xảy ra, không thể đăng bài ngay lúc này!
                                </p>
                               <img class="card-img post--img" src="https://res.cloudinary.com/quoc2401/image/upload/v1659441156/eocshmhivko3pjpa0kkg.png" alt="Error">
                            </div>`;

function auctionNextPage() {
    if (auctionFetching) return;
    
    auctionPage++;
}

function loadAuctions() {
    disableLoadMorePost = true;
    if (!auctionPage) {
        auctionPage = 1;
    }
    
    auctionFetching = true;
    
    xhr = $.ajax({
        type: 'get',
        url: `${ctxPath}/api/auctions` + '?page=' + auctionPage,
        dataType: 'json',
        success: function (data) {
            $(loadingBottom).css("display", "none");
            if (data.length === 0) {
                disableLoadMorePost = true;
                return;
            }
            
            loadAuctionFeeds(data, '.auction-container');
            auctionFetching = false;
            auctionPage++;
            disableLoadMorePost = false;
        }
    });
}

function formatMoney (value) {
    const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    
    return money;
}

function formatDate(value) {
    const date = new Date(value);
    return (
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear()
      ].join('/') +
      ' lúc ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds())
      ].join(':')
    );
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function countDown(end, auctionId) {
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = end - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        $(`.count-down${auctionId}`).html(`Thời gian còn lại <span class="text-danger ms-2">${days}d ${hours}h ${minutes}m ${seconds}s</span>`);

        if (distance < 0) {
            clearInterval(x);
            getTopPrice(auctionId)
            $(`.count-down${auctionId}`).html(`
                <div class="text-danger">Đấu giá đã kết thúc vào lúc ${moment(end).format('HH:mm:ss DD-MM-yyyy')}</div>
            `);
        }
      }, 1000);
}



function getTopPrice(auctionId) {
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/get-top-price/${auctionId}`,
        dataType: 'json',
        statusCode: {
            200: function(data) {
                $(`.count-down${auctionId}`)
                    .append(`<div class="text-danger">Giá chiến thắng: ${formatMoney(data)}</div>`);
            },
            204: function() {
                $(`.count-down${auctionId}`)
                    .append(`<div class="text-danger">Không có người chiến thắng</div>`);
            }
        }
    });
}

