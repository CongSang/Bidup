function addComment(currentPostId, formEl) {
    event.preventDefault();
//    var form = document.forms.commentForm;
    var formData = new FormData(formEl);
    
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
                        </div>
                    </div>`;
            
            var commentSection = $(formEl).parents('.comment').find('#commentedComment');
            $(commentSection).prepend(h);
        }
    });
}   

function createReact(currentUserId, currentPostId, element) {
    var heartReact = $(element).find(".fa-heart");
    
    if ($(heartReact).hasClass("liked")) {
        
        $(heartReact).removeClass("liked fa-solid");
        $(heartReact).addClass("fa-regular");
        likeCounter = parseInt($(element).find('#likeCounter').text()) - 1;
        $(element).find('#likeCounter').text(likeCounter);
        
        $.ajax({
            type: 'post',
            url: '/SharingHope/api/delete-react',
            data:JSON.stringify({
                'postId':currentPostId
            }),
            contentType: 'application/json',
            dataType: 'json'
        });
    }
    else {
        $(heartReact).removeClass("fa-regular");
        $(heartReact).addClass("fa-solid liked");
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