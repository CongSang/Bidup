function addComment(currentUser, currentPost) {
    event.preventDefault()
    var form = document.forms.commentForm;
    var formData = new FormData(form);
    console.log(`${currentUser} commented on ${currentPost}: ${formData.get('commentContent')}`);
    
    $.ajax({
        type: 'post',
        url: '/SharingHope/api/add-comment',
        data:JSON.stringify({
            'content':formData.get('commentContent'),
            'userId':currentUser,
            'postId':currentPost
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var h = `<div class="d-flex comment--item py-2">
                        <div class="me-2">
                            <a href="#">
                                <img class="comment--avatar rounded-circle" src="" alt="avatar">
                            </a>
                        </div>
                        <div>
                            <div class="bg-light comment--item-content">
                                <div class="d-flex justify-content-between">
                                    <h6 class="mb-1 me-2"><a href="#">${currentUser}</a></h6>
                                    <small>now</small>
                                </div>
                                <p class="small mb-0">
                                    ${formData.get('commentContent')}
                                </p>
                            </div>
                        </div>
                    </div>`;
            var commentSection = $(form).parents('.comment');
            $(commentSection).append(h);
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