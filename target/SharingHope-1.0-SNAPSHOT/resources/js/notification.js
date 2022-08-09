
function getNotifs() {
    var container = $('.notifContainer');
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
            $.each(data, function(index, post) {
                if (post.is_read === false)
                    count++;
            });
            if (count > 0) {
                $('.notif-count').css('opacity','1');
                counter.text(count);
            }
                
            $.each(data, function(index, post){
                var li = `  <li  class="dropdown-item d-flex align-items-center notif-loading w-100 ${post.is_read && `is-read-notify`}">
                                    <div class="notif-item" onclick="toPost(${post.postId})">
                                        <img class="user-img" src="${post.last_modified_avatar}" alt="image">
                                        <div class="notif-item--message">
                                            <span class="mb-1 message">  
                                                ${post.count > 1 ? `<strong>${post.last_modified_name}</strong> và ${post.count - 1} người khác`: 
                                                `<strong>${post.last_modified_name}</strong>`} đã ${post.type === 'REACT_POST' ? `thích`:`bình luận về`} vài viết của bạn
                                            </span>
                                            <span class="notif-time ${post.is_read && `is-read-notify`}">${moment(post.last_modified).fromNow()}</span>
                                        </div>
                                        <div class="notif-dot" ${post.is_read && `style="display:none;"`}>
                                            <i class="fa fa-circle" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </li>`;
                container.append(li);
            });
            
            $('.loadingNotif').css('display', 'none');
            
        }
    });
}

function toPost(id) {
    
}