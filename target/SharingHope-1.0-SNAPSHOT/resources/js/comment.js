var is_show = false;
var commentPage = 1;

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

function showComment(element, postId) {
    commentPage = 1;
    var comment = $(element).parents("div.post").find("div.comment");
    
    $(comment).find('#commentedComment').empty();
    
    $(comment).find('.comment-loading').css("display", "block");
    if(is_show) {
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
        .fail(function (){
            comment.css("display", "none");
            is_show = false;
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
    }).join('')}`);
    
    $(commentedComment).append(`${(othersComment).map((comment, index) => {
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
        }).join('')}`);

}