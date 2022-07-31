
const chat_menu = document.querySelector("#chat");
const sidebar_right = document.querySelector(".sidebar-right");
const close_chat = document.querySelector(".chat--close");

//chat menu
chat_menu.addEventListener("click", () => {
    sidebar_right.style.display = "block";
});

close_chat.addEventListener("click", () => {
    sidebar_right.style.display = "none";
});

function loadSideBarLeft() {
    $.ajax({
        type: 'get',
        url: '/SharingHope/api/auction-side',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, item) {
                let html = `
                    <div class="d-flex align-items-center pt-4">
                        <div class="p-1">
                            <a href="#">
                                <img src="${item.userId.avatar}" alt="avatar" class="avatar-img rounded-circle"/>
                            </a>
                        </div>
                        <div class="ms-2 small">
                            <h6 class="card-title mb-0"><a href="#">${item.userId.lastname} ${item.userId.firstname}</a></h6>
                            đã đăng đấu giá
                            <span>${moment(item.auctionDate).fromNow()}</span>
                        </div>
                    </div>
                `;

                $('.auction-side--item').append(html);
                $('.sideleft-loading').css("display", "none");
            });
        }
    });
}
