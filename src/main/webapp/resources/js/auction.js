const modal1 =  document.querySelector(".modal-auction");
const modalContainer1 = $(".modal-container-auction");
const btn_close1 = document.querySelectorAll(".modal--close-auction");
const btn_show1 = document.querySelectorAll(".btn-show--auction");

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

function previewImage1() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.querySelector("#uploadImage1").files[0]);

    oFReader.onload = function (oFREvent) {
        document.querySelector("#uploadPreview1").src = oFREvent.target.result;
    };
};

function showFull2(element) {
  document.getElementById("img02").src = element.src;
  document.getElementById("modal02").style.display = "flex";
}

var is_show_follow = false;
function showFollowAuction(element) {
    var follow = $(element).parents("div.post").find("div.auction-follow-list");
    if(is_show_follow) {
        follow.css("display", "none");
        is_show_follow = false;
    } else {
        follow.css("display", "block");
        is_show_follow = true;
    }
};

//Load theo trang cho trang dau gia
var auctionPage = 1;
var auctionFetching = false;
var disableLoadMoreAuction = false;

function auctionNextPage() {
    if (auctionFetching) return;
    
    auctionPage++;
}

function formatMoney (value) {
    const money = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    
    return money;
}


function customHashtag(element) {
    var rgxp = new RegExp(/(\s|^)\#\w\w+\b/gm);
    var str_content_origin = $(element).text();
    var str_content = str_content_origin.match(rgxp);
    $.each(str_content, function(index, v){
        var hashtag = v.trim();
        var repl = `<span class="tag">${v}</span>`;
        $(element).html($(element).html().replace(hashtag, repl));
    });
}

function loadAuctions(endpoint, currentUserId, page) {
    if (!page) {
        page = 1;
    }
    
    $('.auction-loading').css("display", "block");
    auctionFetching = true;
    
    $.ajax({
        type: 'get',
        url: endpoint + '?page=' + page,
        dataType: 'json',
        success: function (data) {
            if (data.length === 0) {
                disableLoadMoreAuction = true;
            }
            
            loadAuctionFeeds(data, currentUserId);
            $('.auction-loading').css("display", "none");
            auctionFetching = false;
        }
    });
}

function loadAuctionFeeds(auctions, currentUserId) {
    var userAvatar = $("#userAvatar").attr("src");
    $.each(auctions, function (index, auction) {
        let html = `
            ${(auction.userId.id === currentUserId) ? `
                <div class="post">
                    <div class="card post--item">
                        <div class="card-header border-0 pb-0 pt-3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-start">
                                    <div class="me-2">
                                        <a href="#">
                                            <img class="avatar-img rounded-circle" src="${auction.userId.avatar}" alt="">
                                        </a>
                                    </div>
                                    <!-- Info -->
                                    <div>
                                        <div class="nav nav-divider">
                                            <h6 class="nav-item card-title mb-0">
                                                <a href="#">${auction.userId.lastname} ${auction.userId.firstname}</a>
                                            </h6>
                                            <span class="ms-2 nav-item small text-secondary">${moment(auction.auctionDate).fromNow()}</span>
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
                                                Chỉnh sửa bài viết
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="#">
                                                Xóa bài viết
                                            </a>
                                        </li>
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
                            <p class="post--content mb-3 auction-${auction.id}">
                                ${auction.content}
                            </p>
        
                            <p class="auction--price mb-3">
                                Giá khởi điểm:<span class="ms-2">${formatMoney(auction.startingPrice)}</span>
                            </p>

                            <img class="card-img post--img" src="${auction.image}" alt="Post image" onclick="showFull2(this)">

                            <div class="line"></div>

                            <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                                <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                    <div class="auction--action-hover" onclick="showFollowAuction(this)">
                                        <i class="fa-solid fa-eye"></i>
                                        <span class="auction--action-text auction-follow ms-2">Theo dõi (${auction.bidSet.length} người đã tham gia)</span>
                                    </div>
                                </div>
                            </div>

                            <div class="auction-user-join auction-follow-list">
        
                                ${(auction.bidSet).map((bid, index) => {
                                    return `
                                          <div class="d-flex comment--item py-2">
                                            <div class="me-2">
                                                <a href="#">
                                                    <img class="comment--avatar rounded-circle" src="${bid.user.avatar}" alt="avatar">
                                                </a>
                                            </div>
                                            <div>
                                                <div class="bg-light comment--item-content">
                                                    <div class="d-flex justify-content-between">
                                                        <h6 class="mb-1 me-2"><a href="#">${bid.user.lastname} ${bid.user.firstname}</a></h6>
                                                        <small>${moment(bid.bidDate).fromNow()}</small>
                                                    </div>

                                                    <p class="small mb-0">
                                                        ${formatMoney(bid.money)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>`;
                                }).join('')}

                                
                            </div>

                        </div>
                    </div>
                </div>
            ` : `
                <div class="post">
                    <div class="card post--item">
                        <div class="card-header border-0 pb-0 pt-3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-start">
                                    <div class="me-2">
                                        <a href="#">
                                            <c:url value="/resources/img/non-avatar.png" var="a" />
                                            <img class="avatar-img rounded-circle" src="${auction.userId.avatar}" alt="">
                                        </a>
                                    </div>
                                    <!-- Info -->
                                    <div>
                                        <div class="nav nav-divider">
                                            <h6 class="nav-item card-title mb-0">
                                                <a href="#">${auction.userId.lastname} ${auction.userId.firstname}</a>
                                            </h6>
                                            <span class="ms-2 nav-item small text-secondary">${moment(auction.auctionDate).fromNow()}</span>
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
                            <p class="post--content mb-3 auction-${auction.id}">
                                ${auction.content}
                            </p>
                            
                            <p class="auction--price mb-3">
                                Giá khởi điểm:<span class="ms-2">${formatMoney(auction.startingPrice)}</span>
                            </p>

                            <img class="card-img post--img" src="${auction.image}" alt="Post image" onclick="showFull2(this)">

                            <div class="line"></div>

                            <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                                <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                    <div class="auction--action-hover">
                                        <i class="fa-solid fa-gavel"></i>
                                        <span class="auction--action-text ms-2">Đấu giá (${auction.bidSet.length})</span>
                                    </div>
                                </div>
                            </div>

                            <div class="auction-user-join">
                                <div class="d-flex align-items-center my-2">
                                    <div class="me-2">
                                        <a href="#">
                                            <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="avatar">
                                        </a>
                                    </div>
                                    <form class="w-100">
                                        <input type="number" placeholder="Nhập giá cạnh tranh (VNĐ)" class="add-comment" />
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            `}
        `;
        
        $('.auction-container').append(html);
        customHashtag(`.auction-${auction.id}`);
    });
}