var is_show = false;
//var commentPage = 1;
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

                var he = `<div id="commentItem${data.id}" class="d-flex comment--item py-2">
                            <div class="me-2">
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="${data.userId.avatar}" alt="avatar">
                                </a>
                            </div>
                            <div class="comment--item-content">
                                <div class="bg-light comment-content">
                                    <div class="d-flex justify-content-start align-items-center">
                                        <h6 class="mb-1 me-2"><a href="#">${data.userId.lastname} ${data.userId.firstname}
                                            ${data.userId.id === data.postId.userId.id ?
                                            `<span class="author-post"><i class="fa-solid fa-circle-check"></i></span>` : ``}
                                        </a></h6>
                                        <small class="comment-date">${moment(data.commentDate).fromNow()}</small>
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
                
                var h = commentItem(data);

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

function deleteComment(id) {
    var loadingHtml = `   <div class="text-center mt-3 comment-loading">
                            <div class="spinner-border text-muted"></div>
                        </div>
                    `;
    var clickedComment = $('#commentItem' + id);
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
    var comment = $(element).parents("div.post").find("div.comment");
    $(comment).find('#commentedComment').empty();

    $(comment).find('.comment-loading').css("display", "block");
    if (comment.hasClass('comment-is-show')) {
        comment.removeClass('comment-is-show');
        $(element).parents('.post').find('#commentPage').val(1);
    } else {
        comment.addClass('comment-is-show');
        $.ajax({
            type: 'get',
            url: `${ctxPath}/api/get-comment-count/` + postId,
            dataType: 'json',
            success: function (count) {
                comment.find('#commentSetLength').text(count);
            }
        });
        loadComment(postId);
    }
}

function loadComment(postId) {
    let currentPost = $('#post' + postId);
    let commentPage = currentPost.find('#commentPage').val();
    var commentedComment = currentPost.find('#commentedComment');
    
    $.ajax({
            type: 'get',
            url: `${ctxPath}/api/get-comments?page=` + commentPage + '&postId=' + postId,
            dataType: 'json',
            success: function (comments) {
                currentPost.find('.comment-loading').css("display", "none");
                
                let userComment = comments.filter(c => c.userId.id === currentUserId);
                userComment.sort(function (a, b) {
                    return new Date(b.commentDate) - new Date(a.commentDate);
                });
                let othersComment = comments.filter(c => c.userId.id !== currentUserId);
                othersComment.sort(function (a, b) {
                    return new Date(b.commentDate) - new Date(a.commentDate);
                });

                $(commentedComment).append(`${(userComment).map((comment, index) => {
                    return commentItem(comment, postId);
                }).join('')}`);

                $(commentedComment).append(`${(othersComment).map((comment, index) => {
                    return commentItem(comment, postId);
                }).join('')}`);
                
                commentPage++;
                currentPost.find('#commentPage').val(commentPage);
            }
        })
        .fail(function () {
                    currentPost.find('div.comment').removeClass('comment-is-show');
        })
        .done(function() {
            let count = currentPost.find('#commentedComment').children('.comment--item').length;
            let max = currentPost.find('#commentSetLength').text();
            
            
            currentPost.find('#showedCommentLength').text(count);
            if(count == max)
                currentPost.find('.showMore').css('opacity', '0');
            
            let url = new URL(window.location.toString());
            let commentId = url.searchParams.get('comment_id');
            if(commentId === undefined || commentId === null) return;
            if(commentId !== undefined || commentId !== null) {
                $(window).scrollTop($('#commentItem' + commentId).offset().top - 300);
                $('#commentItem' + commentId).find('.comment-content' + commentId).addClass('tada');
            }
        });
}

function commentItem(comment, postId) {
    let reactSetLength = comment.reactCommentSet === null ? 0 : comment.reactCommentSet.length;
    let postOwnerId = $(`#post${postId}OwnerId`).val();
    let commentSetLength = comment.commentSet === null ? 0 : comment.commentSet.length;
    
    return `<div id="commentItem${comment.id}" class="d-flex flex-column comment--item py-2 position-relative comment--item-have-reply">
                <div class="d-flex">
                    <div class="me-2" style="z-index: 1;">
                    <a href="${ctxPath}/user/${comment.userId.id}">
                        <img class="comment--avatar rounded-circle" src="${comment.userId.avatar}" alt="avatar">
                    </a>
                </div>
                <div class="comment--item-content">
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
                            style="display:${reactSetLength > 0 ? `flex`:`none`};">
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
                            ${(currentUserId === comment.userId.id || currentUserId === postOwnerId) ?
                                `<div class="comment-delete" onclick="deleteComment(${comment.id})">Xóa</div>` : ``}
                      </div>
                  </div>
                </div>
                <!--Dung de show reply-->
                ${commentSetLength > 0 ? `
                    <div id="commentReplies${comment.id}" class="reply-comments position-relative">
                        <div class="align-items-center my-2 commentFormReply"  id="commentFormReply${comment.id}">
                            <div class="me-2">
                                <a href="#">
                                    <img class="comment--avatar rounded-circle" src="${comment.userId.avatar}" alt="">
                                </a>
                            </div>
                            <form class="w-100" onsubmit="">
                                <input name="commentContent" type="text" placeholder="Thêm bình luận" class="add-comment" />
                            </form>
                        </div>
                        <div id="repliedComments"></div>
                        ${(comment.commentSet).map((comment, index) => {
                            return commentItem(comment, postId);
                        }).join('')}
                        <param id="replyPage" value="1"/>
                    </div>
                    <div class="btn-load-reply-comments" id="loadReply${comment.id}" onclick="loadReplies(${comment.id}, ${postId})">
                            <i class="fa-solid fa-reply me-2"></i>
                            <span>Xem <span class="count-reply">${commentSetLength}</span> phản hồi</span>
                    </div>`:``
                }
            </div>`;
}
    

function likedComment(commentItemId) {
    let cItem = $(`#commentItem${commentItemId}`);
    let likeBtn = cItem.find(`.comment-like${commentItemId}`);
    
    if (likeBtn.hasClass('liked')) {
        likeBtn.text("Thích");
        likeBtn.removeClass('liked');
        likeCounter = parseInt(cItem.find(`#count-liked-comment${commentItemId}`).text()) - 1;
        cItem.find(`#count-liked-comment${commentItemId}`).text(likeCounter);
        if (likeCounter < 1) {
            cItem.find(`.count-like-comment${commentItemId}`).css('display', 'none');
        }
        
        $.ajax({
            type: 'delete',
            url: `${ctxPath}/api/delete-react-comment/${commentItemId}`,
            dataType: 'json'
        });
    } else {
        likeBtn.text("Ðã Thích");
        likeBtn.addClass('liked');
        likeCounter = parseInt(cItem.find(`#count-liked-comment${commentItemId}`).text()) + 1;
        cItem.find(`#count-liked-comment${commentItemId}`).text(likeCounter);
        if (likeCounter > 0) {
            cItem.find(`.count-like-comment${commentItemId}`).css('display', 'flex');
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

function loadReplies(commentId, postId) {
    let currentComment = $('#commentItem'+ commentId);
    let replyPage = currentComment.find('#replyPage').val();
    var repliedComment = currentComment.find('#repliedComments');
    
    $.ajax({
            type: 'get',
            url: `${ctxPath}/api/get-replies?page=${replyPage}&commentId=${commentId}`,
            dataType: 'json',
            success: function (comments) {
                
                let userComment = comments.filter(c => c.userId.id === currentUserId);
                userComment.sort(function (a, b) {
                    return new Date(b.commentDate) - new Date(a.commentDate);
                });
                let othersComment = comments.filter(c => c.userId.id !== currentUserId);
                othersComment.sort(function (a, b) {
                    return new Date(b.commentDate) - new Date(a.commentDate);
                });

                $(repliedComment).append(`${(userComment).map((comment, index) => {
                    return commentItem(comment, postId);
                }).join('')}`);

                $(repliedComment).append(`${(othersComment).map((comment, index) => {
                    return commentItem(comment, postId);
                }).join('')}`);
                
                replyPage++;
                currentComment.find('#replyPage').val(replyPage);
            }
        })
        .done(function() {
//            let url = new URL(window.location.toString());
//            let commentId = url.searchParams.get('comment_id');
//            if(commentId === undefined || commentId === null) return;
//            if(commentId !== undefined || commentId !== null) {
//                $(window).scrollTop($('#commentItem' + commentId).offset().top - 300);
//                $('#commentItem' + commentId).find('.comment-content' + commentId).addClass('tada');
//            }
        });
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
                    <!--commentItem-->
                    ${commentItemTest(test)}
                    ${commentItemTest(test)}
                </div>
            `;
}



    var test = {
    "reactCommentSet": [
        {
            "reactCommentPK": {
                "userId": "abcde",
                "commentId": 10000
            },
            "type": 1,
            "createdDate": 1660316516000,
            "user": {
                "id": "abcde",
                "email": "1951052169sang@ou.edu.vn",
                "firstname": "Công San",
                "lastname": "Hồ Nguyễn",
                "birthdate": 997808400000,
                "address": "79/43 BBTT",
                "hometown": "Nghệ An",
                "job": "Sinh viên",
                "phone": "0823262356",
                "createdDate": 1658682000000,
                "avatar": "https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-2.jpg",
                "userRole": "ROLE_ADMIN",
                "active": 1
            }
        },
        {
            "reactCommentPK": {
                "userId": "abcd",
                "commentId": 48
            },
            "type": 1,
            "createdDate": 1660316416000,
            "user": {
                "id": "abcd",
                "email": "honguyencongsang723@gmail.com",
                "firstname": "Công Sang",
                "lastname": "Hồ Nguyễn",
                "birthdate": 997808400000,
                "address": "79/43 BBTT",
                "hometown": "Nghệ An",
                "job": "Sinh viên",
                "phone": "0823262356",
                "createdDate": 1658682000000,
                "avatar": "https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg",
                "userRole": "ROLE_USER",
                "active": 1
            }
        }
    ],
    "id": 48,
    "content": "thu binh",
    "commentDate": 1660294648000,
    "postId": {
        "id": 48,
        "content": "#sharinghope #test",
        "image": "",
        "postedDate": 1660221635000,
        "active": 1,
        "hashtag": "#sharinghope #test ",
        "userId": {
            "id": "abcd",
            "email": "honguyencongsang723@gmail.com",
            "firstname": "Công Sang",
            "lastname": "Hồ Nguyễn",
            "birthdate": 997808400000,
            "address": "79/43 BBTT",
            "hometown": "Nghệ An",
            "job": "Sinh viên",
            "phone": "0823262356",
            "createdDate": 1658682000000,
            "avatar": "https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg",
            "userRole": "ROLE_USER",
            "active": 1
        },
        "reactSet": [
            {
                "reactPK": {
                    "userId": "abcde",
                    "postId": 48
                },
                "type": 1,
                "createdDate": 1660316511000,
                "user": {
                    "id": "abcde",
                    "email": "1951052169sang@ou.edu.vn",
                    "firstname": "Công San",
                    "lastname": "Hồ Nguyễn",
                    "birthdate": 997808400000,
                    "address": "79/43 BBTT",
                    "hometown": "Nghệ An",
                    "job": "Sinh viên",
                    "phone": "0823262356",
                    "createdDate": 1658682000000,
                    "avatar": "https://res.cloudinary.com/dynupxxry/image/upload/v1657817662/cld-sample-2.jpg",
                    "userRole": "ROLE_ADMIN",
                    "active": 1
                }
            },
            {
                "reactPK": {
                    "userId": "d2a12b78-3243-4d57-af9f-c4a3b1205ed9",
                    "postId": 48
                },
                "type": 1,
                "createdDate": 1660320196000,
                "user": {
                    "id": "d2a12b78-3243-4d57-af9f-c4a3b1205ed9",
                    "email": "conghoangho1802@gmail.com",
                    "firstname": "Công Hoàng",
                    "lastname": "Hồ",
                    "birthdate": 1108141200000,
                    "address": "",
                    "hometown": "TP.HCM",
                    "job": "",
                    "phone": "0823262356",
                    "createdDate": 1660237200000,
                    "avatar": "https://res.cloudinary.com/quoc2401/image/upload/v1660320178/tlcmurkhjrrplqyiroso.jpg?public_id=tlcmurkhjrrplqyiroso",
                    "userRole": "ROLE_USER",
                    "active": 1
                }
            },
            {
                "reactPK": {
                    "userId": "abcd",
                    "postId": 48
                },
                "type": 1,
                "createdDate": 1660319536000,
                "user": {
                    "id": "abcd",
                    "email": "honguyencongsang723@gmail.com",
                    "firstname": "Công Sang",
                    "lastname": "Hồ Nguyễn",
                    "birthdate": 997808400000,
                    "address": "79/43 BBTT",
                    "hometown": "Nghệ An",
                    "job": "Sinh viên",
                    "phone": "0823262356",
                    "createdDate": 1658682000000,
                    "avatar": "https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg",
                    "userRole": "ROLE_USER",
                    "active": 1
                }
            }
        ]
    },
    "userId": {
        "id": "abcd",
        "email": "honguyencongsang723@gmail.com",
        "firstname": "Công Sang",
        "lastname": "Hồ Nguyễn",
        "birthdate": 997808400000,
        "address": "79/43 BBTT",
        "hometown": "Nghệ An",
        "job": "Sinh viên",
        "phone": "0823262356",
        "createdDate": 1658682000000,
        "avatar": "https://res.cloudinary.com/dynupxxry/image/upload/v1657817661/cld-sample.jpg",
        "userRole": "ROLE_USER",
        "active": 1
    }
};

function commentItemTest(comment) {
    return `<div id="commentItem${comment.id}" class="d-flex flex-column comment--item py-2 position-relative comment--item-have-reply">
                    <div class="d-flex">
                        <div class="me-2" style="z-index: 1;">
                        <a href="${ctxPath}/user/${comment.userId.id}">
                            <img class="comment--avatar rounded-circle" src="${comment.userId.avatar}" alt="avatar">
                        </a>
                    </div>
                    <div class="comment--item-content">
                        <div class="bg-light comment-content">
                            <div class="d-flex justify-content-start align-items-center">
                                <h6 class="mb-1 me-2 d-flex align-items-center"><a href="${ctxPath}/user/${comment.userId.id}">${comment.userId.lastname} ${comment.userId.firstname}
                                    ${comment.userId.id === comment.postId.userId.id ?
                                    `<span class="author-post"><i class="fa-solid fa-circle-check"></i></span>` : ``}
                                </a></h6>
                                <small class="comment-date">${moment(comment.commentDate).fromNow()}</small>
                            </div>
                            <p class="small mb-0">
                                ${comment.content}
                            </p>
                            
                            <!--count like comment-->
                            <div class="count-like-comment bg-light" 
                                style="display:${comment.reactCommentSet.length > 0 ? `flex`:`none`};">
                                <img class="" height="20" role="presentation" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" width="20">
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
            </div>`;
}