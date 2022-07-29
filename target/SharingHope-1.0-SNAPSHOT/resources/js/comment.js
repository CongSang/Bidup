function addComment(currentUser, currentPost, formEl) {
    event.preventDefault();
//    var form = document.forms.commentForm;
    var formData = new FormData(formEl);
    
    $.ajax({
        type: 'post',
        url: '/SharingHope/api/create-comment',
        data:JSON.stringify({
            'content':formData.get('commentContent'),
            'userId':currentUser,
            'postId':currentPost
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
    
      
//    var h = `<div class="d-flex comment--item py-2">
//                <div class="me-2">
//                    <a href="#">
//                        <img class="comment--avatar rounded-circle" src="" alt="avatar">
//                    </a>
//                </div>
//                <div>
//                    <div class="bg-light comment--item-content">
//                        <div class="d-flex justify-content-between">
//                            <h6 class="mb-1 me-2"><a href="#">${currentUser}</a></h6>
//                            <small>now</small>
//                        </div>
//                        <p class="small mb-0">
//                            ${formData.get('commentContent')}
//                        </p>
//                    </div>
//                </div>
//            </div>`;
//    var commentSection = $(form).parents('.comment');
//    $(commentSection).append(h);
}   