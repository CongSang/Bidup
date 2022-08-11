
const modal1 =  document.querySelector(".modal-auction");
const modalContainer1 = $(".modal-container-auction");
const btn_close1 = document.querySelectorAll(".modal--close-auction");
const btn_show1 = document.querySelectorAll(".btn-show--auction");

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

function showModal() {
    modal1.classList.add('open');
}

function closeModal() {
    modal1.classList.remove('open');
}

btn_show1.forEach(btn => {
    btn.addEventListener("click", showModal);
});

btn_close1.forEach(btn => {
    btn.addEventListener("click", closeModal);
});

modalContainer1.on("click", function (event) {
    event.stopPropagation();
});

function auctionNextPage() {
    if (auctionFetching) return;
    
    auctionPage++;
}

function loadAuctions(page) {
    if (!page) {
        page = 1;
    }
    
    $('.auction-loading').css("display", "block");
    auctionFetching = true;
    
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/auctions` + '?page=' + page,
        dataType: 'json',
        success: function (data) {
            if (data.length === 0) {
                disableLoadMoreAuction = true;
            }
            
            loadAuctionFeeds(data);
            $('.auction-loading').css("display", "none");
            auctionFetching = false;
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
