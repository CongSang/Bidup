
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
            
            loadAuctionFeeds(data, currentUserId, endpoint);
            $('.auction-loading').css("display", "none");
            auctionFetching = false;
        }
    });
}

function loadAuctionFeeds(auctions, currentUserId, endpoint) {
    var userAvatar = $("#userAvatar").attr("src");
    $.each(auctions, function (index, auction) {
        
        let userAuction = auction.bidSet.filter(b => b.user.id === currentUserId);
        let bidSort = auction.bidSet.filter(c => c.user.id !== currentUserId);
        bidSort.sort(function (a, b) {
            return b.money - a.money;
        });
        
        let html = `
            ${(auction.userId.id === currentUserId) ? `
                <div class="post auction-post-${auction.id}">
                    <div class="card post--item">
                        <div class="card-header border-0 pb-0 pt-3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-start">
                                    <div class="me-2">
                                        <a href="${ctxPath}/user/${auction.userId.id}">
                                            <img class="avatar-img rounded-circle" src="${auction.userId.avatar}" alt="">
                                        </a>
                                    </div>
                                    <!-- Info -->
                                    <div>
                                        <div class="nav nav-divider">
                                            <h6 class="nav-item card-title mb-0">
                                                <a href="${ctxPath}/user/${auction.userId.id}">${auction.userId.lastname} ${auction.userId.firstname}</a>
                                            </h6>
                                            <span id="auction-timeFromNow" class="ms-2 nav-item small text-secondary">${moment(auction.auctionDate).fromNow()}</span>
                                            <div class="text-center ms-4 auction-del-loading-${auction.id}" style="display: none">
                                                <div class="spinner-border text-muted"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--Menu-->
                                <div class="dropdown">
                                    
                                    ${auction.active == true ?
                                    `<a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                                        ${(auction.endDate <= Date.now() && !auction.mailTo) ?
                                            `<li>
                                                <div class="dropdown-item cursor-pointer" onclick="confirmWinnerAndSendEmail(${auction.id}, this)">
                                                    Chốt kết quả và gửi email
                                                </div>
                                            </li>` : ``}
                                        ${(auction.endDate <= Date.now() && auction.mailTo) ?
                                            `
                                            <li>
                                                <div class="dropdown-item cursor-pointer" onclick="confirmCompleteCharity(${auction.id})">
                                                    Hoàn thành từ thiện
                                                </div>
                                            </li>
                                            ` : ``
                                        }
                                        ${(auction.endDate > Date.now()) ?
                                        `<li>
                                            <div class="dropdown-item cursor-pointer" onclick="editAuction(${auction.id}, this)">
                                                Chỉnh sửa bài viết
                                            </div>
                                        </li>
                                        <li>
                                            <div class="dropdown-item cursor-pointer" onclick="deleteAuction('${endpoint}', ${auction.id})">
                                                Xóa bài viết
                                            </div>
                                        </li>` : ``}

                                    </ul>` : ``}
                                </div>
                            </div>
                        </div>
                        <div class="card-body pb-2">
                            <p class="post--content mb-3 auction-${auction.id}">
                                ${auction.content}
                            </p>
        
                            <p class="auction--price mb-1">
                                ${auction.endDate <= Date.now() ? 
                                `<span class="small">Đấu giá đã kết thúc (hãy xem người chiến thắng, bấm gửi email xác nhận, kiểm tra thanh toán, thực hiện từ thiện và xác nhận hoàn thành việc từ thiện trong bài viết này, nếu người thắng cuộc không thanh toán hãy báo cáo lại cho chúng tôi)
                                <i class="fa-solid fa-triangle-exclamation text-danger"></i>
                                </span>` :
                                `Giá khởi điểm:<span class="ms-2">${formatMoney(auction.startingPrice)}</span>`}
                            </p>
                            <p class="auction--price mb-3">Kết thúc ngày ${formatDate(auction.endDate)}</p>

                            <img class="card-img post--img auction--img" src="${auction.image}" alt="Post image" onclick="showFull2(this)">

                            <div class="line"></div>

                            <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                                <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                    ${(auction.active) ? 
                                    `<div class="auction--action-hover" onclick="showFollowAuction(this)">
                                        <div class="text-center me-1 bid-loading-${auction.id}" style="display: none">
                                            <div class="spinner-border text-muted"></div>
                                        </div>
                                        <i class="fa-solid fa-eye"></i>
                                        <span class="auction--action-text auction-follow ms-2">Theo dõi (${auction.bidSet.length} người đã tham gia)</span>
                                    </div>` : 
                                    `<div class="btn-disable">
                                        <i class="fa-solid fa-check"></i>
                                        <span class="auction--action-text auction-follow ms-2">Hoàn thành</span>
                                    </div>`}
                                    
                                </div>
                            </div>

                            <div class="auction-user-join auction-follow-list">
        
                                ${(bidSort).map((bid, index) => {
                                    return `
                                          <div class="d-flex comment--item py-2">
                                            <div class="me-2">
                                                <a href="${ctxPath}/user/${bid.user.id}">
                                                    <img class="comment--avatar rounded-circle" src="${bid.user.avatar}" alt="avatar">
                                                </a>
                                            </div>
                                            <div class="comment--item-content">
                                                  <div class="bg-light comment-content">
                                                      <div class="d-flex justify-content-start">
                                                          <h6 class="mb-1 me-2"><a href="${ctxPath}/user/${bid.user.id}">${bid.user.lastname} ${bid.user.firstname}</a></h6>
                                                          <small>${moment(bid.bidDate).fromNow()}</small>
                                                      </div>
                                                      <p class="small mb-0">
                                                          ${formatMoney(bid.money)}
                                                      </p>
                                                  </div>
                                                    <div class="d-flex justify-content-end me-2">
                                                        ${bid.isWinner ? `
                                                            <div class="winner-user${bid.user.id} winner-user me-3 is-winner" onclick="selectIsWinnerAuction(${auction.id}, '${bid.user.id}', this)">
                                                                <i class="fa-solid fa-star me-1"></i>Chiến thắng
                                                            </div>
                                                        ` : `
                                                            <div class="winner-user${bid.user.id} winner-user me-3" onclick="selectIsWinnerAuction(${auction.id}, '${bid.user.id}', this)">
                                                                <i class="fa-solid fa-star me-1"></i>Chiến thắng
                                                            </div>
                                                        `}
                                                    </div>
                                                </div>
                                                
                                          </div>`;
                                }).join('')}

                                
                            </div>

                        </div>
                    </div>
                </div>
            ` : `
                <div class="post auction-post-${auction.id}">
                    <div class="card post--item">
                        <div class="card-header border-0 pb-0 pt-3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-start">
                                    <div class="me-2">
                                        <a href="${ctxPath}/user/${auction.userId.id}">
                                            <c:url value="/resources/img/non-avatar.png" var="a" />
                                            <img class="avatar-img rounded-circle" src="${auction.userId.avatar}" alt="">
                                        </a>
                                    </div>
                                    <!-- Info -->
                                    <div>
                                        <div class="nav nav-divider">
                                            <h6 class="nav-item card-title mb-0">
                                                <a href="${ctxPath}/user/${auction.userId.id}">${auction.userId.lastname} ${auction.userId.firstname}</a>
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
                                            <a class="dropdown-item" href="#" onclick="modalArticleReport(${auction.id}, 'AUCTION')">
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
                            
                            <p class="auction--price mb-1">
                                ${(auction.active) ? `Giá khởi điểm:<span class="ms-2 auction-start-price">${formatMoney(auction.startingPrice)}</span>` 
                                : `Hoạt động từ thiện đã được hoàn thành`}
                            </p>
                            <p class="auction--price mb-3">Kết thúc ngày ${formatDate(auction.endDate)}</p>

                            <img class="card-img post--img" src="${auction.image}" alt="Post image" onclick="showFull2(this)">

                            <div class="line"></div>

                            <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                                <div class="post--action-comment w-100 d-flex justify-content-center align-items-center">
                                    ${auction.endDate > Date.now() ?
                                    `${(auction.bidSet.some(b => b.user.id === currentUserId)) ?
                                            `<div class="auction--action-hover" onclick="deleteBid(${auction.id}, this, ${auction.startingPrice})">
                                                <div class="text-center me-1 bid-loading-${auction.id}" style="display: none">
                                                    <div class="spinner-border text-muted"></div>
                                                </div>
                                                <i class="fa-solid fa-circle-xmark"></i>
                                                <span class="auction--action-text ms-2">Hủy tham gia</span>
                                            </div>
                                            ` : `
                                            <div class="auction--action-hover">
                                                <div class="text-center me-1 bid-loading-${auction.id}" style="display: none">
                                                    <div class="spinner-border text-muted"></div>
                                                </div>
                                                <i class="fa-solid fa-gavel"></i>
                                                <span class="auction--action-text ms-2">Đấu giá (${auction.bidSet.length} người đã tham gia)</span>
                                            </div>
                                            `
                                    }` : `<div class="btn-disable">
                                                <i class="fa-solid fa-circle-xmark"></i>
                                                <span class="auction--action-text ms-2">Bài đấu giá đã kết thúc</span>
                                            </div>`}
                                </div>
                            </div>
                            
                            <div class="auction-user-join">
                            ${auction.endDate > Date.now() ?
                            `${(auction.bidSet.some(b => b.user.id === currentUserId)) ?
                                    `${userAuction && `
                                            <div class="d-flex comment--item py-2">
                                                <div class="me-2">
                                                    <a href="${ctxPath}/user/${auction.userId.id}">
                                                        <img class="comment--avatar rounded-circle" src="${userAuction[0].user.avatar}" alt="avatar">
                                                    </a>
                                                </div>
                                                 <div class="comment--item-content">
                                                  <div class="bg-light comment-content">
                                                      <div class="d-flex justify-content-start">
                                                          <h6 class="mb-1 me-2"><a href="${ctxPath}/user/${auction.userId.id}">${userAuction[0].user.lastname} ${userAuction[0].user.firstname}</a></h6>
                                                          <small>${moment(userAuction[0].bidDate).fromNow()}</small>
                                                      </div>
                                                      <p class="small mb-0">
                                                          ${formatMoney(userAuction[0].money)}
                                                      </p>
                                                  </div>
                                                    <div class="d-flex justify-content-end me-2 report-user">
                                                        Báo cáo
                                                    </div>
                                                </div>
                                                
                                          </div>
                                        `}
                                    ` : `
                                        <div class="d-flex align-items-center my-2">
                                            <div class="me-2">
                                                <a href="#">
                                                    <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="avatar">
                                                </a>
                                            </div>
                                            <form class="w-100" onsubmit="addBid(${auction.id}, this, ${auction.startingPrice})">
                                                <input type="number" name="bidValue" autocomplete="off" placeholder="Nhập giá cạnh tranh (VNĐ)" class="add-comment" />
                                                <span class="text-danger err-validate" style="display: none">Số tiền đấu giá tối thiểu phải là ${formatMoney(auction.startingPrice)}</span>
                                            </form>
                                        </div>
                                    `
                            }` : ``}
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
