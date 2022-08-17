let notifPage = 1;
let disableLoadMoreNotif = false;

function getNotifs() {
    var container = $('.list-notification');
    var counter = $('.notif-count');
    $('.loadingNotif').css('display', 'block');
    
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/get-notifs?page=${notifPage}`,
        dataType: 'json',
        success: function (data) {
            if(data.length === 0)
                disableLoadMoreNotif = true;
            
            data.sort(function(a, b) {
                return b.last_modified - a.last_modified;
            });
            
            var count = 0;
            $.each(data, function(index, notif) {
                if (notif.is_read === false)
                    count++;
            });
            if (count > 0) {
                $('.notif-count').css('opacity','1');
                counter.text(count);
            }
            data.length > 0 ? $.each(data, function(index, notif){
                container.append(notifItem(notif));
            }) : container.append(`<div class="d-flex flex-column justify-content-center align-items-center mt-4">
                                        <img style="width: 100px; height: 100px" src="https://res.cloudinary.com/dynupxxry/image/upload/v1659765073/netflix/star_yepdul.png" />
                                        <p class="text-center">Chưa có thông báo nào</p>
                                    </div>`);
            
            $('.loadingNotif').css('display', 'none');
            notifPage++;
        }});
}

function notifItem(notif) {
    let typeMsg = notif.type === 'REACT_POST' ? (`thích bài viết của bạn`):
            notif.type === 'COMMENT_POST' ? `bình luận về bài viết của bạn`:
            notif.type === 'REACT_COMMENT' ? `thích bình luận của bạn`:
            notif.type === 'REPLY_COMMENT' ? `trả lời bình luận của bạn`: `tham gia đấu giá bài viết của bạn`;
    let imgNotifType = notif.type === 'REACT_POST' ? `${imgNotifIcon.REACT_POST}`:
            notif.type === 'COMMENT_POST' ? `${imgNotifIcon.COMMENT_POST}`:
            notif.type === 'REACT_COMMENT' ? `${imgNotifIcon.REACT_COMMENT}`:
            notif.type === 'REPLY_COMMENT' ? `${imgNotifIcon.COMMENT_POST}`: `${imgNotifIcon.JOIN_AUCTION}`;
    var li = `  <li  class="dropdown-item d-flex align-items-center notif-loading w-100 ${notif.is_read && `is-read-notify`}">
                    <div class="notif-item" onclick="notifRedirect(${notif.targetId}, '${notif.notifId}', '${notif.type}')">
                        <div class="position-relative">
                            <img class="user-img" src="${notif.last_modified_avatar}" alt="image">
                            ${imgNotifType}
                        </div>
                        <div class="notif-item--message">
                            <span class="mb-1 message">  
                                ${notif.count > 1 ? `<strong>${notif.last_modified_name}</strong> và ${notif.count - 1} người khác`: 
                                `<strong>${notif.last_modified_name}</strong>`} đã ${typeMsg}
                            </span>
                            <span class="notif-time ${notif.is_read && `is-read-notify`}">${moment(notif.last_modified).fromNow()}</span>
                        </div>
                        <div class="notif-dot" ${notif.is_read && `style="display:none;"`}>
                            <i class="fa fa-circle" aria-hidden="true"></i>
                        </div>
                    </div>
                </li>`;
    return li;
}

function notifRedirect(targetId, notifId, type) {
    if (type === 'REACT_POST' || type === 'COMMENT_POST')
        window.location = `${ctxPath}/posts/${targetId}?notif_id=${notifId}&notif_type=${type}&ref=notif`;
    else if (type === 'REACT_COMMENT' || type === 'REPLY_COMMENT') {
        $.ajax({
            type: 'get',
            url:`${ctxPath}/api/find-post/${targetId}`,
            dataType: 'json',
            success: function (data) {
                window.location = `${ctxPath}/posts/${data.id}?comment_id=${targetId}&notif_id=${notifId}&notif_type=${type}&ref=notif`;
            }
        });
    }
    else {
        window.location = `${ctxPath}/auctions/${targetId}?notif_id=${notifId}&notif_type=${type}&ref=notif`;
    }
}

function loadCommentNotifRef(commentId) {
    let postId = window.location.pathname.toString().slice(window.location.pathname.toString().lastIndexOf('/posts/') + 7);
    
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/get-comment/${commentId}`,
        dataType: 'json',
        success: function (data) {
            loadParents(data, postId);
        }
    }).done(function() {
        let currentPost = $(`#post${postId}`);
        let count = currentPost.find('#commentedComment').children('.comment--item').length;
        currentPost.find('#showedCommentLength').text(count);
    });
    
}

function loadParents(comment, postId) {
    if (comment.parentId !== null) {
        loadParents(comment.parentId);
        $(`#commentItem${comment.parentId.id}`).find('#repliedComments').append(commentItem(comment, postId));
    }
    else {
        $('#commentedComment').append(commentItem(comment, postId));
    }
    
    setTimeout(function() {
        let url = new URL(window.location.toString());
        let commentId = url.searchParams.get('comment_id');
        if(commentId === undefined || commentId === null) return;
        if(commentId !== undefined || commentId !== null) {
            if ($('#commentItem' + commentId) !== undefined) {
                $(window).scrollTop($('#commentItem' + commentId).offset().top - 300);
                $('#commentItem' + commentId).find('.comment-content' + commentId).addClass('tada');
            }
        }
    }, 500);
}

var containerHeight = 90 * 10 * notifPage;
$('.list-notification').scroll(function () {
    var scrollTop = $(this).scrollTop();
//    console.log(scrollTop);
//    console.log(containerHeight);
    
    if (scrollTop >= containerHeight) {
        containerHeight += scrollTop;
        if (!disableLoadMoreNotif) {
            getNotifs();
        }
    }
    
});

var imgNotifIcon = {
    'REACT_POST': `<img class="img-type-notif" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e" alt="" style="height: 28px; width: 28px;">`,
    'COMMENT_POST': `<i data-visualcompletion="css-img" class="img-type-notif" style="height: 28px; width: 28px; background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/f4hEiaDqBpD.png&quot;); background-position: 0px -750px; background-size: 30px 1890px; background-repeat: no-repeat; display: inline-block;"></i>`,
    'REACT_COMMENT': `<img class="img-type-notif" height="28" role="presentation" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" width="28">`,
    'JOIN_AUCTION': `<i data-visualcompletion="css-img" class="img-type-notif" style="height: 28px; width: 28px; background-image: url(&quot;https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/f4hEiaDqBpD.png&quot;); background-position: 0px -210px; background-size: 30px 1890px; background-repeat: no-repeat; display: inline-block;"></i>`
};