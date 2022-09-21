var postPage = 1;
var disableLoadMorePost = false;

$(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    var windowHeight = $(this).height();
    var documentHeight = $(document).height();



    if ((windowHeight + scrollTop) >= documentHeight - 200) {
        if (!disableLoadMorePost) {
            $(loadingBottom).css("display", "block");

            switch (loca) {
                case `${ctxPath}/home`:
                    loadPosts();
                    break;
                case `${ctxPath}/home/auction`:
                    loadAuctions();
                    break;
                case `${ctxPath}/search/posts`:
                    contentSearch();
                    break;
                case `${ctxPath}/search/people`:
                    personSearch();
                    break;
                case `${ctxPath}/search/auctions`:
                    auctionSearch();
                    break;
                case `${ctxPath}/search/top`:
                    $(loadingBottom).css("display", "none");
                    break;
                case `${ctxPath}/home/follow`:
                    loadFollowPosts();
                    break;
            }

        }
    }

});

function loadFeeds(posts) {
    $.each(posts, function (index, post) {
        $('#feeds-container').append(postItem(post));
        customHashtag(`.post-${post.id}`);
    });
}
;

function prependFeeds(post) {
    $('#feeds-container').prepend(postItem(post));
    customHashtag(`.post-${post.id}`);
}
;

function loadAuctionFeeds(auctions, container) {
    $.each(auctions, function (index, auction) {
        $(container).append(auctionItem(auction));
        customHashtag(`.auction-${auction.id}`);
    });
}


