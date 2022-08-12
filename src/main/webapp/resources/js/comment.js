var is_show = false;
var commentPage = 1;
var is_show_formReplyComment = false;

function addComment(currentPostId, formEl) {
    event.preventDefault();
    var formData = new FormData(formEl);
    const commentContent = formData.get('commentContent');

    if (commentContent !== "" && !isBlank(commentContent)) {
        $(formEl).parents('.comment').find('.comment-loading').css("display", "block");
        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/create-comment`,
            data: JSON.stringify({
                'content': commentContent,
                'postId': currentPostId
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                $(formEl).parents('.comment').find('.comment-loading').css("display", "none");

                var h = `<div class="d-flex comment--item py-2">
                            <div class="me-2">
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="${data.userId.avatar}" alt="avatar">
                                </a>
                            </div>
                            <div class="comment--item-content">
                                <div class="bg-light comment-content">
                                    <div class="d-flex justify-content-start">
                                        <h6 class="mb-1 me-2"><a href="#">${data.userId.lastname} ${data.userId.firstname}
                                            ${data.userId.id === data.postId.userId.id ?
                                            `<span class="author-post">Tác giả</span>` : ``}
                                        </a></h6>
                                        <small>${moment(data.commentDate).fromNow()}</small>
                                    </div>
                                    <p class="small mb-0">
                                        ${data.content}
                                    </p>
                                </div>
                                <div class="d-flex justify-content-end me-2">
                                    <div class="comment-like comment-like${data.id}" onclick="likedComment(${data.id})">Thích</div>
                                    <div class="comment-reply" onclick="showFormReply(${data.id})">Phản hồi</div>
                                    <div class="comment-delete" onclick="deleteComment(${data.id}, this)">Xóa</div>
                                </div>
                            </div>
                        </div>`;

                var commentSection = $(formEl).parents('.comment').find('#commentedComment');
                $(commentSection).prepend(h);

                const countComment = $(formEl).parents('.post').find('#commentCounter');
                countComment.text(parseInt(countComment.text()) + 1);
                $(formEl).parents('.comment').find('.add-comment').val("");
            }
        });
    }
}

function createReact(currentPostId, element) {
    var heartReact = $(element).find(".heart-like-button");

    if ($(heartReact).hasClass("liked")) {

        $(heartReact).removeClass("liked");
        likeCounter = parseInt($(element).find('#likeCounter').text()) - 1;
        $(element).find('#likeCounter').text(likeCounter);

        $.ajax({
            type: 'delete',
            url: `${ctxPath}/api/delete-react/${currentPostId}`,
            dataType: 'json'
        });
    } else {
        $(heartReact).addClass("liked");
        likeCounter = parseInt($(element).find('#likeCounter').text()) + 1;
        $(element).find('#likeCounter').text(likeCounter);

        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/create-react/${currentPostId}`,
            dataType: 'json'
        });
    }
}

function deleteComment(id, el) {
    var loadingHtml = `   <div class="text-center mt-3 comment-loading">
                            <div class="spinner-border text-muted"></div>
                        </div>
                    `;
    var clickedComment = $(el).parents('.comment--item');
    var clickedCommentHtml = $(clickedComment).html();

    clickedComment.html(loadingHtml);

    $.ajax({
        type: 'delete',
        url: `${ctxPath}/api/delete-comment/${id}`,
        dataType: 'json',
        success: function () {
            var commentCounter = $(clickedComment).parents('.post').find('#commentCounter');
            var counter = parseInt($(commentCounter).text()) - 1;
            $(commentCounter).text(counter);
            $(clickedComment).remove();
        }
    })
            .fail(function () {
                $(clickedComment).html(clickedCommentHtml);
            });
}

function showComment(element, postId) {
    commentPage = 1;
    var comment = $(element).parents("div.post").find("div.comment");

    $(comment).find('#commentedComment').empty();

    $(comment).find('.comment-loading').css("display", "block");
    if (is_show) {
        comment.css("display", "none");
        is_show = false;
    } else {
        comment.css("display", "block");

        $.ajax({
            type: 'get',
            url: `${ctxPath}/api/get-comments?page=` + commentPage + '&postId=' + postId,
            dataType: 'json',
            success: function (data) {
                $(comment).find('.comment-loading').css("display", "none");
                loadComment(data, $(comment));
                is_show = true;
            }
        })
        .fail(function () {
                    comment.css("display", "none");
                    is_show = false;
        })
        .done(function() {
            let url = new URL(window.location.toString());
            let commentId = url.searchParams.get('comment_id');
            if(commentId !== undefined) {
                $(window).scrollTop($('#commentItem' + commentId).offset().top - 300);
            }
        });
    }
}

function loadComment(comments, el) {
    var commentedComment = $(el).find('#commentedComment');
    let userComment = comments.filter(c => c.userId.id === currentUserId);
    userComment.sort(function (a, b) {
        return new Date(b.commentDate) - new Date(a.commentDate);
    });
    let othersComment = comments.filter(c => c.userId.id !== currentUserId);
    othersComment.sort(function (a, b) {
        return new Date(b.commentDate) - new Date(a.commentDate);
    });

    $(commentedComment).append(`${(userComment).map((comment, index) => {
        return commentItem(comment);
    }).join('')}`);

    $(commentedComment).append(`${(othersComment).map((comment, index) => {
        return commentItem(comment);
    }).join('')}`);
}

function commentItem(comment) {
    return `<div id="commentItem${comment.id}" class="d-flex flex-column comment--item py-2 position-relative comment--item-have-reply">
                    <div class="d-flex">
                        <div class="me-2" style="z-index: 1;">
                        <a href="${ctxPath}/user/${comment.userId.id}">
                            <img class="comment--avatar rounded-circle" src="${comment.userId.avatar}" alt="avatar">
                        </a>
                    </div>
                    <div class="comment--item-content">
                        <div class="bg-light comment-content">
                            <div class="d-flex justify-content-start">
                                <h6 class="mb-1 me-2 d-flex align-items-center"><a href="${ctxPath}/user/${comment.userId.id}">${comment.userId.lastname} ${comment.userId.firstname}
                                    ${comment.userId.id === comment.postId.userId.id ?
                                    `<span class="author-post">Tác giả</span>` : ``}
                                </a></h6>
                                <small>${moment(comment.commentDate).fromNow()}</small>
                            </div>
                            <p class="small mb-0">
                                ${comment.content}
                            </p>
                            
                            <!--count like comment-->
                            <div class="count-like-comment bg-light" 
                                style="display:${comment.reactCommentSet.length > 0 ? `block`:`none`};">
                                <img class="" height="18" role="presentation" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" width="18">
                                <span id="count-liked-comment" class="ms-1">${comment.reactCommentSet.length}</span>
                            </div>
                            
                        </div>
                          <div class="d-flex justify-content-end me-2">
                                ${comment.reactCommentSet.length === 0 ? `
                                    <div class="comment-like comment-like${comment.id}" onclick="likedComment(${comment.id})">Thích</div>` : (
                                    (comment.reactCommentSet).some((react) => react.user.id === currentUserId) ? 
                                        `<div class="comment-like comment-like${comment.id} liked" onclick="likedComment(${comment.id})">Ðã Thích</div>` :
                                        `<div class="comment-like comment-like${comment.id}" onclick="likedComment(${comment.id})">Thích</div>`
                                )}
                                    
                                
                                <div class="comment-reply" onclick="showFormReply(${comment.id})">Phản hồi</div>
                                ${(currentUserId === comment.userId.id || currentUserId === comment.postId.userId.id) ?
                                    `<div class="comment-delete" onclick="deleteComment(${comment.id}, this)">Xóa</div>` : ``}
                          </div>
                      </div>
                    </div>
                  <!--Dung de show reply-->
                    <div class="btn-load-reply-comments">
                            <i class="fa-solid fa-reply me-2"></i>
                            <span>Xem <span class="count-reply">5</span> phản hồi</span>
                    </div>
                  ${listReplyComment(comment.id)}
            </div>`;
}

function likedComment(commentItemId) {
    let cItem = $(`#commentItem${commentItemId}`);
    let likeBtn = cItem.find('.comment-like');
    
    if (likeBtn.hasClass('liked')) {
        likeBtn.text("Thích");
        likeBtn.removeClass('liked');
        likeCounter = parseInt(cItem.find('#count-liked-comment').text()) - 1;
        cItem.find('#count-liked-comment').text(likeCounter);
        if (likeCounter < 1) {
            cItem.find('.count-like-comment').css('display', 'none');
        }
        
        $.ajax({
            type: 'delete',
            url: `${ctxPath}/api/delete-react-comment/${commentItemId}`,
            dataType: 'json'
        });
    } else {
        likeBtn.text("Ðã Thích");
        likeBtn.addClass('liked');
        likeCounter = parseInt(cItem.find('#count-liked-comment').text()) + 1;
        cItem.find('#count-liked-comment').text(likeCounter);
        if (likeCounter > 0) {
            cItem.find('.count-like-comment').css('display', 'block');
        }
        
        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/create-react-comment/${commentItemId}`,
            dataType: 'json'
        });
    }
}

function showFormReply(commentItemId) {
    const formReply = $(`#commentFormReply${commentItemId}`);
    if(is_show_formReplyComment) {
        formReply.css("display", "none");
        is_show_formReplyComment = false;
    } else {
        formReply.css("display", "flex");
         is_show_formReplyComment = true;
    }
}

function listReplyComment(commentItemId) {
    var userAvatar = $("#userAvatar").attr("src");
    return `
                <div class="reply-comments position-relative">
                    <!--Form reply-->
                   <div class="align-items-center my-2 commentFormReply"  id="commentFormReply${commentItemId}">
                        <div class="me-2">
                            <a href="#">
                                <img class="comment--avatar rounded-circle" src="${userAvatar}" alt="">
                            </a>
                        </div>
                        <form class="w-100" onsubmit="">
                            <input name="commentContent" type="text" placeholder="Thêm bình luận" class="add-comment" />
                        </form>
                    </div>
                    
                    <!--Fetch ve thi show tiep comment item-->
                    <!--commentItem(data)-->
                </div>
            `;
}