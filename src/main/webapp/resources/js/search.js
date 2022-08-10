var hashTagSearchPage = 1;

function searchSubmit() {
    event.preventDefault();
    var inputVal = $('input[name="kw"]').val();
    if (inputVal.trim().charAt(0) === "#")
        window.location = `${ctxPath}/hashtag/` + inputVal.slice(1);
}

function hashTagSearch(hashtag) { 
    $(loadingBottom).css("display", "block");
    postFetching = true;

    $.ajax({
        type: 'get',
        url: `${ctxPath}/posts?hashtag=${hashtag}&page=${hashTagSearchPage}`,
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