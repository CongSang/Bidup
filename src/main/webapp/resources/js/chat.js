
function chatFormatDate(timestamp) {
    const date = new Date(timestamp);
    const formatter = dayjs(date);
    const now = new Date();

    if (dayjs().isSame(formatter, "date"))
        return formatter.format("h:mm A");

    if (dayjs().isSame(formatter, "week"))
        return formatter.format("ddd h:mm A");

    if (now.getFullYear() === date.getFullYear())
        return formatter.format("MMM DD h:mm A");

    return formatter.format("DD MMM YYYY h:mm A");
}

var limit = 10;
var chatPage = 1;
var disableLoadMoreUserSearch = false;
function searchUserForChat(element) {
    event.preventDefault();
    const kw = element.value;
    $('.search-userchat-loading').css("display", "flex");
    $('.list-user-chat').css("display", "none");
    $('.list-user-search').css("display", "block");
    $('.list-user-search').empty();
    if (!kw.trim()) {
        $('.search-userchat-loading').css("display", "none");
        $('.list-user-search').css("display", "none");
        $('.list-user-chat').css("display", "block");
        return;
    }

    var searchTimeout = setTimeout(
            $.ajax({
                type: 'get',
                url: `${ctxPath}/api/users?kw=${kw}&page=${chatPage}&limit=${limit}`,
                dataType: 'json',
                success: function (data) {
                    $('.search-userchat-loading').css("display", "none");

                    if (data.length === 0 && chatPage === 1) {
                        $('.list-user-search').html(`<div class="d-flex flex-column justify-content-center align-items-center mt-4">
                                                <img style="width: 100px; height: 100px; opacity: 0.7;" src="https://res.cloudinary.com/dynupxxry/image/upload/v1659765073/netflix/star_yepdul.png" />
                                                <p class="text-center">Không có người nào được tìm thấy</p>
                                            </div>`);
                        disableLoadMoreUserSearch = true;
                        return;
                    }

                    if (data.length === 0) {
                        disableLoadMoreUserSearch = true;
                        return;
                    }

                    const users = data.filter(d => d.id !== currentUserId);

                    $('.list-user-search').append(`${(users).map((user) => {
                        return `<li class="dropdown-item">
                               <div class="${user.id} d-flex justify-content-between align-items-center mb-1 chat--item">
                                   <div class="d-flex align-items-center">
                                       <img class="chat-menu-avatar rounded-circle me-2" src="${user.avatar}" alt="">
                                       <div>
                                           <p class="chat-side">${user.lastname} ${user.firstname}</p>
                                       </div>
                                   </div>
                                   <i class="fa-brands fa-facebook-messenger go-chat ms-1"></i>
                               </div>
                           </li>`;
                    }).join('')}`);
                    $.each(users, function (index, user) {
                        $(`.${user.id}`).on('click', function () {
                            $(`.chat-box-container`).css("display", "none");
                            $(`.chat-box-container${user.id}`).css("display", "block");
                            updateScrollbar(user.id);
                        });
//                        $(`.chat-box-container${user.uid} .chat-box--close`).on('click', () => {
//                            closeChatBox(user);
//                        });
                     });

                }
            })
            , 1000);

    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
}

function updateScrollbar(user) {
    const messages = $(`.chat-box-container${user} .message-container`);
    messages.animate({
        scrollTop: messages.get(0).scrollHeight
    }, 300);
}

