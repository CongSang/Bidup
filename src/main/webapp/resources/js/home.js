const modal = document.querySelector("#modalCreatePost");
const modalContainer = document.querySelector(".modal-container-post");
const btn_close = document.querySelectorAll(".modal--close-post");
const btn_show = document.querySelectorAll(".btn-show--post");

function showModal() {
    modal.classList.add('open');
}

function closeModal() {
    modal.classList.remove('open');
}

btn_show.forEach(btn => {
    btn.addEventListener("click", showModal);
});

btn_close.forEach(btn => {
    btn.addEventListener("click", closeModal);
});

modalContainer.addEventListener("click", function (event) {
    event.stopPropagation();
});

//Show image after pick picture
function previewImage(el) {
    var oFReader = new FileReader();
    if (el.id === 'uploadImage') {
        oFReader.readAsDataURL(document.querySelector("#uploadImage").files[0]);

        oFReader.onload = function (oFREvent) {
            document.querySelector("#uploadPreview").src = oFREvent.target.result;
        };
        
        $(el).parents('.modal-post').find('.modal--remove-img').css('opacity', '0.6');
    }
    else {
        oFReader.readAsDataURL(document.querySelector("#editImage").files[0]);

        oFReader.onload = function (oFREvent) {
            document.querySelector("#editPreview").src = oFREvent.target.result;
        };
        $(el).parents('.modal-post').find('.modal--remove-img').css('opacity', '0.6');
    }
};

function removeImg(el) {
    $(el).parents('.modal-post').find('.imagePreview').attr('src', '');
    $(el).parents('.modal-post').find('.modal--remove-img').css('opacity', '0');
    $(el).parents('.modal-post').find('.upload-image').val(undefined);
}

function showFull(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "flex";
}


var is_show = false;
function showComment(element) {
    var comment = $(element).parents("div.post").find("div.comment");
    if(is_show) {
        comment.css("display", "none");
        is_show = false;
    } else {
        comment.css("display", "block");
        is_show = true;
    }
};

const loadFeeds = function loadFeeds(posts, currentUserId) {
    var userAvatar = $("#userAvatar").attr("src");
    $.each(posts, function (index, post) {

        let userComment = post.commentSet.filter(c => c.userId.id === currentUserId);
        userComment.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.commentDate) - new Date(a.commentDate);
        });
        let othersComment = post.commentSet.filter(c => c.userId.id !== currentUserId);
        othersComment.sort(function (a, b) {
            return new Date(b.commentDate) - new Date(a.commentDate);
        });

        var html = `<div class="post" id="post${post.id}">      <!--Phan nay fecth du lieu de render-->
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
                                                            <a class="dropdown-item" href="#">
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
                                <div class="post--action-hover" onclick="showComment(this)">
                                    <i class="fa-regular fa-message post--action-icon"></i>
                                    <span class="post--action-text ms-2">Bình luận (<span id="commentCounter">${post.commentSet.length}</span>)</span>
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
                                ${(userComment).map((comment, index) => {
                                        return `
                                          <div class="d-flex comment--item py-2">
                                                <div class="me-2">
                                                    <a href="${ctxPath}/user/${comment.userId.id}">
                                                        <img class="comment--avatar rounded-circle" src="${comment.userId.avatar}" alt="avatar">
                                                    </a>
                                                </div>
                                                <div class="comment--item-content">
                                                  <div class="bg-light comment-content">
                                                      <div class="d-flex justify-content-start">
                                                          <h6 class="mb-1 me-2"><a href="${ctxPath}/user/${comment.userId.id}">${comment.userId.lastname} ${comment.userId.firstname}</a></h6>
                                                          <small>${moment(comment.commentDate).fromNow()}</small>
                                                      </div>
                                                      <p class="small mb-0">
                                                          ${comment.content}
                                                      </p>
                                                  </div>
                                                    <div class="d-flex justify-content-end me-2">
                                                        <div class="comment-delete" onclick="deleteComment(${comment.id}, this)">Xóa</div>
                                                    </div>
                                                </div>
                                                
                                          </div>`;
                                }).join('')}
                                
                                ${(othersComment).map((comment, index) => {
                                     return `
                                          <div class="d-flex comment--item py-2">
                                              <div class="me-2">
                                                  <a href="${ctxPath}/user/${comment.userId.id}">
                                                      <img class="comment--avatar rounded-circle" src="${comment.userId.avatar}" alt="avatar">
                                                  </a>
                                              </div>
                                              <div class="comment--item-content">
                                                  <div class="bg-light comment-content">
                                                      <div class="d-flex justify-content-start">
                                                          <h6 class="mb-1 me-2"><a href="${ctxPath}/user/${comment.userId.id}">${comment.userId.lastname} ${comment.userId.firstname}</a></h6>
                                                          <small>${moment(comment.commentDate).fromNow()}</small>
                                                      </div>
                                                      <p class="small mb-0">
                                                          ${comment.content}
                                                      </p>
                                                  </div>
                                                    <div class="d-flex justify-content-end me-2">
                                                        <div class="comment-delete" onclick="deleteComment(${comment.id}, this)">Xóa</div>
                                                    </div>
                                                </div>
                                                
                                          </div>`;
                                }).join('')}
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

function prependFeeds(post) {
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
                                <div class="post--action-hover" onclick="showComment(this)">
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