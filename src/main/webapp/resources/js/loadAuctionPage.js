
var auctionPage = 1;
var auctionFetching = false;
var disableLoadMoreAuction = false;
var userAvatar = $("#userAvatar").attr("src");
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
