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

function loadSideBarLeft() {
    $.ajax({
        type: 'get',
        url: '/SharingHope/api/auction-side',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, item) {
                let html = `
                    <div class="d-flex align-items-center pt-4">
                        <div class="p-1">
                            <a href="#">
                                <img src="${item.userId.avatar}" alt="avatar" class="avatar-img rounded-circle"/>
                            </a>
                        </div>
                        <div class="ms-2 small">
                            <h6 class="card-title mb-0"><a href="#">${item.userId.lastname} ${item.userId.firstname}</a></h6>
                            đã đăng đấu giá
                            <span>${moment(item.auctionDate).fromNow()}</span>
                        </div>
                    </div>
                `;
            
                $('.auction-side--item').append(html);
                $('.sideleft-loading').css("display", "none");
            });
        }
    });
}

function loadAuctions(endpoint, currentUserId) {
    $.ajax({
        type: 'get',
        url: endpoint,
        dataType: 'json',
        success: function (data) {
            loadAuctionFeeds(data, currentUserId);
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
                            <p class="post--content mb-3">
                                ${auction.content}
                            </p>

                            <p class="auction--price mb-3">
                                Giá khởi điểm:<span class="ms-2">${auction.startingPrice} VNĐ</span>
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
                                                        ${bid.money}
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
                            <p class="post--content mb-3">
                                ${auction.content}
                            </p>

                            <p class="auction--price mb-3">
                                Giá khởi điểm:<span class="ms-2">${auction.startingPrice} VNĐ</span>
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
    });
}