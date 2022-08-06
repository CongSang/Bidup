
function getNotifs() {
    var container = $('#notifContainer');
    var counter = $('.notif-count');
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/get-notifs`,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            data.sort(function(a, b) {
                return b.last_modified - a.last_modified;
            });
            var key = {'is_read':0};
            var count = 0;
            $.each(data, function(index, post) {
                if (post.is_read === false)
                    count++;
            });
            if (count > 0)
                counter.text(count);
            $.each(data, function(index, post){
                var li = `  <li  class="dropdown-item d-flex justify-content-center 
                                align-items-center notif-loading text-center">
                            <div class="notif-item" onclick="toPost(${post.postId})">
                                <img class="user-img" src="${post.last_modified_avatar}" alt="image">
                                <div class="notif-item--message"><span class="card-title mb-0">${post.last_modified_name} và ${post.count} người khác</span> đã ${post.type === 'REACT_POST' ? `thích`:`bình luận về`} vài viết của bạn</div>
                                <div class="notif-dot" ${post.is_read === true ? `style="display:none;"`:``}><i class="fa fa-circle" aria-hidden="true"></i></div>
                                <span class="notif-time">${moment(post.last_modified).fromNow()}</span>
                            </div>
                        </li>`;
                container.append(li);
            });
            
            $('#loadingNotif').css('display', 'none');
            
        }
    });
}

function toPost(id) {
    
}