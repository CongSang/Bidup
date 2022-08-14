

function loadSingleAuction(auctionId) {
    $('.auction-loading').css("display", "block");
    
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/auction-single/${auctionId}`,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            loadAuctionFeeds([data], '.auction-container');
            $('.auction-loading').css("display", "none");
        }
    });
}
