var postPage = 1;
var disableLoadMorePost = false;
var timer = null;

$(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    var windowHeight = $(this).height();
    var documentHeight = $(document).height();
    
    if(timer !== null) {
        clearTimeout(timer);        
    }
    
    timer = setTimeout(function() {
        if ((windowHeight + scrollTop) >= documentHeight - 10) {
            var loca = window.location.pathname;
            if (!disableLoadMorePost) {
                if(window.location === `${ctxPath}/`)
                    loadPosts(postPage);
                if(loca.includes(`${ctxPath}/hashtag/`))
                    hashTagSearch();
                if(loca.includes('/search/posts'))
                    contentSearch();
                if(loca.includes('/search/people'))
                    personSearch();
            }
        }
    }, 100);
    
});

function loadFeeds(posts) {
    var userAvatar = $("#userAvatar").attr("src");
    $.each(posts, function (index, post) {
        let listUserReact;
        if(post.reactSet.length <= 10 && post.reactSet.length > 0) {
                 listUserReact = post.reactSet.map(react => {
                return `<p class="user-liked">${react.user.lastname} ${react.user.firstname}</p>`;
            }).join('');
        } else if (post.reactSet.length > 10) {
            for(let i = 0; i < 10; i++) {
                listUserReact += `<p class="user-liked">${post.reactSet[i].lastname} ${react.user.firstname}</p>`;
            }
            listUserReact += `<p class="user-liked">và ${post.reactSet.length - 10} người khác...</p>`;
        }
        var html = `<div class="post" id="post${post.id}">     
                <div class="card post--item">
                    <div class="card-header border-0 pb-0 pt-3">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-start">
                                <div class="me-2">
                                    <a href="${ctxPath}/user/${post.userId.id}">
                                        <img class="avatar-img rounded-circle" src="${post.userId.avatar}" alt="">
                                    </a>
                                </div>
                                <!-- Info -->
                                <div>
                                    <div class="nav nav-divider">
                                        <h6 class="nav-item card-title mb-0">
                                            <a href="${ctxPath}/user/${post.userId.id}">${post.userId.lastname} ${post.userId.firstname}</a>
                                        </h6>
                                        <span class="ms-2 nav-item small text-secondary" id="timeFromNow">${moment(post.postedDate).fromNow()}</span>
                                    </div>
                                </div>
                            </div>
                            <!--Menu-->
                            <div class="dropdown">
                                <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                                    ${(currentUserId === post.userId.id) ?
                                            `<li>
                                                <a class="dropdown-item" href="#" onclick="editPost(${post.id}, this)">
                                                    Chỉnh sửa bài viết
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" onclick="deletePost(${post.id}, this)">
                                                    Xóa bài viết
                                                </a>
                                            </li>`  :    `<li>
                                                            <a class="dropdown-item" href="#" onclick="modalArticleReport(${post.id}, 'POST')">
                                                                Báo cáo
                                                            </a>
                                                        </li>`
                                        }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="card-body pb-2">
                        <p class="post--content mb-3 content--hashtag post-${post.id}">
                            ${post.content}
                        </p>
        
                        ${(post.image === '') ?`
                        <img class="card-img post--img" src="" alt="Post image" onclick="showFull(this)" style="display:none;">
                        `:(`
                        <img class="card-img post--img" src="${post.image}" alt="Post image" onclick="showFull(this)">
                        `)}

                        <div class="line"></div>

                        <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                            <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                <div class="post--action-hover position-relative" id="likeAction" onclick="createReact('${post.id}', this)">
                                    ${listUserReact ? `<div class="list-user-liked">${listUserReact}</div>` : ``}
                                    ${((post.reactSet).length === 0) ? (
                                            `<div class="heart-like-button"></div>`
                                            ) : (
                                            ((post.reactSet).some((react) => react.user.id === currentUserId)) ?
                                                `<div class="heart-like-button liked"></div>`
                                                : `<div class="heart-like-button"></div>`
                                            )
                                    }
                                    <span class="post--action-text ms-2">Thích (<span id="likeCounter">${post.reactSet.length}</span>)</span>
                                </div>
                            </div>
                            <div class="post--action-comment w-100 d-flex justify-content-center align-items-center">
                                <div class="post--action-hover" onclick="showComment(this, ${post.id})">
                                    <i class="fa-regular fa-message post--action-icon"></i>
                                    <span class="post--action-text ms-2">Bình luận</span>
                                </div>
                            </div>
                        </div>

                        <div class="comment">
                            <div class="d-flex align-items-center my-2">
                                <div class="me-2">
                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                    <a href="#">
                                        <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="">
                                    </a>
                                </div>
                                <form class="w-100" onsubmit="addComment('${post.id}', this)" id="commentForm">
                                    <input name="commentContent" type="text" placeholder="Thêm bình luận" class="add-comment" />
                                </form>
                            </div>
                            <div class="text-center mt-3 comment-loading" style="display:none;">
                                <div class="spinner-border text-muted"></div>
                            </div>
                            <div id="commentedComment" class="flex">
                                
                            </div>
                            
                            <!--show more comment-->
                            <div class="show-more-comment">
                                <param id="commentPage" value="1"/>
                                <span class="showMore" onclick="loadComment(${post.id})">Xem thêm bình luận</span>
                                <span>
                                    <span id="showedCommentLength"></span>/<span id="commentSetLength">${post.commentSetLength}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <param id="post${post.id}OwnerId" value="${post.userId.id}"/>
            </div>
            `;

        $('#feeds-container').append(html);
        customHashtag(`.post-${post.id}`);
    });
};

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

function prependFeeds(post) {
    const feedContainer = $('#feeds-container');
    var userAvatar = $("#userAvatar").attr("src");
    const html = `<div class="post" id="post${post.id}">      <!--Phan nay fecth du lieu de render-->
                <div class="card post--item">
                    <div class="card-header border-0 pb-0 pt-3">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-start">
                                <div class="me-2">
                                    <a href="${ctxPath}/user/${post.userId.id}">
                                        <img class="avatar-img rounded-circle" src="${post.userId.avatar}" alt="">
                                    </a>
                                </div>
                                <!-- Info -->
                                <div>
                                    <div class="nav nav-divider">
                                        <h6 class="nav-item card-title mb-0">
                                            <a href="/${ctxPath}/user/${post.userId.id}">${post.userId.lastname} ${post.userId.firstname}</a>
                                        </h6>
                                        <span class="ms-2 nav-item small text-secondary">${moment(post.postedDate).fromNow()}</span>
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
                                        <a class="dropdown-item" href="#" onclick="editPost(${post.id}, this)">
                                            Chỉnh sửa bài viết
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#" onclick="deletePost(${post.id}, this)">
                                            Xóa bài viết
                                        </a>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="card-body pb-2">
                        <p class="post--content mb-3 content--hashtag post-${post.id}">
                            ${post.content}
                        </p>
                        ${(post.image === '') ?`
                        <img class="card-img post--img" src="" alt="Post image" onclick="showFull(this)" style="display:none;">
                        `:(`
                        <img class="card-img post--img" src="${post.image}" alt="Post image" onclick="showFull(this)">
                        `)}
                        

                        <div class="line"></div>

                        <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                            <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                <div class="post--action-hover" id="likeAction" onclick="createReact('${post.id}', this)">
                                    <div class="heart-like-button"></div>
                                    <span class="post--action-text ms-2">Thích (<span id="likeCounter">0</span>)</span>
                                </div>
                            </div>
                            <div class="post--action-comment w-100 d-flex justify-content-center align-items-center">
                                <div class="post--action-hover" onclick="showComment(this, ${post.id})">
                                    <i class="fa-regular fa-message post--action-icon"></i>
                                    <span class="post--action-text ms-2">Bình luận</span>
                                </div>
                            </div>
                        </div>

                        <div class="comment">
                            <div class="d-flex align-items-center my-2">
                                <div class="me-2">
                                    <c:url value="/resources/img/non-avatar.png" var="avatar" />
                                    <a href="#">
                                        <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="">
                                    </a>
                                </div>
                                <form class="w-100" onsubmit="addComment('${post.id}', this)" id="commentForm">
                                    <input name="commentContent" type="text" placeholder="Thêm bình luận" class="add-comment" />
                                </form>
                            </div>
                            
                            <div class="text-center mt-3 comment-loading" style="display:none;">
                                <div class="spinner-border text-muted"></div>
                            </div>
                            <div id="commentedComment">
                                
                            </div>
                            <!--show more comment-->
                            <div class="show-more-comment">
                                <param id="commentPage" value="1"/>
                                <span class="showMore" onclick="loadComment(${post.id})">Xem thêm bình luận</span>
                                <span style="margin-left: auto">
                                    <span id="showedCommentLength"></span>/<span id="commentSetLength"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    $(feedContainer).prepend(html);
    customHashtag(`.post-${post.id}`);
};

function loadAuctionFeeds(auctions, container) {
    var userAvatar = $("#userAvatar").attr("src");
    $.each(auctions, function (index, auction) {
        let userAuction = auction.bidSet.filter(b => b.user.id === currentUserId);
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
                                            <div class="dropdown-item cursor-pointer" onclick="deleteAuction(${auction.id})">
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
                                    `<div class="auction--action-hover" id="showBidBtn" onclick="showBid(this, ${auction.id})">
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

                            <div class="auction-user-join">
                                <div class="text-center mt-3 bid-loading" style="display:none;">
                                    <div class="spinner-border text-muted"></div>
                                </div>

                                <div class="bided"></div>
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
                            
                            <div class="auction-user-join d-block">
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
        
        $(container).append(html);
        customHashtag(`.auction-${auction.id}`);
    });
}


