const modal = document.querySelector("#modalCreatePost");
const btn_close = document.querySelectorAll(".modal--close-post");
const btn_show = document.querySelectorAll(".btn-show--post");
const loadingTop = $('#loadingTop');
const loadingBottom = $('#loadingBottom');
var xhr;

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

function homeMenu(menu) {
    if (xhr !== undefined)
        xhr.abort();
    window.scrollTo(0, 0);
    disableLoadMorePost = false;
    $('#feeds-container').empty();
    $('.auction-container').empty();
    auctionPage = 1;
    postPage = 1;
    let url = new URL(window.location.toString());
    let pathname = window.location.pathname.toString();
    
    if (menu === 'home') {
        loadPosts();
        
        let newPathname = ctxPath + "/";
        let newUrl = 'http://' + window.location.host.toString() + newPathname ;
        
        window.history.replaceState('', 'SharingHope', newUrl);
        menuActive(newPathname);
    }
    else if(menu === 'follow') {
        loadFollowPosts();
        
        let newPathname = `${ctxPath}/home/follow`;
        let newUrl = 'http://' +  window.location.host.toString() + newPathname;
        
        window.history.replaceState('', 'SharingHope', newUrl);
        menuActive(newPathname);
    }
    else {
        loadAuctions();
        
        let newPathname = `${ctxPath}/auction`;
        let newUrl = 'http://' +  window.location.host.toString() + newPathname;
        
        window.history.replaceState('', 'SharingHope', newUrl);
        menuActive(newPathname);
    }
}

function loadPosts() {
    $(loadingBottom).css("display", "block");

    xhr = $.ajax({
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

function loadFollowPosts() {
    $(loadingBottom).css("display", "block");

    xhr = $.ajax({
        type: 'get',
        url: `${ctxPath}/api/posts?page=${postPage}&follow_only=true`,
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

modal.addEventListener("click", function (event) {
    event.stopPropagation();
});