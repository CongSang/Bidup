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

function loadPosts() {
    $(loadingBottom).css("display", "block");

    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/posts?page=${postPage}`,
        dataType: 'json',
        success: function (data) {
            $(loadingBottom).css("display", "none");
            if (data.length === 0) {
                disableLoadMorePost = true;
                return;
            }
            postPage++;
            loadFeeds(data);
        }
    });
}
