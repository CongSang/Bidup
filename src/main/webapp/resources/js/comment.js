
function addComment(currentPostId, formEl) {
    event.preventDefault();
    var formData = new FormData(formEl);
    const commentContent = formData.get('commentContent');
    
    if(commentContent !== "" && !isBlank(commentContent)) {
        $(formEl).parents('.comment').find('.comment-loading').css("display", "block");
        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/create-comment`,
            data:JSON.stringify({
                'content':commentContent,
                'postId':currentPostId
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
                                        <h6 class="mb-1 me-2"><a href="#">${data.userId.lastname} ${data.userId.firstname}</a></h6>
                                        <small>${moment(data.commentDate).fromNow()}</small>
                                    </div>
                                    <p class="small mb-0">
                                        ${data.content}
                                    </p>
                                </div>
                                <div class="d-flex justify-content-end me-2">
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
    }
    else {
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
    var loadingHtml =   `   <div class="text-center mt-3 comment-loading">
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
    .fail(function (){
        $(clickedComment).html(clickedCommentHtml);
    });
}
