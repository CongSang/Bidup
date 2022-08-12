
function getNotifs() {
    var container = $('.list-notification');
    var counter = $('.notif-count');
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/get-notifs`,
        dataType: 'json',
        success: function (data) {
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
                let typeMsg = notif.type === 'REACT_POST' ? `thích bài viết của bạn`:
                        notif.type === 'COMMENT_POST' ? `bình luận về bài viết của bạn`:
                        notif.type === 'REACT_COMMENT' ? `thích bình luận của bạn`:
                        notif.type === 'REPLY_COMMENT' ? `trả lời bình luận của bạn`: `đã tham gia đấu giá bài viết của bạn`;
                
                var li = `  <li  class="dropdown-item d-flex align-items-center notif-loading w-100 ${notif.is_read && `is-read-notify`}">
                                <div class="notif-item" onclick="notifRedirect(${notif.targetId}, '${notif.notifId}', '${notif.type}')">
                                    <img class="user-img" src="${notif.last_modified_avatar}" alt="image">
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
                
                container.append(li);
            }) : container.append(`<div class="d-flex flex-column justify-content-center align-items-center mt-4">
                                        <img style="width: 100px; height: 100px" src="https://res.cloudinary.com/dynupxxry/image/upload/v1659765073/netflix/star_yepdul.png" />
                                        <p class="text-center">Chưa có thông báo nào</p>
                                    </div>`);
            
            $('.loadingNotif').css('display', 'none');
        
        }});
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
//
//function toAuction(postId, notifId, type) {
//    window.location = `${ctxPath}/auctions/${postId}?notif_id=${notifId}&notif_type=${type}&ref=notif`;
//}