
var is_show = false;
var is_show_formReplyComment = false;
let commentLoading = `<div class="text-center mt-3 comment-loading">
                        <div class="spinner-border text-muted"></div>
                    </div>`;

function addComment(currentPostId, formEl) {
    event.preventDefault();
    var formData = new FormData(formEl);
    const commentContent = formData.get('commentContent');

    if (!isBlank(commentContent)) {
        $(formEl).parents('.comment').find('.comment-loading').css("display", "block");
        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/create-comment`,
            data: JSON.stringify({
                'content': commentContent,
                'postId': currentPostId,
                'commentId': null
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                $(formEl).parents('.comment').find('.comment-loading').css("display", "none");

                var commentSection = $(formEl).parents('.comment').find('#commentedComment');
                $(commentSection).prepend(commentItem(data, currentPostId));
                
                let count = $(formEl).parents('.comment').find('#commentSetLength').text();
                $(formEl).parents('.comment').find('#commentSetLength').text(++count);
                count = $(formEl).parents('.comment').find('#showedCommentLength').text();
                $(formEl).parents('.comment').find('#showedCommentLength').text(++count);
                
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
    var clickedComment = $(`#commentItem${id}`);
    var clickedCommentHtml = $(clickedComment).html();

    swal({
        title: "Bạn có chắc xóa bình luận này?",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((isDeleted) => {
        if (isDeleted) {
            clickedComment.html(loadingHtml);
            
            $.ajax({
                type: 'delete',
                url: `${ctxPath}/api/delete-comment/${id}`,
                dataType: 'json',
                success: function () {
                    swal("Xóa bình luận thành công", {
                        icon: "success"
                    });
                    $(clickedComment).remove();
                }
            })
            .fail(function () {
                $(clickedComment).html(clickedCommentHtml);
            });
        }
    });
}

function showComment(element, postId) {
    var comment = $(element).parents("div.post").find("div.comment");
    $(comment).find('#commentedComment').empty();

    $(comment).find('.comment-loading').css("display", "block");
    if (comment.hasClass('is-show')) {
        comment.removeClass('is-show');
        $(element).parents('.post').find('#commentPage').val(1);
    } else {
        comment.addClass('is-show');
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
                let loadedCommentIds = $('.comment--item').map(function(){
                    return $(this).attr('id');
                }).get();
                comments.sort(function (a, b) {
                    return new Date(b.commentDate) - new Date(a.commentDate);
                });
                
                currentPost.find('.comment-loading').css("display", "none");
                
                let userComment = comments.filter(c => c.userId.id === currentUserId
                        && jQuery.inArray(`commentItem${c.id}`, loadedCommentIds) === -1);
//                });

                let othersComment = comments.filter(c => c.userId.id !== currentUserId
                        && jQuery.inArray(`commentItem${c.id}`, loadedCommentIds) === -1);
                
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
            if(max > count)
                currentPost.find('.showMore').css('opacity', '1');
            else 
                currentPost.find('.showMore').css('opacity', '0');
            
            let url = new URL(window.location.toString());
            let commentId = url.searchParams.get('comment_id');
            if(commentId === undefined || commentId === null) return;
            if(commentId !== undefined || commentId !== null) {
                if ($('#commentItem' + commentId) !== undefined) {
                    $(window).scrollTop($('#commentItem' + commentId).offset().top - 300);
                    $('#commentItem' + commentId).find('.comment-content' + commentId).addClass('tada');
                }
                else {
                    let commentItem = getComment(commentId);
                }
            }
        });
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
    if (formReply.hasClass('form-reply-is-show')) {
        formReply.removeClass('form-reply-is-show');
    } else {
        formReply.addClass('form-reply-is-show');
    }
}

function loadReplies(commentId, postId) {
    let currentComment = $('#commentItem' + commentId);
    var repliedComment = currentComment.find(`.repliedComments${commentId}`);

    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/get-replies?page=0&commentId=${commentId}`,
        dataType: 'json',
        success: function (comments) {
            let loadedCommentIds = $('.comment--item').map(function () {
                return $(this).attr('id');
            }).get();

                let userComment = comments.filter(c => c.userId.id === currentUserId
                        && jQuery.inArray(`commentItem${c.id}`, loadedCommentIds) === -1);
                userComment.sort(function (a, b) {
                    return new Date(b.commentDate) - new Date(a.commentDate);
                });
                let othersComment = comments.filter(c => c.userId.id !== currentUserId
                        && jQuery.inArray(`commentItem${c.id}`, loadedCommentIds) === -1);
                othersComment.sort(function (a, b) {
                    return new Date(b.commentDate) - new Date(a.commentDate);
                });

                $(repliedComment).append(`${(userComment).map((comment, index) => {
                    return commentItem(comment, postId);
                }).join('')}`);

                $(repliedComment).append(`${(othersComment).map((comment, index) => {
                    return commentItem(comment, postId);
                }).join('')}`);
            $('#loadReply' + commentId).remove();
        }
    });
}

function addReply(currentCommentId, formEl, postId) {
    event.preventDefault();
    var formData = new FormData(formEl);
    let commentContent = formData.get('commentContent');
    let currentComment = $(`#commentItem${currentCommentId}`);

    if (!isBlank(commentContent)) {
            currentComment.find(`.repliedComments${currentCommentId}`).prepend(commentLoading);
        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/create-comment`,
            data: JSON.stringify({
                'content': commentContent,
                'postId': null,
                'commentId': currentCommentId
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                currentComment.find('.comment-loading').remove();

                currentComment.find(`.repliedComments${currentCommentId}`).prepend(commentItem(data, postId));

                currentComment.find('input[name=commentContent]').val("");
            }
        });
    }
}

function formEditComment(commentId, postId) {
    return `<div style="width: 200px">
                <form class="w-100" onsubmit="editComment(${commentId}, this, ${postId})">
                    <input name="editContent" placeholder="Aa" rows=2 id="form-edit-comment${commentId}" class="form-edit-comment"></input>
                </form>
                <div class="cancel-edit-comment cancel-edit-comment${commentId}">Hủy</div>
            </div>`;
}

function showEditComment(commentId, postId) {
    const currentComment = $(`.comment--item-content${commentId}`).html();
    $(`.comment--item-content${commentId}`).html(formEditComment(commentId, postId));
    $(`.cancel-edit-comment${commentId}`).on('click', function () {
        $(`.comment--item-content${commentId}`).empty();
        $(`.comment--item-content${commentId}`).append(currentComment);
    });
}

function editComment(commentId, formEl, postId) {
    event.preventDefault();
    let editCommentLoading = `<div class="text-center comment-loading" style="padding: 26px;">
                        <div class="spinner-border text-muted"></div>
                    </div>`;
    var formData = new FormData(formEl);
    const commentContent = formData.get('editContent');
    const currentComment = $(`#commentItem${commentId}`);

    if (!isBlank(commentContent)) {
        currentComment.html(editCommentLoading);
        $.ajax({
            type: 'put',
            url: `${ctxPath}/api/edit-comment/${commentId}`,
            data: JSON.stringify({
                'content': commentContent,
                'postId': null,
                'commentId': null
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (comment) {
                
                currentComment.find('.comment-loading').remove();
                currentComment.html(commentItem(comment, postId));

            }
        }).fail(function (res) {
            console.log(res);
        });
    }
}