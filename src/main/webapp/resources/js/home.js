const modalPost = $("#modalCreatePost");
const btnCloseModal = $(".modal-close-btn");
const btnShowModal = $(".btn-show--modal");
const loadingTop = $('#loadingTop');
const loadingBottom = $('#loadingBottom');

const modalAuction =  $(".modal-auction");
const modalContainer1 = $(".modal-container-auction");

btnShowModal.click(showModal);
btnCloseModal.click(closeModal);

function showModal() {
    let pathName = window.location.pathname.toString();
    if (pathName.includes("/auction"))
        modalAuction.addClass('open');
    else 
        modalPost.addClass('open');
}

function closeModal() {
    modalPost.removeClass('open');
    modalAuction.removeClass('open');
}


modalContainer1.on("click", function (event) {
    event.stopPropagation();
});

modalPost.click(function (event) {
    event.stopPropagation();
});

function homeMenu(menu) {
    if(!window.location.pathname.toString().includes(`/home`))
        window.location = `${ctxPath}/${menu}`;
    if (xhr !== undefined)
        xhr.abort();
    window.scrollTo(0, 0);
    disableLoadMorePost = false;
    $('#feeds-container').empty();
    $('.auction-container').empty();
    auctionPage = 1;
    postPage = 1;
    
    if (menu === 'home') {
        loadPosts();
        
        let newPathname = ctxPath + "/home";
        let newUrl = 'http://' + window.location.host.toString() + newPathname ;
        
        loca = newPathname;
        window.history.replaceState('', 'SharingHope', newUrl);
        menuActive(newPathname);
    }
    else if(menu === 'home/follow') {
        loadFollowPosts();
        
        let newPathname = `${ctxPath}/home/follow`;
        let newUrl = 'http://' +  window.location.host.toString() + newPathname;
        
        loca = newPathname;
        window.history.replaceState('', 'SharingHope', newUrl);
        menuActive(newPathname);
    }
    else {
        loadAuctions();
        
        let newPathname = `${ctxPath}/home/auction`;
        let newUrl = 'http://' +  window.location.host.toString() + newPathname;
        
        loca = newPathname;
        window.history.replaceState('', 'SharingHope', newUrl);
        menuActive(newPathname);
    }
}

function loadPosts() {
    disableLoadMorePost = true;
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
            disableLoadMorePost = false;
        }
    });
}

function loadFollowPosts() {

    disableLoadMorePost = true;
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
            disableLoadMorePost = false;
        }
    });
}