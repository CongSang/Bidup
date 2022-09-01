var personPage = 1;
let topSearchPerson = 3;
let topSearchPost = 10;
let topSearchAuction = 10;

function searchSubmit() {
    event.preventDefault();
    var inputVal = $('input[name="kw"]').val();
    if (inputVal.trim().charAt(0) === "#")
        window.location = `${ctxPath}/hashtag/${inputVal.slice(1)}`;
    else
        window.location = `${ctxPath}/search/top?kw=${inputVal}`;
}

function hashTagSearch() {
    disableLoadMorePost = true;
    var hashtag = $('.hashtag-name-container').text().slice(1);
    $(loadingBottom).css("display", "block");

    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/posts?hashtag=${hashtag}&page=${postPage}`,
        dataType: 'json',
        success: function (data) {
            $(loadingBottom).css("display", "none");
            if (data.length === 0 && postPage === 1) {
                disableLoadMorePost = true;
                $('.hashtag-name-container-desciption').text(`Chưa có bài viết nào với hashtag này`);
                return;
            }
            if (data.length === 0) {
                disableLoadMorePost = true;
                return;
            }
            postPage++;
            loadFeeds(data);
            $('.hashtag-name-container-desciption').text(`${data.length} Bài viết với hashtag này`);
            disableLoadMorePost = false;
        }
    });
}

function topSearch() {
    personSearch(topSearchPerson);
    contentSearch(topSearchPost);
    auctionSearch(topSearchAuction);
    disableLoadMorePost = true;
}

function contentSearch(limit) {
    disableLoadMorePost = true;
    $(loadingBottom).css("display", "block");
    let locate = window.location.toString();
    let kw = locate.slice(locate.indexOf('kw=') + 3);
    
    let url = `${ctxPath}/api/posts?kw=${kw}&page=${postPage}`;
    if (limit !== undefined)
        url += `&limit=${limit}`;
    
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        success: function (data) {
            $(loadingBottom).css("display", "none");
            
            if (data.length === 0 && postPage === 1) {
                $('.post-search').css('display', 'none');
                disableLoadMorePost = true;
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

function personSearch(limit) {
    disableLoadMorePost = true;
    $(loadingBottom).css("display", "block");
    let locate = window.location.toString();
    let kw = locate.slice(locate.indexOf('kw=') + 3);
    
    let url = `${ctxPath}/api/users?kw=${kw}&page=${personPage}`;
    if (limit !== undefined)
        url += `&limit=${limit}`;
    
    
    $.ajax({
        type: 'get',
        url: url,
        dataType: 'json',
        success: function (data) {
            $(loadingBottom).css("display", "none");
            
            if (data.length === 0 && personPage === 1) {
                $('.person-search').css('display', 'none');
                disableLoadMorePost = true;
                
                return;
            }
            
            if (data.length === 0) {
                disableLoadMorePost = true;
                return;
            }
            personPage++;
            data = data.filter(p => p.id !== currentUserId);
            loadUserSearch(data);
            disableLoadMorePost = false;
        }
    });
}

function auctionSearch(limit) {
    disableLoadMorePost = true;
    $(loadingBottom).css("display", "block");
    let locate = window.location.toString();
    let kw = locate.slice(locate.indexOf('kw=') + 3);
    let url = `${ctxPath}/api/auctions`;
    let bool = (limit !== undefined);
    
    $.ajax({
        type: 'get',
        url: url + `?kw=${kw}&page=${auctionPage}${bool ? `&limit=10`:``}`,
        dataType: 'json',
        success: function (data) {
            $(loadingBottom).css("display", "none");
            
            if (data.length === 0 && auctionPage === 1) {
                $('.auction-search').css('display', 'none');
                disableLoadMorePost = true;
                
                return;
            }
            
            if (data.length === 0) {
                disableLoadMorePost = true;
                return;
            }
            auctionPage++;
            loadAuctionFeeds(data, '.auction-container');
            disableLoadMorePost = false;
        }
    });
}

function searchFilter(filter) {
    window.scrollTo(0, 0);
    disableLoadMorePost = false;
    removeSearchResult();
    auctionPage = 1;
    personPage = 1;
    postPage = 1;
    let url = new URL(window.location.toString());
    let kw = url.searchParams.get('kw');
    let pathname = window.location.pathname.toString();
    
    if (filter === 'all') {
        disableLoadMorePost = true;
        $('.post-search').css('display', 'block');
        $('.person-search').css('display', 'block');
        $('.auction-search').css('display', 'block');
        topSearch();
       
        let newPathname = pathname.slice(0, pathname.indexOf('/search') + 7) + '/top';
        let newUrl = 'http://' + window.location.host.toString() + newPathname + '?kw=' + kw;
        
        loca = newPathname;
        window.history.replaceState('', 'SharingHope', newUrl);
    }
    else if (filter === 'people') {
        personSearch();
        $('.person-search').css('display', 'block');
        $('.post-search').css('display', 'none');
        $('.auction-search').css('display', 'none');
        
        let newPathname = pathname.slice(0, pathname.indexOf('/search') + 7) + '/people';
        let newUrl = 'http://' +  window.location.host.toString() + newPathname + '?kw=' + kw;
        
        loca = newPathname;
        window.history.replaceState('', 'SharingHope', newUrl);
    }
    else if (filter === 'posts') {
        contentSearch();
        $('.post-search').css('display', 'block');
        $('.person-search').css('display', 'none');
        $('.auction-search').css('display', 'none');
        
        let newPathname = pathname.slice(0, pathname.indexOf('/search') + 7) + '/posts';
        let newUrl = 'http://' +  window.location.host.toString() + newPathname + '?kw=' + kw;
        
        loca = newPathname;
        window.history.replaceState('', 'SharingHope', newUrl);
    }
    else {
        auctionSearch();
        $('.person-search').css('display', 'none');
        $('.post-search').css('display', 'none');
        $('.auction-search').css('display', 'block');
        
        let newPathname = pathname.slice(0, pathname.indexOf('/search') + 7) + '/auctions';
        let newUrl = 'http://' +  window.location.host.toString() + newPathname + '?kw=' + kw;
        
        loca = newPathname;
        window.history.replaceState('', 'SharingHope', newUrl);
    }
}

function removeSearchResult() {
    $('#feeds-container').empty();
    $('#personsContainer').empty();
    $('.auction-container').empty();
}

function loadUserSearch(users) {
    $.each(users, function(index, u) {
        let html = `<div class="person-search-item justify-content-between">
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="person-search-item-image">
                                <a href="#">
                                    <img class="avatar-search rounded-circle" src="${u.avatar}" alt="avatar">
                                </a>
                            </div>
                            <div class="person-search-item-name">
                                <h6 class="mb-0 py-1">
                                    <a href="${ctxPath}/user/${u.id}">${u.lastname + ' ' + u.firstname}</a>
                                </h6>
                            </div>
                        </div>
                        <div id="btnFollow${u.id}" class="btn-follow ${u.isFollowed === true ? `active`:``}"
                            onclick="follow('${u.id}')">
        
                            <div class="line1"></div>
                            <div class="line2"></div>
                        </div>
                    </div>`;
    
        $('#personsContainer').append(html);
    });
}

function follow(userId) {
    if(!$(`#btnFollow${userId}`).hasClass('active'))
    {
        $(`#btnFollow${userId}`).addClass('active');
        $(`.btn-follow-user${userId}`) && $(`.btn-follow-user${userId}`).html(`<i class="fa-solid fa-thumbs-up me-2"></i>
                                                                                             Đã theo dõi`);
        $.ajax({
            type: 'post',
            url: `${ctxPath}/api/follow-user/${userId}`,
            dataType: 'json'
        });
    }
    else
    {
        $.ajax({
            type: 'delete',
            url: `${ctxPath}/api/unfollow-user/${userId}`,
            dataType: 'json',
            success: function () {
                $(`#btnFollow${userId}`).removeClass('active');
                $(`.btn-follow-user${userId}`) && $(`.btn-follow-user${userId}`).html(`<i class="fa-solid fa-plus me-2"></i>
                                                                                            Theo dõi`);
            }
        });
        
    }
}