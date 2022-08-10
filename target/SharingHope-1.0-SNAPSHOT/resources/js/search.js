
function searchSubmit() {
    event.preventDefault();
    var inputVal = $('input[name="kw"]').val();
    if (inputVal.trim().charAt(0) === "#")
        window.location = `${ctxPath}/hashtag/${inputVal.slice(1)}`;
    else
        window.location = `${ctxPath}/search?kw=${inputVal}`;
}

function hashTagSearch() { 
    postFetching = true;
    var hashtag = $('.hashtag-name-container').text().slice(1);
    $(loadingBottom).css("display", "block");
    
    $.ajax({
        type: 'get',
        url: `${ctxPath}/api/posts?hashtag=${hashtag}&page=${postPage}`,
        dataType: 'json',
        success: function (data) {
            $(loadingBottom).css("display", "none");
            postFetching = false;
            if (data.length === 0) {
                disableLoadMorePost = true;
                return;
            }
            loadFeeds(data);
            $('.hashtag-name-container-desciption').text(`${data.length} Bài viết với hashtag này`);
        }
    });
}