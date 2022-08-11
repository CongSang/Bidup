var postFetching = false;
var postPage = 1;
var disableLoadMorePost = false;

function loadFeeds(posts) {
    var userAvatar = $("#userAvatar").attr("src");
    $.each(posts, function (index, post) {
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
                                <div class="post--action-hover" id="likeAction" onclick="createReact('${post.id}', this)">
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
                                <span class="showMore">Xem thêm bình luận</span>
                                <span>10/20</span>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    <span class="post--action-text ms-2">Bình luận (<span id="commentCounter">0</span>)</span>
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
                            
                        </div>
                    </div>
                </div>
            </div>
            `;
    $(feedContainer).prepend(html);
    customHashtag(`.post-${post.id}`);
};

$(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    var windowHeight = $(this).height();
    var documentHeight = $(document).height();

    if ((windowHeight + scrollTop) >= documentHeight - 10) {
        postNextPage();
        var loca = window.location.toString();
        if (!disableLoadMorePost) {
            if(window.location === `${ctxPath}/`)
                loadPosts(postPage);
            if(loca.includes(`${ctxPath}/hashtag/`))
                hashTagSearch();
        }
    }
});

function postNextPage() {
    if (postFetching) return;
    
    postPage++;
}

