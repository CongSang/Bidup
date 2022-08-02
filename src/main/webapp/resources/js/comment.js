function addComment(currentPostId, formEl) {
    event.preventDefault();
    var formData = new FormData(formEl);
    $(formEl).parents('.comment').find('.comment-loading').css("display", "block");
    
    $.ajax({
        type: 'post',
        url: '/SharingHope/api/create-comment',
        data:JSON.stringify({
            'content':formData.get('commentContent'),
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
                        <div>
                            <div class="bg-light comment--item-content">
                                <div class="d-flex justify-content-between">
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

function createReact(currentUserId, currentPostId, element) {
    var heartReact = $(element).find(".heart-like-button");
    
    if ($(heartReact).hasClass("liked")) {
        
        $(heartReact).removeClass("liked");
        likeCounter = parseInt($(element).find('#likeCounter').text()) - 1;
        $(element).find('#likeCounter').text(likeCounter);
        
        $.ajax({
            type: 'delete',
            url: '/SharingHope/api/delete-react',
            data:JSON.stringify({
                'postId':currentPostId
            }),
            contentType: 'application/json',
            dataType: 'json'
        });
    }
    else {
        $(heartReact).addClass("liked");
        likeCounter = parseInt($(element).find('#likeCounter').text()) + 1;
        $(element).find('#likeCounter').text(likeCounter);
        
        $.ajax({
            type: 'post',
            url: '/SharingHope/api/create-react',
            data:JSON.stringify({
                'postId':currentPostId
            }),
            contentType: 'application/json',
            dataType: 'json'
        });
    }
}

function deleteComment(id, el) {}