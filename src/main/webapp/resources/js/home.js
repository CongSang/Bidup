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
    window.scrollTo({top: 0,
                    left: 0,
                    behavior: 'instant',
                  });
    disableLoadMorePost = false;
    $('#feeds-container').empty();
    $('.auction-container').empty();
    auctionPage = 1;
    postPage = 1;
    $(loadingBottom).css("display", "block");
    
    if (menu === 'home') {
        loadPosts();
        
        let newPathname = ctxPath + "/home";
        let newUrl = 'http://' + window.location.host.toString() + newPathname ;
        
        loca = newPathname;
        window.history.replaceState('', 'Bidup', newUrl);
        menuActive(newPathname);
    }
    else if(menu === 'home/follow') {
        loadFollowPosts();
        
        let newPathname = `${ctxPath}/home/follow`;
        let newUrl = 'http://' +  window.location.host.toString() + newPathname;
        
        loca = newPathname;
        window.history.replaceState('', 'Bidup', newUrl);
        menuActive(newPathname);
    }
    else if(menu === 'home/auction') {
        loadAuctions();
        
        let newPathname = `${ctxPath}/home/auction`;
        let newUrl = 'http://' +  window.location.host.toString() + newPathname;
        
        loca = newPathname;
        window.history.replaceState('', 'Bidup', newUrl);
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
            if (data.length === 0 && postPage === 1) {
                disableLoadMorePost = true;
                $('#feeds-container').html(`<div class="d-flex flex-column justify-content-center align-items-center mt-4">
                                        <img style="width: 100px; height: 100px" src="https://res.cloudinary.com/dynupxxry/image/upload/v1659765073/netflix/star_yepdul.png" />
                                        <p class="text-center">Chưa theo dõi người nào</p>
                                    </div>`);
                return;
            }
            
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

function loadMinimumUp(){
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/get-minimum-up`,
        dataType: 'json',
        success: function (data) {
            minimumUp=data;
        }
    });
}