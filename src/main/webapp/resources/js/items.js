const userAvatar = $("#userAvatar").attr("src");

function postItem(post) {
    let listUserReact = 0;
    const reactSetLength = post.reactSet === null ? 0 : post.reactSet.length;
    if (reactSetLength > 0)
    if (post.reactSet.length <= 10 && post.reactSet.length > 0) {
        listUserReact = post.reactSet.map(react => {
            return `<p class="user-liked">${react.user.lastname} ${react.user.firstname}</p>`;
        }).join('');
    } else if (post.reactSet.length > 10) {
        for (let i = 0; i < 10; i++) {
            listUserReact += `<p class="user-liked">${post.reactSet[i].lastname} ${react.user.firstname}</p>`;
        }
        listUserReact += `<p class="user-liked">và ${post.reactSet.length - 10} người khác...</p>`;
    }
    
    return `<div class="post" id="post${post.id}">     
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
                                <ul class="dropdown-menu dropdown-menu-end px-0" aria-labelledby="cardFeedAction">
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
                                            </li>` : `<li>
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
        
                        ${(post.image === '') ? `
                        <img class="card-img post--img" src="" alt="Post image" onclick="showFull(this)" style="display:none;">
                        ` : (`
                        <img class="card-img post--img" src="${post.image}" alt="Post image" onclick="showFull(this)">
                        `)}

                        <div class="line"></div>

                        <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                            <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                                <div class="post--action-hover position-relative" id="likeAction" onclick="createReact('${post.id}', this)">
                                    ${listUserReact ? `<div class="list-user-liked">${listUserReact}</div>` : ``}
                                    ${reactSetLength < 1 ? (
                `<div class="heart-like-button"></div>`
                ) : (
                ((post.reactSet).some((react) => react.user.id === currentUserId)) ?
                `<div class="heart-like-button liked"></div>`
                : `<div class="heart-like-button"></div>`
                )
                }
                                    <span class="post--action-text ms-2">Thích (<span id="likeCounter">${reactSetLength}</span>)</span>
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
}

function commentItem(comment, postId) {
    let reactSetLength = comment.reactCommentSet === null ? 0 : comment.reactCommentSet.length;
    let postOwnerId = $(`#post${postId}OwnerId`).val();
    let subLength = comment.commentSetLength;
    
    return `<div id="commentItem${comment.id}" class="d-flex flex-column comment--item py-2 position-relative ${subLength > 0 ? 'child-have-reply' : ''}">
                <div class="point-to-child"></div>
                <div class="d-flex point position-relative">
                    <div class="me-2" style="z-index: 1;">
                        <a href="${ctxPath}/user/${comment.userId.id}">
                            <img class="comment--avatar rounded-circle" src="${comment.userId.avatar}" alt="avatar">
                        </a>
                    </div>
                    <div class="comment--item-content comment--item-content${comment.id}">
                    <div class="bg-light comment-content comment-content${comment.id}">
                        <div class="d-flex justify-content-start align-items-center">
                            <h6 class="mb-1 me-2 d-flex align-items-center"><a href="${ctxPath}/user/${comment.userId.id}">${comment.userId.lastname} ${comment.userId.firstname}
                                ${comment.userId.id === postOwnerId ?
                        `<span class="author-post"><i class="fa-solid fa-circle-check"></i></span>` : ``}
                            </a></h6>
                            <small class="comment-date">${moment(comment.commentDate).fromNow()}</small>
                        </div>
                        <p class="small mb-0">
                            ${comment.content}
                        </p>

                        <!--count like comment-->
                        <div class="count-like-comment count-like-comment${comment.id} bg-light" 
                            style="display:${reactSetLength > 0 ? `flex` : `none`};">
                            <img class="" height="20" role="presentation" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" width="20">
                            <span id="count-liked-comment${comment.id}" class="ms-1">${reactSetLength}</span>
                        </div>

                    </div>
                      <div class="d-flex justify-content-end me-2">
                    ${reactSetLength === 0 ? `
                        <div class="comment-like comment-like${comment.id}" onclick="likedComment(${comment.id})">Thích</div>` : (
                        (comment.reactCommentSet).some((react) => react.user.id === currentUserId) ?
                        `<div class="comment-like comment-like${comment.id} liked" onclick="likedComment(${comment.id})">Ðã Thích</div>` :
                        `<div class="comment-like comment-like${comment.id}" onclick="likedComment(${comment.id})">Thích</div>`
                        )}

                        <div class="comment-reply" onclick="showFormReply(${comment.id})">Phản hồi</div>
                        ${(currentUserId === comment.userId.id) ?
                            `<div class="comment-edit" onclick="showEditComment(${comment.id}, ${postId})">Sửa</div>` : ``}
                        ${(currentUserId === comment.userId.id || currentUserId === postOwnerId) ?
                            `<div class="comment-delete" onclick="deleteComment(${comment.id})">Xóa</div>` : ``}
                      </div>
                  </div>
                </div>
                <!--Dung de show reply-->
                <div id="commentReplies${comment.id}" class="reply-comments position-relative">
                    <div class="align-items-center my-2 commentFormReply position-relative"  id="commentFormReply${comment.id}">
                        <div class="me-2">
                            <a href="#">
                                <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="avatar">
                            </a>
                        </div>
                        <div class="point-to-formReply"></div>
                        <form class="w-100" onsubmit="addReply(${comment.id}, this, ${postId})">
                            <input name="commentContent" type="text" placeholder="Thêm bình luận" class="add-comment" />
                        </form>
                    </div>
               
                        <div id="repliedComments" class="repliedComments${comment.id} repliedComments">
                        
                        </div>
                
                        <param id="replyPage" value="1"/>
                    </div>
                ${subLength > 0 ? `
                    <div class="btn-load-reply-comments" id="loadReply${comment.id}" onclick="loadReplies(${comment.id}, ${postId})">
                            <div class="point-to-showMore"></div>
                            <i class="fa-solid fa-reply me-2"></i>
                            <span>Xem <span class="count-reply">${subLength}</span> phản hồi</span>
                `:``}
                </div>
            </div>`;
}

function bidItem(bid) {
    return `<div class="comment--item py-2 bid-item" id="${bid.auction.id}-${bid.user.id}">
                <div class="d-flex point">
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
                                ${(currentUserId === bid.user.id) ?
                                `<div class="comment-edit" onclick="showFormUpPrice(${bid.auction.id}, '${bid.user.id}')">Giá mới</div>
                                <div class="comment-edit" onclick="deleteBid(${bid.auction.id}, this)">Hủy tham gia</div>` : ``}
                        </div>
                    </div>
                    <div class="up-price-icon">
                        ${(currentUserId === bid.user.id) ? 
                        `<i class="fa-solid fa-caret-up cursor-pointer" 
                            onclick="quickUpPrice(${bid.auction.id}, '${bid.user.id}')"></i>` : ``}
                    </div>
                </div>
                <div class="commentFormReply position-relative my-2 new-price-form">
                    <form class="w-100" onsubmit="newPrice(${bid.auction.id}, '${bid.user.id}', this)">
                        <input type="number" name="bidValue" autocomplete="off" placeholder="Nhập giá cạnh tranh (VNĐ)" class="add-comment" />
                        <span class="text-danger err-validate" style="display: none">Vui lòng đặt giá cao hơn</span>
                    </form>
                    <div class="point-to-formReply"></div>
                </div>
                <param id="money" value="${bid.money}"/>
            </div>`;
}

function auctionItem(auction) {
    
    return `<div class="post auction-post-${auction.id}">
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

                                <a href="#" class="text-secondary px-2" id="cardFeedAction" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cardFeedAction">
                                    ${(auction.endDate <= Date.now()) ?
                                        `
                                        <li>
                                            <div class="dropdown-item cursor-default">
                                                Đấu giá đã kết thúc
                                            </div>
                                        </li>
                                        ` : ``}
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

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-body pb-2">
                        <p class="post--content mb-3 auction-${auction.id}">
                            ${auction.content}
                        </p>

                        <p class="auction--price mb-1">
                            ${(auction.endDate < Date.now()) ?
            `<span class="small">Đấu giá đã kết thúc (hãy xem người chiến thắng, nếu người thắng cuộc không thanh toán hãy báo cáo lại cho chúng tôi)
                            <i class="fa-solid fa-triangle-exclamation text-danger"></i>
                            </span>` :
            `Giá khởi điểm:<span class="ms-2">${formatMoney(auction.startingPrice)}</span>`}
                        </p>
                        <p class="auction--price mb-3">Kết thúc ngày ${formatDate(auction.endDate)}</p>

                        <img class="card-img post--img auction--img" src="${auction.image}" alt="Post image" onclick="showFull2(this)">

                        <div class="line"></div>

                        <div class="post--action py-2 d-flex flex-nowrap align-items-center justify-content-between">
                            <div class="post--action-like w-100 d-flex justify-content-center align-items-center">
                            ${(auction.endDate >= Date.now()) ?
                                `<div class="auction--action-hover" id="showBidBtn" onclick="showBid(this, ${auction.id})">
                                    <div class="text-center me-2 bid-loading-${auction.id}" style="display: none">
                                        <div class="spinner-border text-muted"></div>
                                    </div>
                                    <i class="fa-solid fa-eye"></i>
                                    <span class="auction--action-text auction-follow ms-2">Đấu giá (<span id="countBid">${auction.bidSetLength}</span> người đã tham gia)</span>
                                </div>` :
                                `<div class="btn-disable">
                                    <i class="fa-solid fa-check"></i>
                                    <span class="auction--action-text auction-follow ms-2">Bài đấu giá đã kết thúc</span>
                                </div>`}

                            </div>
                        </div>

                        <div class="auction-user-join">
                        ${auction.userId.id !== currentUserId ?
                            `<div class="d-flex align-items-center my-2" id="bidForm">
                                <div class="me-2">
                                    <a href="#">
                                        <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="avatar">
                                    </a>
                                </div>
                                <form class="w-100" onsubmit="addBid(${auction.id}, this, ${auction.startingPrice})">
                                    <input type="number" name="bidValue" autocomplete="off" placeholder="Nhập giá cạnh tranh (VNĐ)" class="add-comment" />
                                    <span class="text-danger err-validate" style="display: none">Số tiền đấu giá tối thiểu phải là ${formatMoney(auction.startingPrice)}</span>
                                </form>
                            </div>` : ``}    

                            <div class="text-center mt-3 bid-loading" style="display:none;">
                                <div class="spinner-border text-muted"></div>
                            </div>
                            <div class="bided">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function userListItem(u) {
    return `
    <tr class="report-item" id="${u.id}">
        <td colspan="2">${u.id}</td>
        <td colspan="3">${u.email}</td>
        <td colspan="1">${new Date(u.birthdate).toISOString().slice(0,10)}</td>
        <td colspan="1">${u.userRole}</td>
        <td colspan="1">${u.active}</td>
        <td colspan="2" class="d-flex gap-1 w-auto">
            <button class="btn btn-primary text-nowrap px-1" onclick="openUserModal('${u.id}')">Chỉnh sửa</button>
            <button class="btn btn-danger text-nowrap px-1" onclick="deleteUser('${u.id}')">Xóa</button>
            ${u.active === 0 ? `
            <button class="btn btn-info text-nowrap px-1" onclick="enableUser('${u.id}')">Kích hoạt</button>
            ` : ``}    
        </td>
    </tr>
    `;
}