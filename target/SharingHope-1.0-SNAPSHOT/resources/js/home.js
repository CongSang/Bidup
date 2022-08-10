const modal = document.querySelector("#modalCreatePost");
const btn_close = document.querySelectorAll(".modal--close-post");
const btn_show = document.querySelectorAll(".btn-show--post");
const loadingTop = $('#loadingTop');
const loadingBottom = $('#loadingBottom');

modal.addEventListener("click", function (event) {
    event.stopPropagation();
});


function showModal() {
    modal.classList.add('open');
}

function closeModal() {
    modal.classList.remove('open');
}

btn_show.forEach(btn => {
    btn.addEventListener("click", showModal);
});

btn_close.forEach(btn => {
    btn.addEventListener("click", closeModal);
});


//const chat_menu = document.querySelector("#chatMenu");
//const sidebar_right = document.querySelector(".sidebar-right");
//const close_chat = document.querySelector(".chat--close");
//
////chat menu
//chat_menu.addEventListener("click", () => {
//    sidebar_right.style.display = "block";
//    $('#navbarCollapse').removeClass('show');
//    $('.navbar-toggler').attr('aria-expanded', 'false');
//});
//
//close_chat.addEventListener("click", () => {
//    sidebar_right.style.display = "none";
//});
//
function loadSideBarLeft() {
    const path = '/SharingHope/';
    $.ajax({
        type: 'get',
        url: path + 'api/auction-side',
        dataType: 'json',
        success: function (data) {
            $.each(data, function (index, item) {
                let html = `
                    <div class="d-flex align-items-center pt-4">
                        <div class="p-1">
                            <a href="${path}user/${item.userId.id}">
                                <img src="${item.userId.avatar}" alt="avatar" class="avatar-img rounded-circle"/>
                            </a>
                        </div>
                        <div class="ms-2 small">
                            <h6 class="card-title mb-0"><a href="${path}user/${item.userId.id}">${item.userId.lastname} ${item.userId.firstname}</a></h6>
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

function loadPosts() {
    $(loadingBottom).css("display", "block");
    postFetching = true;

    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/posts?page=${postPage}`,
        dataType: 'json',
        success: function (data) {
            
            if (data.length === 0) {
                disableLoadMorePost = true;
            }
            
            loadFeeds(data);
            $(loadingBottom).css("display", "none");
            postFetching = false;
        }
    });
}
